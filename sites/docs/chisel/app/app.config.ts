export default defineAppConfig({
  title: "Chisel",
  collection: {
    key: "chisel",
    title: "Chisel",
    hero: {
      tagline: "AST-Aware Code Chunking for Go.",
      taglineHighlight: "Semantic Boundaries. Not Line Counts.",
      description:
        "Parse source code into semantic units — functions, classes, methods, types — with structural context and metadata. Feed embedding models chunks that respect code boundaries, not arbitrary line splits.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/chisel"

// Register language providers
chunker := chisel.New(
    chisel.Go(),         // stdlib go/parser — zero C deps
    chisel.TypeScript(), // tree-sitter
    chisel.Python(),     // tree-sitter
    chisel.Rust(),       // tree-sitter
)

// Parse into semantic chunks
chunks := chunker.Chunk(ctx, "go", "service.go", sourceCode)

for _, chunk := range chunks {
    fmt.Printf("%s %s [%d-%d]\\n",
        chunk.Kind,    // function, method, class, interface...
        chunk.Symbol,  // "Handler.ServeHTTP"
        chunk.StartLine,
        chunk.EndLine,
    )
    fmt.Println(chunk.Context) // ["class UserService"]
    // chunk.Content = full source including comments
}

// Feed to embedding model → vector database
for _, chunk := range chunks {
    embedding := embed(chunk.Content)
    store(chunk.Symbol, chunk.Kind, embedding)
}`,
      },
    },
    highlights: {
      title: "Why Chisel?",
      description:
        "Code chunks that respect structure — designed for semantic search pipelines.",
      items: [
        {
          icon: "code",
          title: "Semantic Boundaries",
          description:
            "Chunks split at function, class, and method definitions — not arbitrary line counts. Every chunk is a complete, meaningful unit.",
        },
        {
          icon: "explore",
          title: "Hierarchical Context",
          description:
            "Methods know their parent class. Nested types preserve the full scope chain. Enables queries like 'find all methods in UserService'.",
        },
        {
          icon: "speed",
          title: "Go Provider at 32us",
          description:
            "Stdlib go/parser with zero C dependencies. ~10x faster than tree-sitter providers for typical files.",
        },
        {
          icon: "sort",
          title: "Universal Kind Mapping",
          description:
            "Language-specific constructs normalize to universal kinds. Python class and Go struct both become KindClass — downstream tools treat them uniformly.",
        },
        {
          icon: "anchor",
          title: "Precise Line Mapping",
          description:
            "Every chunk carries exact StartLine and EndLine (1-indexed). Seamless navigation back to original source files.",
        },
        {
          icon: "filter",
          title: "Five Language Providers",
          description:
            "Go (stdlib), TypeScript, Python, Rust (tree-sitter), and Markdown. Isolated dependencies — tree-sitter only imported for languages that need it.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "AST-aware parsing, context preservation, and language normalization for code intelligence pipelines.",
      items: [
        {
          feature: "Language Providers",
          description:
            "Go, TypeScript, Python, Rust, and Markdown. Each provider extracts language-specific symbols with consistent output format.",
          link: { label: "Providers", to: "/guides/providers" },
        },
        {
          feature: "Chunk Kinds",
          description:
            "Function, method, class, interface, type, enum, constant, variable, section, module — covering all major code constructs.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Context Preservation",
          description:
            "Parent chain tracks enclosing scope. Full source preservation including comments and documentation for embedding models.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Vicky Integration",
          description:
            "Foundational chunking layer for the vicky code search and retrieval service. Chunks feed directly to vector databases.",
          link: { label: "Vicky", to: "/integrations/vicky" },
        },
        {
          feature: "Testing",
          description:
            "Test chunking output, verify symbol extraction, and validate context chains for custom provider implementations.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "Troubleshooting",
          description:
            "Common issues with language detection, chunk boundaries, and tree-sitter provider configuration.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full chisel documentation.",
    },
    repo: "https://github.com/zoobzio/chisel",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
