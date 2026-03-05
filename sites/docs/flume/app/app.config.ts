export default defineAppConfig({
  title: "Flume",
  collection: {
    key: "flume",
    title: "Flume",
    hero: {
      tagline: "Dynamic Pipeline Factory for Go.",
      taglineHighlight: "Logic in Code, Structure in Schema.",
      description:
        "Register processing components once, define pipeline structure in YAML, and update behavior at runtime without redeployment. Built on pipz.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/flume"

// 1. Register components once
factory := flume.New[Order]()
factory.Add(
    pipz.Apply("validate", func(ctx context.Context, o Order) (Order, error) {
        if o.Total <= 0 { return o, fmt.Errorf("invalid total") }
        return o, nil
    }),
    pipz.Apply("apply-discount", func(ctx context.Context, o Order) (Order, error) {
        o.Total *= 0.9
        return o, nil
    }),
)
factory.AddPredicate(flume.Predicate[Order]{
    Name: "is-premium",
    Predicate: func(_ context.Context, o Order) bool { return o.Tier == "premium" },
})

// 2. Define structure in YAML — not in code
pipeline, _ := factory.BuildFromYAML(\`
type: sequence
children:
  - ref: validate
  - type: filter
    predicate: is-premium
    then:
      ref: apply-discount
\`)

// 3. Process data
result, _ := pipeline.Process(ctx, order)

// 4. Update behavior at runtime — no restart
factory.SetSchema("order-pipeline", newSchema)`,
      },
    },
    highlights: {
      title: "Why Flume?",
      description:
        "Separate what your code does from how it's wired together.",
      items: [
        {
          icon: "bolt",
          title: "Atomic Hot Reloading",
          description:
            "Pipeline structure updates without restarts via atomic pointer swap. In-flight requests finish with old pipeline, new requests get the new one.",
        },
        {
          icon: "settings",
          title: "14 Connector Types",
          description:
            "Sequence, filter, retry, timeout, circuit-breaker, rate-limit, fallback, switch, concurrent, race, contest, handle, scaffold, worker-pool.",
        },
        {
          icon: "speed",
          title: "Lock-Free Execution",
          description:
            "Pipeline reads use atomic loads — zero lock overhead during processing. Updates serialize at low priority.",
        },
        {
          icon: "shield",
          title: "Comprehensive Validation",
          description:
            "Catches reference errors, circular dependencies, and constraint violations before build. Full path context in error messages.",
        },
        {
          icon: "explore",
          title: "Built-In Observability",
          description:
            "Capitan events for factory creation, registration, validation, builds, and schema updates. Metrics and audit out of the box.",
        },
        {
          icon: "code",
          title: "Type-Safe Generics",
          description:
            "Full compile-time safety from factory to pipeline. Your data type flows through the entire stack with zero reflection.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Schema-driven pipeline construction with hot reloading, validation, and observability.",
      items: [
        {
          feature: "Schema-Driven Construction",
          description:
            "Define pipelines in YAML or JSON at runtime. Operators modify config, not Go code.",
          link: { label: "Schema Format", to: "/reference/schema-format" },
        },
        {
          feature: "Hot Reloading",
          description:
            "SetSchema() triggers automatic rebuild for all auto-sync bindings. Atomic swap, zero downtime.",
          link: { label: "Hot Reloading", to: "/guides/hot-reloading" },
        },
        {
          feature: "Lock-Free Bindings",
          description:
            "Concurrent-safe pipeline access with atomic pointer swaps. No locks during processing.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Schema Validation",
          description:
            "Reference checking, circular detection, constraint satisfaction — all before building. CI/CD linting support.",
          link: { label: "Schema Design", to: "/guides/schema-design" },
        },
        {
          feature: "Error Handling Patterns",
          description:
            "Retry with backoff, fallback chains, circuit breakers, and timeouts — all declarative in schema.",
          link: { label: "Error Handling", to: "/guides/error-handling" },
        },
        {
          feature: "Event Emission",
          description:
            "Capitan signals for factory lifecycle, schema changes, builds, and pipeline access.",
          link: { label: "Observability", to: "/guides/observability" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full flume documentation.",
    },
    repo: "https://github.com/zoobzio/flume",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
