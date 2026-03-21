export default defineAppConfig({
  title: "Streamz",
  collection: {
    key: "streamz",
    title: "Streamz",
    hero: {
      tagline: "Stream Processing Primitives for Go.",
      taglineHighlight: "Channels Composed, Not Managed.",
      description:
        "Type-safe processors that transform channels into channels. Filter, map, batch, window, retry — all following one interface, all composable like Unix pipes.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/streamz"

// Create input stream
orders := make(chan streamz.Result[Order], 10)
go func() {
    defer close(orders)
    for _, o := range incoming {
        orders <- streamz.Success(o)
    }
}()

// Compose processors — output feeds input, like Unix pipes
filter := streamz.NewFilter(func(o Order) bool {
    return o.Total > 0
}).WithName("validate-amount")

mapper := streamz.NewMapper(func(o Order) Order {
    o.ProcessedAt = time.Now()
    return o
}).WithName("enrich")

batcher := streamz.NewBatcher[Order](streamz.BatchConfig{
    MaxSize:    100,
    MaxLatency: time.Second,
})

// Every processor: same interface, natural composition
filtered := filter.Process(ctx, orders)
enriched := mapper.Process(ctx, filtered)
batched  := batcher.Process(ctx, enriched)

for batch := range batched {
    bulkInsert(batch) // []Order batches
}
// No goroutine management. No channel closing. No backpressure code.`,
      },
    },
    highlights: {
      title: "Why Streamz?",
      description:
        "40+ processors that handle channels, goroutines, and backpressure so you don't have to.",
      items: [
        {
          icon: "link",
          title: "Single Processor Interface",
          description:
            "All 40+ processors follow one signature: channel in, channel out. Filter, map, batch, window, retry — all composable.",
        },
        {
          icon: "code",
          title: "Result[T] Error Handling",
          description:
            "Success and errors on one channel. No dual-channel complexity, no select on two channels. Errors carry processor context.",
        },
        {
          icon: "settings",
          title: "Automatic Channel Lifecycle",
          description:
            "Output closes when input closes, context cancellation respected, goroutine leaks prevented. You never manage channels.",
        },
        {
          icon: "speed",
          title: "Built-In Backpressure",
          description:
            "Natural backpressure, dropping, sliding windows, and sampling. Choose the right strategy for your latency vs completeness tradeoff.",
        },
        {
          icon: "shield",
          title: "Composable Error Recovery",
          description:
            "Retry with backoff, circuit breakers, dead letter queues, skip-on-error — all processors that layer naturally.",
        },
        {
          icon: "anchor",
          title: "Clock Injection for Testing",
          description:
            "Time-dependent processors accept a clock interface. Advance fake time explicitly — deterministic tests, zero flakiness.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "From simple filters to batched windows with error recovery — all composable, all type-safe.",
      items: [
        {
          feature: "Transformation",
          description:
            "Filter, map, and aggregate with compile-time type checking. Processor mismatches caught at compile time.",
          link: { label: "Processors", to: "/learn/processors" },
        },
        {
          feature: "Batching & Windowing",
          description:
            "Accumulate items by count or time. Create time-based windows for aggregation and analytics.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Error Recovery",
          description:
            "Retry with backoff, circuit breakers, dead letter queues, and graceful degradation as composable processors.",
          link: { label: "Error Handling", to: "/learn/error-handling" },
        },
        {
          feature: "Flow Control",
          description:
            "Throttle, debounce, buffer, sample, and drop strategies for different workload characteristics.",
          link: { label: "Backpressure", to: "/learn/backpressure" },
        },
        {
          feature: "Deterministic Testing",
          description:
            "Clock abstraction for time-dependent processors. Advance time explicitly, verify behavior reproducibly.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "Production Patterns",
          description:
            "19+ real-world patterns: ETL, analytics, content routing, A/B testing, canary deployments.",
          link: { label: "Patterns", to: "/guides/patterns" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full streamz documentation.",
    },
    repo: "https://github.com/zoobz-io/streamz",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
