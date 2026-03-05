export default defineAppConfig({
  title: "Vecna",
  collection: {
    key: "vecna",
    title: "Vecna",
    hero: {
      tagline: "Schema-Validated Vector Filters for Go.",
      taglineHighlight: "Catch Typos Before Queries.",
      description:
        "Build metadata filters for vector databases with compile-time field validation and type checking. Typos and type mismatches surface at build time — not as silent empty results at query time.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/vecna"

type Metadata struct {
    Category string  \`json:"category"\`
    Price    float64 \`json:"price"\`
    InStock  bool    \`json:"in_stock"\`
}

// Schema extracted from struct tags — no new annotations
builder, _ := vecna.New[Metadata]()

// Field validation catches typos immediately
filter := builder.And(
    builder.Where("category").Eq("electronics"),
    builder.Where("price").Lte(99.99),
    builder.Where("in_stock").Eq(true),
)

// Deferred error handling — check once at the end
if err := filter.Err(); err != nil {
    log.Fatal(err) // "unknown field: categroy" — not a silent empty result
}

// Build from JSON for dynamic queries (API, LLM output)
spec := vecna.FilterSpec{Op: "eq", Field: "category", Value: "tech"}
filter, _ = builder.FromSpec(spec)`,
      },
    },
    highlights: {
      title: "Why Vecna?",
      description:
        "Metadata filters that fail fast with clear errors instead of silent empty results.",
      items: [
        {
          icon: "shield",
          title: "Field Validation",
          description:
            "Every Where() call validates the field exists in your struct. Typos surface immediately, not as cryptic database errors.",
        },
        {
          icon: "check",
          title: "Type Checking",
          description:
            "Numeric operators (Gt, Gte, Lt, Lte) only work on numeric fields. String comparisons on numbers error at build time.",
        },
        {
          icon: "tag",
          title: "Zero New Tags",
          description:
            "Uses your existing json struct tags for schema extraction. No vecna-specific annotations required.",
        },
        {
          icon: "code",
          title: "Filters as Data",
          description:
            "FilterSpec enables filters built from JSON, config files, or LLM output — still schema-validated before execution.",
        },
        {
          icon: "speed",
          title: "Cached Schema Extraction",
          description:
            "Sentinel-backed struct inspection cached permanently per type. O(1) field lookups after initial extraction.",
        },
        {
          icon: "sort",
          title: "Deferred Error Handling",
          description:
            "Build complex nested filter trees fluently. Check all errors once at the end via filter.Err() — no interruptions mid-chain.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Schema-validated filter construction with type safety, fluent composition, and serializable specs.",
      items: [
        {
          feature: "Schema Extraction",
          description:
            "Inspect Go struct fields via json tags to build a validation registry. Handles embedded structs and nested types.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Filter Operators",
          description:
            "Eq, Ne, Gt, Gte, Lt, Lte, In — all type-checked against the schema. Logical And/Or composition for complex queries.",
          link: { label: "Operators", to: "/reference/operators" },
        },
        {
          feature: "FilterSpec Serialization",
          description:
            "JSON-serializable filter specifications for dynamic query construction. Store, transmit, or generate filters externally.",
          link: { label: "Specs", to: "/guides/specs" },
        },
        {
          feature: "Grub Integration",
          description:
            "Powers the filter system in grub for schema-validated queries across Pinecone, Qdrant, Weaviate, Milvus, and pgvector.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Thread Safety",
          description:
            "Builder and Filter immutable after creation. Safe for concurrent use across goroutines without synchronization.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Testing",
          description:
            "Verify filter construction, error handling, and spec round-tripping. Test utilities for schema validation.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full vecna documentation.",
    },
    repo: "https://github.com/zoobzio/vecna",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
