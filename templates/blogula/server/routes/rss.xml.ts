import { defineEventHandler, setResponseHeader } from "h3";
import { queryCollection } from "#imports";
import { useSiteConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const site = useSiteConfig(event);

  const posts = await queryCollection(event, "posts")
    .order("published", "DESC")
    .all();

  const items = posts
    .filter((p) => p.published)
    .map((p) => {
      const url = `${site.url}${p.path}`;
      const date = new Date(p.published!).toUTCString();
      return [
        "    <item>",
        `      <title><![CDATA[${p.title}]]></title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${date}</pubDate>`,
        p.description
          ? `      <description><![CDATA[${p.description}]]></description>`
          : "",
        p.author ? `      <author>${p.author}</author>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${site.name}</title>`,
    `    <link>${site.url}</link>`,
    `    <description>${site.description}</description>`,
    `    <language>en</language>`,
    `    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  setResponseHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return xml;
});
