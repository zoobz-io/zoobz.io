export default defineAppConfig({
  title: "Chit",
  collection: {
    key: "chit",
    title: "Chit",
    hero: {
      tagline: "Conversation Lifecycle Controller for Go.",
      taglineHighlight: "Orchestrate. Don't Implement.",
      description:
        "Manage LLM-powered chat interactions with clean separation between conversation plumbing and reasoning logic. History, turn-taking, and streaming handled for you — your processor handles the brain.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/chit"

// Your reasoning logic — any LLM, any strategy
processor := chit.ProcessorFunc(func(
    ctx context.Context,
    input string,
    session *zyn.Session,
) (chit.Result, error) {
    // Internal reasoning stays internal
    response, _ := llm.Complete(ctx, session, input)
    return &chit.Response{Content: response}, nil
})

// Dual-channel emitter — text + structured data
emitter := chit.EmitterFunc(
    func(text string) { stream(text) },       // Emit: conversational text
    func(resource any) { pushToUI(resource) }, // Push: structured resources
)

// Chat handles state, history, streaming
chat := chit.New(processor, emitter)
chat.Handle(ctx, "What's the status of order #42?")

// Multi-turn with Yield — no callback hell
processor = chit.ProcessorFunc(func(ctx context.Context, input string, session *zyn.Session) (chit.Result, error) {
    return &chit.Yield{
        Content: "I need your email to proceed.",
        Continue: func(ctx context.Context, reply string, s *zyn.Session) (chit.Result, error) {
            return &chit.Response{Content: "Confirmed: " + reply}, nil
        },
    }, nil
})`,
      },
    },
    highlights: {
      title: "Why Chit?",
      description:
        "Thin orchestration that separates conversation plumbing from reasoning logic.",
      items: [
        {
          icon: "sort",
          title: "Clean History Separation",
          description:
            "User-facing conversation stays unpolluted. Internal LLM reasoning, retries, and tool calls are the processor's business.",
        },
        {
          icon: "link",
          title: "Yield/Continue Turn-Taking",
          description:
            "Multi-step workflows without callback hell. Return a Yield with a Continuation for natural multi-turn flows.",
        },
        {
          icon: "bolt",
          title: "Dual-Channel Emitter",
          description:
            "Emit conversational text and push structured resources simultaneously. Rich UIs get typed data alongside the conversation.",
        },
        {
          icon: "shield",
          title: "Pipeline-Native Reliability",
          description:
            "Built on pipz for composable retry, timeout, rate limiting, and circuit breaker. Continuations get the same reliability wrappers.",
        },
        {
          icon: "explore",
          title: "Observable Lifecycle",
          description:
            "Capitan signals for ChatCreated, InputReceived, ProcessingStarted, ProcessingCompleted, ResponseEmitted, TurnYielded, TurnResumed.",
        },
        {
          icon: "code",
          title: "Bring Your Own LLM",
          description:
            "Works with any LLM client via the Processor interface. Cogito, OpenAI SDK, or your own — chit doesn't care.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Conversation orchestration with pluggable reasoning, multi-turn flows, and built-in reliability.",
      items: [
        {
          feature: "Processor Interface",
          description:
            "Pluggable reasoning logic. ProcessorFunc for simple cases, full interface for complex workflows. LLM-agnostic.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Multi-Turn Workflows",
          description:
            "Yield/Continue pattern for natural conversation branching. Continuations run through the same reliability pipeline.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Reliability Patterns",
          description:
            "Retry with backoff, timeout protection, circuit breakers, and rate limiting via pipz composition.",
          link: { label: "Reliability", to: "/guides/reliability" },
        },
        {
          feature: "Session Integration",
          description:
            "Built on zyn sessions for typed conversation history. Transactional updates — session only changes on success.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Testing",
          description:
            "Mock processors and emitters for deterministic tests. Processors testable in isolation without chat orchestration.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "Troubleshooting",
          description:
            "Common issues with processor wiring, emitter setup, and continuation state management.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full chit documentation.",
    },
    repo: "https://github.com/zoobzio/chit",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Reference: "reference",
    },
  },
});
