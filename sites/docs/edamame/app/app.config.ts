export default defineAppConfig({
  title: "Edamame",
  collection: {
    key: "edamame",
    title: "Edamame",
    hero: {
      tagline: "Statement-Driven Query Execution for Go.",
      taglineHighlight: "Define Once, Execute Anywhere.",
      description:
        "Typed, named database operations as pure data structures. Compile-time safety, parameterized execution, and multi-dialect support without raw SQL strings.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/edamame"

// Define statements once at package level
var (
    ByStatus = edamame.NewQueryStatement(
        "by-status", "Query users by status",
        edamame.QuerySpec{
            Where: []edamame.ConditionSpec{
                {Field: "status", Operator: "=", Param: "status"},
            },
            OrderBy: []edamame.OrderBySpec{
                {Field: "created_at", Direction: "desc"},
            },
            Limit: ptr(50),
        },
    )

    SelectByID = edamame.NewSelectStatement(
        "select-by-id", "Select user by ID",
        edamame.SelectSpec{
            Where: []edamame.ConditionSpec{
                {Field: "id", Operator: "=", Param: "id"},
            },
        },
    )
)

// Execute with type safety — wrong statement type won't compile
users, _ := exec.ExecQuery(ctx, ByStatus, map[string]any{"status": "active"})
user, _ := exec.ExecSelect(ctx, SelectByID, map[string]any{"id": 123})`,
      },
    },
    highlights: {
      title: "Why Edamame?",
      description:
        "The middle ground between raw SQL strings and heavy ORMs.",
      items: [
        {
          icon: "code",
          title: "Typed Statements",
          description:
            "QueryStatement goes to ExecQuery, SelectStatement to ExecSelect. The compiler enforces correct pairing.",
        },
        {
          icon: "shield",
          title: "Injection-Proof by Construction",
          description:
            "Field names validated against schema, operators checked against allowlist, values bound as parameters. No interpolation.",
        },
        {
          icon: "tag",
          title: "Declarative Specs",
          description:
            "Queries defined as Go structs, not builder chains or string templates. Inspect, compose, and serialize them.",
        },
        {
          icon: "sort",
          title: "Multi-Dialect Support",
          description:
            "Same statements render to PostgreSQL, MariaDB, SQLite, or SQL Server. Swap the renderer, keep the logic.",
        },
        {
          icon: "robot",
          title: "LLM-Ready Metadata",
          description:
            "Statements carry names, descriptions, and parameter specs. Serialize to JSON for AI-assisted database operations.",
        },
        {
          icon: "lock",
          title: "Thread-Safe Execution",
          description:
            "Statements are immutable data. Concurrent execution with no shared mutable state.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Five statement types covering the full range of database operations — all type-safe, all parameterized.",
      items: [
        {
          feature: "Query Statements",
          description:
            "Multi-record retrieval with WHERE, ORDER BY, LIMIT, OFFSET, DISTINCT, GROUP BY, and HAVING.",
          link: { label: "Statements", to: "/guides/statements" },
        },
        {
          feature: "Select Statements",
          description:
            "Single-record lookups with optional row-level locking (FOR UPDATE, FOR SHARE).",
          link: { label: "Statements", to: "/guides/statements" },
        },
        {
          feature: "Update Statements",
          description:
            "Targeted modifications with SET clauses and WHERE conditions. Returns the updated record.",
          link: { label: "Statements", to: "/guides/statements" },
        },
        {
          feature: "Aggregate Statements",
          description:
            "COUNT, SUM, AVG, MIN, MAX with optional filtering and grouping.",
          link: { label: "Statements", to: "/guides/statements" },
        },
        {
          feature: "Batch & Transactions",
          description:
            "Bulk inserts, updates, and deletes. Transaction variants with full isolation for atomic operations.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "LLM Integration",
          description:
            "Self-describing statements with validation and dispatch patterns for AI-driven database access.",
          link: { label: "LLM Integration", to: "/cookbook/llm-integration" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full edamame documentation.",
    },
    repo: "https://github.com/zoobzio/edamame",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
