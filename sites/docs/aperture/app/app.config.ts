export default defineAppConfig({
  title: "Aperture",
  collection: {
    key: "aperture",
    title: "Aperture",
    hero: {
      tagline: "Config-Driven Observability for Go.",
      taglineHighlight: "Events In, Telemetry Out.",
      description:
        "Bridge capitan events to OpenTelemetry logs, metrics, and traces with declarative YAML configuration. Change what you observe without recompiling.",
      action: { label: "Getting Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/aperture"

// Create aperture with OTEL providers
ap, _ := aperture.New(cap, logProvider, meterProvider, traceProvider)

// Apply a schema — events become telemetry
ap.Apply(aperture.Schema{
    Logs: aperture.LogSchema{
        Whitelist: []string{"order.created", "order.failed"},
    },
    Metrics: []aperture.MetricSchema{
        {Signal: "order.created", Type: "counter", Name: "orders_total"},
        {Signal: "order.completed", Type: "histogram", Name: "order_duration_ms", Field: "duration"},
    },
    Traces: []aperture.TraceSchema{
        {Start: "order.started", End: "order.completed", Name: "process_order", Correlation: "order_id"},
    },
})

// Direct OTEL access when needed
logger := ap.Logger("checkout")
meter := ap.Meter("checkout")
tracer := ap.Tracer("checkout")`,
      },
    },
    highlights: {
      title: "Why Aperture?",
      description:
        "Separate domain events from observability configuration entirely.",
      items: [
        {
          icon: "explore",
          title: "Three Signals, One Stream",
          description:
            "A single capitan event becomes OTEL logs, metrics, and traces based on schema rules. No instrumentation in application code.",
        },
        {
          icon: "settings",
          title: "Schema-Driven Configuration",
          description:
            "Define what gets observed in YAML or JSON. Change observability rules without recompiling — pair with flux for live reload.",
        },
        {
          icon: "link",
          title: "Automatic Trace Correlation",
          description:
            "Pair start and end events by correlation key into complete spans. Handles out-of-order delivery using emission timestamps.",
        },
        {
          icon: "filter",
          title: "Whitelist Log Filtering",
          description:
            "Default logs everything; whitelist mode narrows to specific signals. Event fields become log attributes automatically.",
        },
        {
          icon: "speed",
          title: "Four Metric Instruments",
          description:
            "Counter, gauge, histogram, and up-down counter. Map any event field to the right instrument type declaratively.",
        },
        {
          icon: "code",
          title: "Context Extraction",
          description:
            "Pull request-scoped values from context.Context into attributes. User ID, tenant, region — available across all three signal types.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Transform domain events into production-grade telemetry with declarative configuration.",
      items: [
        {
          feature: "Log Transformation",
          description:
            "Events become OTEL log records with automatic attribute mapping. Whitelist filtering and custom type JSON serialization.",
          link: { label: "Logs", to: "/guides/logs" },
        },
        {
          feature: "Metric Collection",
          description:
            "Counter increments, gauge snapshots, histogram distributions, and bidirectional counting from event fields.",
          link: { label: "Metrics", to: "/guides/metrics" },
        },
        {
          feature: "Trace Correlation",
          description:
            "Start/end event pairs linked by correlation key become complete spans. Configurable timeout with out-of-order support.",
          link: { label: "Traces", to: "/guides/traces" },
        },
        {
          feature: "Context Values",
          description:
            "Extract context.Context values as OTEL attributes with cardinality-aware registration across logs, metrics, and traces.",
          link: { label: "Context", to: "/guides/context" },
        },
        {
          feature: "Schema Configuration",
          description:
            "File-based YAML/JSON configuration with validation. Hot-reload via Apply() for atomic observability updates.",
          link: { label: "Schema", to: "/guides/schema" },
        },
        {
          feature: "Testing Utilities",
          description:
            "In-memory OTEL exporters for verifying log records, metric data points, and span attributes in unit tests.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full aperture documentation.",
    },
    repo: "https://github.com/zoobz-io/aperture",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
