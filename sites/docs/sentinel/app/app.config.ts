export default defineAppConfig({
  title: "Sentinel",
  collection: {
    key: "sentinel",
    title: "Sentinel",
    hero: {
      tagline: "Struct Intelligence for Go.",
      taglineHighlight: "Zero Dependencies.",
      description:
        "Extract struct metadata once, cache it permanently, and discover relationships between types.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/sentinel"

type User struct {
    ID      string   \`json:"id" db:"id" validate:"required"\`
    Email   string   \`json:"email" validate:"required,email" foo:"bar"\`
    Profile *Profile
    Orders  []Order
}

metadata := sentinel.Scan[User]()
// metadata.TypeName → "User"
// metadata.FQDN     → "github.com/app/models.User"
// metadata.Fields   → []FieldMetadata (4 fields)

field := metadata.Fields[0]
// field.Name → "ID"
// field.Kind → "scalar"
// field.Tags → {"json": "id", "db": "id", "validate": "required"}


rel := metadata.Relationships[0]
// rel.From  → "github.com/app/models.User"
// rel.To    → "github.com/app/models.Profile"
// rel.Kind  → "reference"

sentinel.Browse()
// ["models.User", "models.Profile", "models.Order"]`,
      },
    },
    highlights: {
      title: "Why Sentinel?",
      description:
        "Built for production Go codebases where type metadata matters.",
      items: [
        {
          icon: "shield",
          title: "Zero Dependencies",
          description:
            "Nothing but the Go standard library. No bloat, no surprises.",
        },
        {
          icon: "cache",
          title: "Permanent Caching",
          description:
            "Types don't change at runtime, so why extract them more than once?",
        },
        {
          icon: "code",
          title: "Type-Safe Generics",
          description:
            "Catch your mistakes at compile time, not in production.",
        },
        {
          icon: "link",
          title: "Relationship Discovery",
          description:
            "References, collections, embeddings, and maps — all mapped automatically.",
        },
        {
          icon: "search",
          title: "Module-Aware Scanning",
          description:
            "Point it at a type and it walks the entire graph within your module.",
        },
        {
          icon: "lock",
          title: "Thread-Safe",
          description:
            "Safe for concurrent reads after the first extraction. No mutexes required.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Everything sentinel extracts from your Go types, cached permanently after first access.",
      items: [
        {
          feature: "Metadata Extraction",
          description:
            "Fields, types, indices, categories, and every struct tag you care about.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Relationship Discovery",
          description:
            "See how your types connect — references, collections, embeddings, and maps.",
          link: { label: "Scanning", to: "/guides/scanning" },
        },
        {
          feature: "Permanent Caching",
          description:
            "Extract once, use forever. No cache invalidation to worry about.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Custom Tags",
          description:
            "Register your own struct tags and sentinel will parse them for you.",
          link: { label: "Tags", to: "/guides/tags" },
        },
        {
          feature: "Module-Aware Scanning",
          description:
            "Recursively extract related types without leaving your module boundary.",
          link: { label: "Scanning", to: "/guides/scanning" },
        },
        {
          feature: "Schema Export",
          description:
            "Dump everything sentinel knows in one call with Schema().",
          link: { label: "API", to: "/reference/api" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full sentinel documentation.",
    },
    repo: "https://github.com/zoobz-io/sentinel",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
