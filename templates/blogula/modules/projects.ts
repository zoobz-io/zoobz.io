import { join } from "node:path";
import { addTemplate, defineNuxtModule, useLogger } from "@nuxt/kit";
import type { EnrichedProject } from "../app/types/blogula";

const logger = useLogger("blogula:projects");

export interface BlogulaProjectsOptions {
  /** Repositories in "owner/repo" format */
  repos?: string[];
}

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchRepo(
  repo: string,
  token?: string,
): Promise<EnrichedProject | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: githubHeaders(token),
    });
    if (!res.ok) {
      logger.warn(`Failed to fetch ${repo}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return {
      name: data.name,
      description: data.description ?? "",
      html_url: data.html_url,
      stargazers_count: data.stargazers_count ?? 0,
      forks_count: data.forks_count ?? 0,
      open_issues_count: data.open_issues_count ?? 0,
      language: data.language ?? null,
      topics: data.topics ?? [],
      updated_at: data.updated_at ?? "",
    };
  } catch (e) {
    logger.warn(`Error fetching ${repo}: ${e}`);
    return null;
  }
}

export default defineNuxtModule<BlogulaProjectsOptions>({
  meta: {
    name: "@zoobz-io/blogula-projects",
    configKey: "blogulaProjects",
  },
  defaults: {
    repos: [],
  },
  async setup(options, nuxt) {
    const repos = options.repos ?? [];
    logger.info(`Found ${repos.length} projects`);

    let enriched: EnrichedProject[] = [];

    if (repos.length > 0) {
      const token = process.env.GITHUB_TOKEN;
      if (!token) {
        logger.warn("No GITHUB_TOKEN set — unauthenticated requests are limited to 60/hour");
      }

      logger.info(`Fetching ${repos.length} repositories...`);

      const results = await Promise.all(
        repos.map((repo) => fetchRepo(repo, token)),
      );

      enriched = results.filter((r): r is EnrichedProject => r !== null);
      logger.info(`Fetched ${enriched.length}/${repos.length} repositories`);
    }

    addTemplate({
      filename: "blogula/projects.ts",
      write: true,
      getContents: () =>
        `export const projects = ${JSON.stringify(enriched)} as const;\n`,
    });

    nuxt.options.alias["#blogula/projects"] = join(
      nuxt.options.buildDir,
      "blogula/projects",
    );
  },
});
