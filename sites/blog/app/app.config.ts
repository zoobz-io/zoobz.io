export default defineAppConfig({
  site: {
    name: "Zoobz Blog",
    description: "Thoughts and updates from zoobz.io",
  },
  socials: [
    { label: "GitHub", to: "https://github.com/zoobzio", icon: "github" },
    { label: "Bluesky", to: "https://bsky.app/profile/zoobz.io", icon: "bluesky" },
    { label: "LinkedIn", to: "https://linkedin.com/in/zoobzio", icon: "linkedin" },
  ],
  events: [
    { date: "2026-02-20", title: "Foundation v1.0 Released", icon: "rocket", description: "First stable release of the component library." },
    { date: "2026-01-25", title: "Blog Launched", icon: "star", description: "The first version of the blog goes live." },
  ],
  copyright: "\u00A9 2026 Alexander Thorwaldson",
});
