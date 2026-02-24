export default defineAppConfig({
  title: "Sentinel",
  collection: {
    key: "sentinel",
    title: "Sentinel",
    hero: {
      tagline: "Struct Introspection for Go.",
      taglineHighlight: "Zero Dependencies.",
      description:
        "Extract struct metadata once, cache it permanently, and discover relationships between types.",
      action: { label: "Get Started", to: "/" },
      example: {
        lang: "go",
        code: `type User struct {
    ID      string   \`json:"id" db:"id" validate:"required"\`
    Email   string   \`json:"email" validate:"required,email"\`
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
    landing: [
      {
        type: "install",
        title: "Install",
        description: "Requires Go 1.24+",
        code: "go get github.com/zoobzio/sentinel@latest",
        lang: "bash",
      },
      {
        type: "highlights",
        title: "Why Sentinel?",
        description:
          "Built for production Go codebases where type metadata matters.",
        items: [
          {
            icon: "shield",
            title: "Zero Dependencies",
            description: "Only the Go standard library",
          },
          {
            icon: "cache",
            title: "Permanent Caching",
            description:
              "Types are immutable at runtime, so metadata is cached once",
          },
          {
            icon: "code",
            title: "Type-Safe Generics",
            description:
              "Inspect[T]() catches type errors at compile time",
          },
          {
            icon: "link",
            title: "Relationship Discovery",
            description:
              "Automatically maps references, collections, embeddings, and maps",
          },
          {
            icon: "search",
            title: "Module-Aware Scanning",
            description:
              "Scan[T]() recursively extracts related types within your module",
          },
          {
            icon: "lock",
            title: "Thread-Safe",
            description: "Concurrent access after initial extraction",
          },
        ],
      },
      {
        type: "capabilities",
        title: "Capabilities",
        description:
          "Everything sentinel extracts from your Go types, cached permanently after first access.",
        items: [
          {
            feature: "Metadata Extraction",
            description:
              "Fields, types, indices, categories, struct tags",
            link: { label: "Concepts", to: "learn/concepts" },
          },
          {
            feature: "Relationship Discovery",
            description:
              "References, collections, embeddings, maps",
            link: { label: "Scanning", to: "guides/scanning" },
          },
          {
            feature: "Permanent Caching",
            description: "Extract once, cached forever",
            link: { label: "Architecture", to: "learn/architecture" },
          },
          {
            feature: "Custom Tags",
            description: "Register additional struct tags",
            link: { label: "Tags", to: "guides/tags" },
          },
          {
            feature: "Module-Aware Scanning",
            description:
              "Recursive extraction within module boundaries",
            link: { label: "Scanning", to: "guides/scanning" },
          },
          {
            feature: "Schema Export",
            description: "Schema() returns all cached metadata",
            link: { label: "API", to: "reference/api" },
          },
        ],
      },
    ],
    repo: "https://github.com/zoobzio/sentinel",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
