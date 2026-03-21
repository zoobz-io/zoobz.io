import { createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";
import { writeFile, mkdir, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const { resolve } = createResolver(import.meta.url);

async function fetchAvatar(username: string, dir: string, logger: ReturnType<typeof useLogger>) {
  const dest = join(dir, `${username}.png`);
  if (existsSync(dest)) return;

  try {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    logger.info(`Fetching avatar for ${username}...`);
    const res = await fetch(`https://github.com/${username}.png?size=512`);

    if (!res.ok) {
      logger.error(`Failed to fetch avatar for ${username}: ${res.status}`);
      return;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buffer);
    logger.success(`Avatar saved: avatars/${username}.png`);
  } catch (e) {
    logger.error(`Failed to fetch avatar for ${username}: ${e}`);
  }
}

async function findAuthors(contentDirs: string[]): Promise<Set<string>> {
  const authors = new Set<string>();

  for (const dir of contentDirs) {
    if (!existsSync(dir)) continue;
    const files = await readdir(dir, { recursive: true });

    for (const file of files) {
      if (!String(file).endsWith(".md")) continue;
      const content = await readFile(join(dir, String(file)), "utf-8");
      const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
      if (!match) continue;
      const authorMatch = match[1].match(/^author:\s*(.+)$/m);
      if (authorMatch) authors.add(authorMatch[1].trim());
    }
  }

  return authors;
}

export default defineNuxtModule({
  meta: {
    name: "@zoobz-io/blogula-avatar",
    configKey: "blogulaAvatar",
  },
  defaults: {
    enabled: true,
  },
  async setup(options, nuxt) {
    if (!options.enabled) return;

    const logger = useLogger("blogula-avatar");
    const dir = resolve("../public/avatars");
    const usernames = new Set<string>();

    // Add the configured github user
    const github = nuxt.options.appConfig?.github as string | undefined;
    if (github) usernames.add(github);

    // Scan content for post authors
    const contentDirs = nuxt.options._layers
      .map((l) => join(l.cwd, "content"))
      .filter((d) => existsSync(d));
    const authors = await findAuthors(contentDirs);
    for (const author of authors) usernames.add(author);

    if (usernames.size === 0) {
      logger.warn("No github users found, skipping avatar fetch");
      return;
    }

    await Promise.all(
      [...usernames].map((u) => fetchAvatar(u, dir, logger)),
    );
  },
});
