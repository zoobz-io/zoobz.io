import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { addTemplate, defineNuxtModule, useLogger } from "@nuxt/kit";
import type { VersionManifest } from "../sources/github-tags";

const logger = useLogger("github");

interface StatItem {
  label: string;
  value: string;
}

interface StatsManifest {
  stats: StatItem[];
  generatedAt: string;
}

export interface GitHubModuleOptions {
  /** Repository in "owner/repo" format or full GitHub URL */
  repo?: string;
  /** Cache directory relative to rootDir (default: ".content-cache") */
  cacheDir?: string;
  /** Stats cache TTL in milliseconds (default: 1 hour) */
  cacheTtl?: number;
}

function parseRepo(repo: string): { owner: string; repo: string } | null {
  const urlMatch = repo.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };
  const slugMatch = repo.match(/^([^/]+)\/([^/]+)$/);
  if (slugMatch) return { owner: slugMatch[1], repo: slugMatch[2] };
  return null;
}

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchCoverage(owner: string, repo: string): Promise<StatItem | null> {
  try {
    const res = await fetch(`https://codecov.io/api/v2/github/${owner}/repos/${repo}`);
    if (!res.ok) return null;
    const data = await res.json();
    const coverage = data?.totals?.coverage;
    if (coverage == null) return null;
    return { label: "Test Coverage", value: `${Math.round(coverage)}%` };
  } catch {
    return null;
  }
}

async function fetchGoReport(owner: string, repo: string): Promise<StatItem | null> {
  try {
    const res = await fetch(`https://goreportcard.com/report/github.com/${owner}/${repo}`);
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/var\s+response\s*=\s*({.*})\s*;/);
    if (!match) return null;
    const data = JSON.parse(match[1]);
    if (!data.grade) return null;
    return { label: "Go Report", value: data.grade };
  } catch {
    return null;
  }
}

async function fetchLicense(owner: string, repo: string, token?: string): Promise<StatItem | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: githubHeaders(token),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const license = data?.license?.spdx_id;
    if (!license || license === "NOASSERTION") return null;
    return { label: "License", value: license };
  } catch {
    return null;
  }
}

async function fetchGoVersion(owner: string, repo: string, token?: string): Promise<StatItem | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/go.mod`, {
      headers: githubHeaders(token),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.encoding !== "base64" || !data.content) return null;
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    const match = decoded.match(/^go\s+(\S+)/m);
    if (!match) return null;
    return { label: "Go Version", value: `${match[1]}+` };
  } catch {
    return null;
  }
}

async function fetchLatestRelease(owner: string, repo: string, token?: string): Promise<StatItem | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: githubHeaders(token),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.tag_name) return null;
    return { label: "Latest Release", value: data.tag_name };
  } catch {
    return null;
  }
}

async function resolveStats(
  cacheDir: string,
  repoUrl: string,
  cacheTtl: number,
): Promise<StatItem[]> {
  const parsed = parseRepo(repoUrl);
  if (!parsed) {
    logger.warn("Could not parse repo:", repoUrl);
    return [];
  }

  const manifestPath = join(cacheDir, "stats-manifest.json");

  // Check cache
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as StatsManifest;
      const age = Date.now() - new Date(manifest.generatedAt).getTime();
      if (age < cacheTtl) {
        logger.info(`Loaded ${manifest.stats.length} stats from cache`);
        return manifest.stats;
      }
    } catch {
      // Cache corrupt, refetch
    }
  }

  const { owner, repo } = parsed;
  const token = process.env.GITHUB_TOKEN;

  logger.info(`Fetching stats for ${owner}/${repo}...`);

  const results = await Promise.all([
    fetchCoverage(owner, repo),
    fetchGoReport(owner, repo),
    fetchLicense(owner, repo, token),
    fetchGoVersion(owner, repo, token),
    fetchLatestRelease(owner, repo, token),
  ]);

  const stats = results.filter((s): s is StatItem => s !== null);

  if (stats.length === 0) {
    logger.warn("No stats could be fetched");
    return [];
  }

  // Cache
  mkdirSync(cacheDir, { recursive: true });
  const manifest: StatsManifest = {
    stats,
    generatedAt: new Date().toISOString(),
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  logger.info(`Fetched ${stats.length} stats: ${stats.map((s) => s.label).join(", ")}`);
  return stats;
}

function resolveVersions(cacheDir: string): VersionManifest | null {
  const manifestPath = join(cacheDir, "version-manifest.json");
  if (!existsSync(manifestPath)) {
    logger.warn("No version manifest found");
    return null;
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as VersionManifest;
    logger.info(`Loaded ${manifest.versions.length} versions, latest: ${manifest.latest}`);
    return manifest;
  } catch (err) {
    logger.error("Failed to read version manifest:", err);
    return null;
  }
}

export default defineNuxtModule<GitHubModuleOptions>({
  meta: {
    name: "github",
    configKey: "github",
  },
  defaults: {
    cacheDir: ".content-cache",
    cacheTtl: 60 * 60 * 1000,
  },
  async setup(options, nuxt) {
    const cacheDir = join(nuxt.options.rootDir, options.cacheDir!);

    // Versions
    const versionManifest = resolveVersions(cacheDir);
    if (versionManifest) {
      nuxt.options.appConfig.version = {
        versions: versionManifest.versions,
        latest: versionManifest.latest,
        current: "",
      };
    }

    // Stats
    let statsData: StatItem[] = [];
    if (options.repo) {
      statsData = await resolveStats(cacheDir, options.repo, options.cacheTtl!);
    }

    addTemplate({
      filename: "github/stats.ts",
      write: true,
      getContents: () =>
        `export const stats = ${JSON.stringify(statsData)} as const;\n`,
    });

    nuxt.options.alias["#github/stats"] = join(
      nuxt.options.buildDir,
      "github/stats",
    );
  },
});
