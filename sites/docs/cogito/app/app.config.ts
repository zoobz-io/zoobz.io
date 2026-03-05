export default defineAppConfig({
  title: "Cogito",
  collection: {
    key: "cogito",
    title: "Cogito",
    hero: {
      tagline: "LLM Reasoning Chains for Go.",
      taglineHighlight: "Think. Accumulate. Decide.",
      description:
        "Build autonomous reasoning systems with composable primitives that accumulate context through multi-step pipelines. Thoughts carry Notes across steps — each primitive builds on previous reasoning without redundancy.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/cogito"

// Create a reasoning thought
thought := cogito.NewThought(ctx, provider, "Analyze support ticket")

// Composable primitives — each builds on accumulated context
pipeline := pipz.NewSequence(pipelineID,
    cogito.Analyze[TicketAnalysis]("Extract ticket details"),
    cogito.Categorize("Classify priority",
        "critical", "high", "medium", "low",
    ),
    cogito.Decide("Requires escalation?"),
    cogito.Sift("Route only critical issues",
        cogito.Seek("Find similar resolved tickets", vectorStore),
    ),
    cogito.Reflect("Summarize findings"),
)

// Each step reads previous Notes, adds new ones
result, _ := pipeline.Process(ctx, thought)

// Full audit trail — every reasoning step is a Note
for _, note := range result.Notes() {
    fmt.Printf("[%s] %s: %s\\n", note.Source, note.Key, note.Value)
}`,
      },
    },
    highlights: {
      title: "Why Cogito?",
      description:
        "Composable reasoning primitives with accumulated context and full audit trails.",
      items: [
        {
          icon: "explore",
          title: "Thought-Note Architecture",
          description:
            "Thoughts accumulate Notes across pipeline steps. Each primitive reads unpublished notes, processes, and marks them published — zero redundant LLM calls.",
        },
        {
          icon: "sort",
          title: "Semantic Control Flow",
          description:
            "Sift (LLM gate) and Discern (LLM router) adapt to domain changes without code changes. The model interprets intent, not data structure.",
        },
        {
          icon: "shield",
          title: "Two-Phase Reasoning",
          description:
            "Deterministic phase (temp=0) for consistent decisions, optional creative introspection (temp=0.7) for semantic summaries explaining why.",
        },
        {
          icon: "search",
          title: "Vector-Backed Memory",
          description:
            "Seek and Survey primitives search semantic memory. Notes persist with embeddings for retrieval across reasoning sessions.",
        },
        {
          icon: "code",
          title: "10 Reasoning Primitives",
          description:
            "Decide, Analyze, Categorize, Assess, Prioritize, Reflect, Seek, Survey, Sift, Discern — composable via pipz.Chainable[*Thought].",
        },
        {
          icon: "cache",
          title: "Token-Aware Management",
          description:
            "Compress (LLM summarization) and Truncate (sliding window) manage token budgets without losing reasoning context.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Reasoning primitives, semantic control flow, and context accumulation for autonomous AI systems.",
      items: [
        {
          feature: "Decision Primitives",
          description:
            "Decide (binary), Categorize (classify), Prioritize (rank), Assess (sentiment) — structured reasoning outputs with confidence scores.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Data Extraction",
          description:
            "Analyze extracts structured data into typed results. Type-safe generics ensure compile-time checking of reasoning outputs.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Semantic Routing",
          description:
            "Sift gates execution based on LLM judgment. Discern routes to different processors based on meaning, not data structure.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Synthesis Patterns",
          description:
            "Amplify for iterative refinement, Converge for parallel execution with semantic synthesis across reasoning paths.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Thought Cloning",
          description:
            "Clone thoughts for independent parallel reasoning paths while maintaining connection to original context.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Provider Hierarchy",
          description:
            "Step-level, context-level, or global provider configuration. Switch LLM providers per primitive without rewiring.",
          link: { label: "API", to: "/reference/api" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full cogito documentation.",
    },
    repo: "https://github.com/zoobzio/cogito",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
