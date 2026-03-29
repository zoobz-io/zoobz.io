export default defineAppConfig({
  title: "Capitan",
  collection: {
    key: "capitan",
    title: "Capitan",
    hero: {
      tagline: "Event Coordination for Go.",
      taglineHighlight: "Zero Dependencies.",
      description:
        "Type-safe signals, async workers with backpressure, and decoupled event flows across your entire application.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/capitan"

// Define typed keys
orderID := capitan.NewStringKey("order_id")
total   := capitan.NewFloat64Key("total")

// Define a signal
orderCreated := capitan.NewSignal("order.created", "New order placed")

// Emit with typed fields
capitan.Emit(ctx, orderCreated,
    orderID.Field("ORD-123"),
    total.Field(99.99),
)

// Hook a listener — extract typed values directly
capitan.Hook(orderCreated, func(ctx context.Context, e *capitan.Event) {
    id, _ := orderID.From(e)      // string
    amount, _ := total.From(e)    // float64
    process(id, amount)
})

// Observe all signals — unified visibility
capitan.Observe(func(ctx context.Context, e *capitan.Event) {
    log.Info("event", "signal", e.Signal().Name())
})`,
      },
    },
    highlights: {
      title: "Why Capitan?",
      description:
        "In-process event coordination that stays out of your way.",
      items: [
        {
          icon: "code",
          title: "Type-Safe Fields",
          description:
            "Typed keys with compile-time safety. No runtime assertions, no interface{} gymnastics.",
        },
        {
          icon: "shield",
          title: "Zero Dependencies",
          description:
            "Nothing but the Go standard library. No bloat, no surprises.",
        },
        {
          icon: "bolt",
          title: "Async by Default",
          description:
            "Per-signal workers with buffered queues and backpressure. Slow listeners can't block others.",
        },
        {
          icon: "lock",
          title: "Panic-Safe",
          description:
            "Listener panics are recovered automatically. One bad handler won't crash your system.",
        },
        {
          icon: "search",
          title: "Cross-Cutting Observers",
          description:
            "Observe all signals or a filtered subset for logging, metrics, and audit trails.",
        },
        {
          icon: "cache",
          title: "Testable",
          description:
            "Sync mode, event capture, and isolated instances for deterministic tests.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Everything capitan provides for decoupled event coordination in Go.",
      items: [
        {
          feature: "Typed Fields",
          description:
            "Built-in keys for primitives and NewKey[T] for any custom type — all compile-time safe.",
          link: { label: "Fields", to: "/reference/fields" },
        },
        {
          feature: "Per-Signal Workers",
          description:
            "Each signal gets its own goroutine and buffered queue. Isolated, async, backpressure-aware.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Observers",
          description:
            "Cross-cutting handlers that see all signals or a filtered whitelist.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Configuration",
          description:
            "Buffer sizes, rate limits, drop policies, and panic handlers.",
          link: { label: "Configuration", to: "/guides/configuration" },
        },
        {
          feature: "Graceful Shutdown",
          description:
            "Drain pending events before exit. Safe to call multiple times.",
          link: { label: "Best Practices", to: "/guides/best-practices" },
        },
        {
          feature: "Testing Utilities",
          description:
            "Sync mode, event capture, and isolated instances for deterministic tests.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full capitan documentation.",
    },
    repo: "https://github.com/zoobz-io/capitan",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
