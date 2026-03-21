export default defineAppConfig({
  title: "Herald",
  collection: {
    key: "herald",
    title: "Herald",
    hero: {
      tagline: "Bidirectional Event Bridge for Go.",
      taglineHighlight: "Internal Events Meet External Messages.",
      description:
        "Connect capitan events to distributed message brokers. Publish internal events to Kafka, NATS, or SQS — subscribe from brokers and emit as capitan events. Same types, same signals, both directions.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/herald"

// Publish internal events to a broker
publisher := herald.NewPublisher[Order](cap, provider,
    herald.WithSignal(orderCreatedSignal),
    herald.UseApply(addTraceHeaders),
)
publisher.Start(ctx) // Events flow out automatically

// Subscribe from broker, emit as capitan events
subscriber := herald.NewSubscriber[Order](cap, provider,
    herald.WithKey(orderKey),
    herald.UseApply(herald.Retry(3, herald.ExponentialBackoff(time.Second))),
)
subscriber.Start(ctx) // Messages flow in as events

// Same types, same signals — zero coupling between services`,
      },
    },
    highlights: {
      title: "Why Herald?",
      description:
        "One abstraction for event publishing and subscribing across any message broker.",
      items: [
        {
          icon: "sort",
          title: "Bidirectional Flow",
          description:
            "Publishers forward capitan events to brokers. Subscribers pull messages and emit as capitan events. Same contract both ways.",
        },
        {
          icon: "link",
          title: "11 Broker Providers",
          description:
            "Kafka, NATS, JetStream, Pub/Sub, Redis, SQS, AMQP, SNS, BoltDB, Firestore, io. Switch brokers without changing application code.",
        },
        {
          icon: "shield",
          title: "Pipeline Reliability",
          description:
            "Retry, backoff, timeout, circuit breaker, and rate limiting via pipz middleware. Per-operation pipeline configuration.",
        },
        {
          icon: "check",
          title: "Automatic Acknowledgment",
          description:
            "Ack on success, Nack on failure. Each broker maps to native semantics — Kafka offsets, JetStream Ack, SQS delete.",
        },
        {
          icon: "code",
          title: "Type-Safe Generics",
          description:
            "Compile-time checked publishers and subscribers via capitan keys. No runtime type assertions or interface{} juggling.",
        },
        {
          icon: "explore",
          title: "Error Observability",
          description:
            "All errors emit as capitan events via herald.ErrorSignal. Centralized handling using existing observability infrastructure.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Publish and subscribe across message brokers with type safety, reliability, and observability.",
      items: [
        {
          feature: "Publishing Patterns",
          description:
            "Forward capitan events to any broker with middleware transformation, metadata injection, and pluggable codecs.",
          link: { label: "Publishing", to: "/guides/publishing" },
        },
        {
          feature: "Subscribing Patterns",
          description:
            "Consume broker messages as capitan events with automatic deserialization, acknowledgment, and error handling.",
          link: { label: "Subscribing", to: "/guides/subscribing" },
        },
        {
          feature: "Reliability Middleware",
          description:
            "Composable pipz processors for retry with backoff, circuit breaking, timeouts, and rate limiting.",
          link: { label: "Reliability", to: "/guides/reliability" },
        },
        {
          feature: "Custom Codecs",
          description:
            "Pluggable serialization beyond JSON default. Protocol Buffers, Avro, or any custom format via one interface.",
          link: { label: "Codecs", to: "/guides/codecs" },
        },
        {
          feature: "Metadata Propagation",
          description:
            "Headers and attributes flow through the entire pipeline and map to broker-native formats. End-to-end tracing support.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Error Handling",
          description:
            "Errors flow through capitan with operation type, signal name, underlying error, and raw payload context.",
          link: { label: "Errors", to: "/guides/errors" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full herald documentation.",
    },
    repo: "https://github.com/zoobz-io/herald",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
