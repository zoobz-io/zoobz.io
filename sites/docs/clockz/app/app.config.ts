export default defineAppConfig({
  title: "Clockz",
  collection: {
    key: "clockz",
    title: "Clockz",
    hero: {
      tagline: "Testable Time for Go.",
      taglineHighlight: "Deterministic. Instant.",
      description:
        "Inject a clock, control time in tests. Real clock for production, fake clock for testing — same API, zero flakiness.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/clockz"

func TestRetryBackoff(t *testing.T) {
    clock := clockz.NewFakeClockAt(time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC))
    service := NewService(clock)

    go service.RetryWithBackoff()

    clock.Advance(1 * time.Second)   // First retry
    clock.Advance(2 * time.Second)   // Second retry
    clock.Advance(4 * time.Second)   // Third retry
    // Test completes in milliseconds, not seconds
}

// Production: zero overhead
service := NewService(clockz.RealClock)

// Testing: full control
clock := clockz.NewFakeClockAt(time.Now())
service := NewService(clock)

ctx, cancel := clock.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
clock.Advance(6 * time.Second) // Context cancelled instantly`,
      },
    },
    highlights: {
      title: "Why Clockz?",
      description:
        "Make time-dependent code testable without sleeps, flakiness, or rewrites.",
      items: [
        {
          icon: "bolt",
          title: "Instant Tests",
          description:
            "Advance hours in microseconds. Retry backoff tests that took seconds now complete instantly.",
        },
        {
          icon: "code",
          title: "Mirrors time Package",
          description:
            "Same API you already know. time.Now() becomes clock.Now(). No new patterns to learn.",
        },
        {
          icon: "anchor",
          title: "Context-Aware Deadlines",
          description:
            "WithTimeout and WithDeadline respect fake time. Contexts cancel when you advance past their deadline.",
        },
        {
          icon: "settings",
          title: "Full Timer Support",
          description:
            "Timer, Ticker, AfterFunc — all with proper channel semantics matching the time package exactly.",
        },
        {
          icon: "lock",
          title: "Thread-Safe",
          description:
            "Both RealClock and FakeClock handle concurrent use. Advance while goroutines wait on timers.",
        },
        {
          icon: "check",
          title: "BlockUntilReady",
          description:
            "Synchronize goroutine setup before advancing time. Eliminates the race between setup and assertion.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Two implementations of one interface — swap between real and fake time without changing your code.",
      items: [
        {
          feature: "Fake Clock",
          description:
            "Manual time control with Advance() and SetTime(). Tests complete in microseconds regardless of duration logic.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Real Clock",
          description:
            "Zero-overhead delegation to the time package. No allocations, no synchronization, no measurable cost.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Timers & Tickers",
          description:
            "Channel-based timing primitives that fire in chronological order when fake time advances.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Context Integration",
          description:
            "WithTimeout and WithDeadline create contexts that respect fake time, including early-return for expired deadlines.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "AfterFunc",
          description:
            "Callbacks execute synchronously during Advance() on FakeClock, in goroutines on RealClock.",
          link: { label: "API", to: "/reference/api" },
        },
        {
          feature: "Synchronization",
          description:
            "BlockUntilReady() and HasWaiters() ensure goroutines have registered their timers before you advance.",
          link: { label: "Patterns", to: "/cookbook/patterns" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full clockz documentation.",
    },
    repo: "https://github.com/zoobz-io/clockz",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
