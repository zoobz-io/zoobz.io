export default defineAppConfig({
  title: "Soy",
  collection: {
    key: "soy",
    title: "Soy",
    hero: {
      tagline: "Type-Safe SQL Query Builder for Go.",
      taglineHighlight: "Schema Once, Query Forever.",
      description:
        "Extract schema from struct tags, validate fields at init, and build queries with zero reflection on the hot path. Returns *T, not interface{}.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/soy"

type User struct {
    ID    int64  \`db:"id"    type:"bigserial primary key"\`
    Email string \`db:"email" type:"text unique not null"\`
    Name  string \`db:"name"  type:"text"\`
    Age   int    \`db:"age"   type:"int"\`
}

// Schema extracted and validated here — once
users, _ := soy.New[User](db, "users", postgres.New())

// Every query after: type-safe, zero reflection, validated fields
user, _ := users.Select().
    Where("email", "=", "email_param").
    Exec(ctx, map[string]any{"email_param": "alice@example.com"})
// Returns *User, not interface{}

active, _ := users.Query().
    Where("age", ">=", "min_age").
    OrderBy("name", "asc").
    Limit(10).
    Exec(ctx, map[string]any{"min_age": 18})
// Returns []*User

updated, _ := users.Modify().
    Set("age", "new_age").
    Where("id", "=", "user_id").
    Exec(ctx, map[string]any{"new_age": 31, "user_id": 42})
// UPDATE requires WHERE — prevents accidents`,
      },
    },
    highlights: {
      title: "Why Soy?",
      description:
        "All reflection at init. All validation at init. Everything after that is fast, safe, and typed.",
      items: [
        {
          icon: "speed",
          title: "Zero Reflection on Hot Path",
          description:
            "Schema extracted once at New(). Query building uses O(1) map lookups. No reflection during execution.",
        },
        {
          icon: "code",
          title: "True Generic Returns",
          description:
            "Select returns *T, Query returns []*T. The compiler enforces correct types. No runtime casting.",
        },
        {
          icon: "shield",
          title: "Schema Validation at Init",
          description:
            "Field name typos caught immediately at New(), not when the query executes at 3am in production.",
        },
        {
          icon: "lock",
          title: "Safety by Default",
          description:
            "DELETE and UPDATE require explicit WHERE clauses. No accidental full-table operations.",
        },
        {
          icon: "sort",
          title: "Multi-Database Parity",
          description:
            "PostgreSQL, MariaDB, SQLite, SQL Server via pluggable ASTQL providers. Same API, different dialects.",
        },
        {
          icon: "filter",
          title: "JSON-Serializable Specs",
          description:
            "Build queries from config files, LLM output, or API request bodies. Validated against the same schema.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Six fluent builders covering the full SQL surface — all schema-validated, all type-safe.",
      items: [
        {
          feature: "Select & Query",
          description:
            "Single and multi-record retrieval with WHERE, ORDER BY, DISTINCT, GROUP BY, and row locking.",
          link: { label: "Queries", to: "/guides/queries" },
        },
        {
          feature: "Create & Modify",
          description:
            "INSERT with conflict handling and UPDATE with required WHERE. Returns the affected record.",
          link: { label: "Mutations", to: "/guides/mutations" },
        },
        {
          feature: "Aggregates",
          description:
            "COUNT, SUM, AVG, MIN, MAX with GROUP BY, HAVING, FILTER, and window functions.",
          link: { label: "Aggregates", to: "/guides/aggregates" },
        },
        {
          feature: "Compound Queries",
          description:
            "UNION, INTERSECT, EXCEPT for set operations across multiple query builders.",
          link: { label: "Compound", to: "/guides/compound" },
        },
        {
          feature: "Lifecycle Callbacks",
          description:
            "OnScan and OnRecord hooks for post-processing, computed fields, and audit logging.",
          link: { label: "Lifecycle", to: "/guides/lifecycle" },
        },
        {
          feature: "Vector Search",
          description:
            "pgvector semantic search with distance operators, embedding columns, and metadata filtering.",
          link: { label: "pgvector", to: "/cookbook/pgvector" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full soy documentation.",
    },
    repo: "https://github.com/zoobz-io/soy",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
