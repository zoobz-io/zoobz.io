export default defineAppConfig({
  title: "Zyn",
  collection: {
    key: "zyn",
    title: "Zyn",
    hero: {
      tagline: "Type-Safe LLM Orchestration for Go.",
      taglineHighlight: "Synapses. Sessions. Structure.",
      description:
        "Interact with LLMs through typed synapses that return validated Go structs, not raw strings. Sessions maintain conversation context across calls, and pipz integration provides retry, timeout, and circuit breaking out of the box.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/zyn"

type Contact struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Role  string \`json:"role"\`
}

func (c Contact) Validate() error {
    if c.Email == "" {
        return errors.New("email required")
    }
    return nil
}

// Type-safe extraction — LLM output → validated struct
extractor, _ := zyn.Extract[Contact]("contact information", provider)

// Sessions carry conversation context across calls
session := zyn.NewSession()
contact, _ := extractor.Fire(ctx, session, "Reach John at john@acme.com, he's the CTO")
// contact.Name = "John", contact.Email = "john@acme.com", contact.Role = "CTO"

// 8 synapse types for different reasoning tasks
decision, _ := zyn.Binary("Is this a business email?", provider)
result, _ := decision.Fire(ctx, session, contact.Email) // true

category, _ := zyn.Classification("department", provider, "engineering", "sales", "support")
dept, _ := category.Fire(ctx, session, "I need help with the API integration")
// dept = "engineering"`,
      },
    },
    highlights: {
      title: "Why Zyn?",
      description:
        "Structured, type-safe LLM interactions with conversational context and built-in reliability.",
      items: [
        {
          icon: "code",
          title: "Type-Safe at the Edges",
          description:
            "Generics ensure LLM outputs match expected types at compile time. Invalid responses fail validation before reaching your code.",
        },
        {
          icon: "sort",
          title: "8 Synapse Types",
          description:
            "Binary, Classification, Ranking, Sentiment, Extract, Transform, Analyze, Convert — each with structured prompts that prevent output divergence.",
        },
        {
          icon: "memory",
          title: "Conversational Sessions",
          description:
            "Sessions carry full conversation history across synapse calls. Transactional updates — session only changes on successful completion.",
        },
        {
          icon: "shield",
          title: "Built-In Reliability",
          description:
            "Pipz integration for retry with backoff, timeout, circuit breaker, rate limiting, and fallback synapses. No boilerplate.",
        },
        {
          icon: "explore",
          title: "Automatic Observability",
          description:
            "Capitan signals fire at every LLM operation — RequestStarted, ProviderCallCompleted, ResponseParseFailed. No instrumentation needed.",
        },
        {
          icon: "check",
          title: "Validator Pattern",
          description:
            "Custom types implement Validate() error for runtime validation of LLM responses. Catches malformed outputs before they propagate.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Typed synapses, conversational sessions, and reliability patterns for production LLM applications.",
      items: [
        {
          feature: "Extraction Synapses",
          description:
            "Extract structured data into validated Go types. Analyze structured input into text. Convert between types via LLM reasoning.",
          link: { label: "Extraction Pipelines", to: "/cookbook/extraction-pipelines" },
        },
        {
          feature: "Decision Synapses",
          description:
            "Binary yes/no, Classification into categories, Ranking by criteria, Sentiment analysis with emotional scoring.",
          link: { label: "Classification Workflows", to: "/cookbook/classification-workflows" },
        },
        {
          feature: "Session Management",
          description:
            "Prune, Truncate, Clear, Insert, Replace operations on conversation history. Context accumulates naturally across calls.",
          link: { label: "Sessions", to: "/guides/sessions" },
        },
        {
          feature: "Provider Configuration",
          description:
            "Simple Provider interface. OpenAI included, mock provider for testing. Any LLM backend via one method.",
          link: { label: "Providers", to: "/guides/providers" },
        },
        {
          feature: "Reliability Patterns",
          description:
            "Retry with exponential backoff, timeout protection, circuit breakers, rate limiting, and fallback chains.",
          link: { label: "Reliability", to: "/guides/reliability" },
        },
        {
          feature: "Error Handling",
          description:
            "Structured error responses with context. Validation failures, provider errors, and parse failures all typed and actionable.",
          link: { label: "Error Handling", to: "/cookbook/error-handling" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full zyn documentation.",
    },
    repo: "https://github.com/zoobz-io/zyn",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
