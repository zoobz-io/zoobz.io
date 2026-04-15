declare module "nuxt/schema" {
  interface AppConfigInput {
    title?: string;
    navigation?: SidebarOptionGroup[];
    footer?: {
      links?: { label: string; to: string }[];
    };
  }
}

export default defineAppConfig({
  title: "Argus",
  navigation: [
    {
      label: "Application",
      icon: "home",
      options: [
        { label: "Documents", to: "/documents" },
        { label: "Metadata", to: "/metadata" },
      ],
    },
    {
      label: "Workflows",
      icon: "explore",
      options: [
        {
          label: "Jobs",
          to: "/jobs",
        },
        {
          label: "Notifications",
          to: "/notifications",
        },
      ],
    },
    {
      label: "Settings",
      icon: "settings",
      options: [{ label: "Billing", to: "/billing" }],
    },
  ],
  footer: {
    links: [
      { label: "Docs", to: "https://docs.zoobz.io" },
      { label: "Support", to: "mailto:support@zoobz.io" },
    ],
  },
});
