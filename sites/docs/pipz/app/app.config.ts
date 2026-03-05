export default defineAppConfig({
  title: "Pipz",
  collection: {
    key: "pipz",
    title: "Pipz",
    hero: {
      tagline: "Composable Data Pipelines for Go.",
      taglineHighlight: "One Interface. Infinite Composition.",
      description:
        "Build complex data processing from small, reusable parts. Every processor and connector implements Chainable[T] — compose retry, circuit breaking, and routing without changing your logic.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/pipz"

// Small, focused processors
validate := pipz.Apply(validateID, func(_ context.Context, o Order) (Order, error) {
    if o.Total <= 0 {
        return o, errors.New("invalid total")
    }
    return o, nil
})

enrich := pipz.Transform(enrichID, func(_ context.Context, o Order) Order {
    o.ProcessedAt = time.Now()
    return o
})

notify := pipz.Effect(notifyID, func(_ context.Context, o Order) error {
    return sendConfirmation(o)
})

// Compose with resilience — it's Chainable[T] all the way down
pipeline := pipz.NewSequence(pipelineID,
    validate,
    enrich,
    pipz.NewRetry(retryID, notify, pipz.RetryConfig{MaxAttempts: 3}),
)

result, err := pipeline.Process(ctx, order)
if err != nil {
    var pipeErr *pipz.Error[Order]
    errors.As(err, &pipeErr)
    fmt.Println(pipeErr.Path) // ["pipeline", "retry", "notify"]
}`,
      },
    },
    highlights: {
      title: "Why Pipz?",
      description:
        "One interface, every primitive. Processors and connectors compose without limits.",
      items: [
        {
          icon: "link",
          title: "Uniform Chainable[T] Interface",
          description:
            "Every processor, every connector, every pipeline implements one interface. Seamless composition, zero special cases.",
        },
        {
          icon: "shield",
          title: "Composable Resilience",
          description:
            "Layer retry, circuit breaker, timeout, and rate limiting without changing processing logic. Nest freely.",
        },
        {
          icon: "explore",
          title: "Rich Error Context",
          description:
            "Errors carry the full path through the pipeline, duration, and input data at failure. Know exactly where and why.",
        },
        {
          icon: "bolt",
          title: "Observable Without Instrumentation",
          description:
            "Stateful connectors emit typed capitan signals at critical transitions. Monitoring requires no code changes.",
        },
        {
          icon: "lock",
          title: "Panic-Safe Execution",
          description:
            "Panics recovered automatically with security-conscious sanitization. Sensitive data won't leak in error messages.",
        },
        {
          icon: "code",
          title: "Extensible Vocabulary",
          description:
            "Libraries define domain-specific processors returning Chainable[T]. Users extend with custom implementations — all first-class.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Processors for transformation, connectors for orchestration — all composable through one interface.",
      items: [
        {
          feature: "Processors",
          description:
            "Transform, Apply, Effect, Mutate, Enrich, Filter — immutable wrappers around your functions.",
          link: { label: "Core Concepts", to: "/learn/core-concepts" },
        },
        {
          feature: "Flow Control",
          description:
            "Sequence, Concurrent, WorkerPool, Race, Contest — orchestrate execution order and parallelism.",
          link: { label: "Connector Selection", to: "/guides/connector-selection" },
        },
        {
          feature: "Resilience Patterns",
          description:
            "Retry, Backoff, CircuitBreaker, RateLimiter, Timeout, Fallback — layer without code changes.",
          link: { label: "Safety & Reliability", to: "/guides/safety-reliability" },
        },
        {
          feature: "Conditional Routing",
          description:
            "Switch for multi-way routing, Filter for gates. Route data through different paths based on content.",
          link: { label: "Building Pipelines", to: "/cookbook/building-pipelines" },
        },
        {
          feature: "Error Pipelines",
          description:
            "Errors as data flowing through the same patterns. Build recovery using Switch, Sequence, Fallback.",
          link: { label: "Core Concepts", to: "/learn/core-concepts" },
        },
        {
          feature: "Signal Observability",
          description:
            "Typed capitan events for circuit state changes, rate limit hits, retry exhaustion, and timeout breaches.",
          link: { label: "Hooks", to: "/learn/hooks" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full pipz documentation.",
    },
    repo: "https://github.com/zoobzio/pipz",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
