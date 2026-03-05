export default defineAppConfig({
  title: "Scio",
  collection: {
    key: "scio",
    title: "Scio",
    hero: {
      tagline: "Data Catalog for Go.",
      taglineHighlight: "URI-Addressed. Type-Agnostic.",
      description:
        "Register databases, caches, blob stores, and vector indices with URIs. Scio routes operations to the right provider and maps your data topology.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/scio"

s := scio.New()

// Register resources — scio routes by URI scheme
s.RegisterDatabase("db://users", usersDB.Atomic())
s.RegisterStore("kv://sessions", sessionsStore.Atomic())
s.RegisterBucket("bcs://documents", docsBucket.Atomic())

// Uniform access via URI
atom, _ := s.Get(ctx, "db://users/123")
s.Set(ctx, "kv://sessions/abc", sessionAtom)
s.Put(ctx, "bcs://documents/report.pdf", data)

// Query databases through the catalog
results, _ := s.Query(ctx, "db://users", stmt, params)

// Introspect the topology
s.Sources()                    // all registered resources
s.FindBySpec(userSpec)         // resources sharing a type
s.FindByField("email")        // resources with an email field
s.Related("db://users")       // other resources holding User data`,
      },
    },
    highlights: {
      title: "Why Scio?",
      description:
        "A unified routing layer between your application and every storage backend it touches.",
      items: [
        {
          icon: "link",
          title: "URI Addressing",
          description:
            "db://users/123, kv://sessions/abc, bcs://documents/report.pdf — one addressing scheme for every backend.",
        },
        {
          icon: "code",
          title: "Type-Agnostic Atoms",
          description:
            "Infrastructure works with typed maps, not your structs. Storage code never imports domain types.",
        },
        {
          icon: "search",
          title: "Topology Discovery",
          description:
            "Automatically detects when multiple resources share the same underlying type. No manual wiring.",
        },
        {
          icon: "filter",
          title: "Field-Level Search",
          description:
            "Find every resource in your system that contains a specific field. Cross-backend introspection.",
        },
        {
          icon: "tag",
          title: "Resource Metadata",
          description:
            "Tag resources with ownership, PII flags, versioning, and descriptions for governance and discovery.",
        },
        {
          icon: "shield",
          title: "Semantic Errors",
          description:
            "Distinguishes routing errors from provider errors. Invalid URIs, unknown variants, and missing resources each have distinct types.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Atomic operations across databases, caches, blob stores, and vector indices — all through URI routing.",
      items: [
        {
          feature: "Atomic Operations",
          description:
            "Get, Set, Delete, Exists across every registered backend. One interface, any provider.",
          link: { label: "API", to: "/reference/api" },
        },
        {
          feature: "Database Queries",
          description:
            "Execute typed queries via URI-addressed database resources with parameterized statements.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Cache TTL",
          description:
            "SetWithTTL for cache resources with automatic expiration. Time-bounded entries out of the box.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Blob Storage",
          description:
            "Put and Get for object storage resources. Files, documents, and binary data via URI.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Topology Introspection",
          description:
            "Sources, FindBySpec, FindByField, Related — discover your data landscape at runtime.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Resource Registration",
          description:
            "Register with descriptions, versions, tags, and ownership metadata for governance and discoverability.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full scio documentation.",
    },
    repo: "https://github.com/zoobzio/scio",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
