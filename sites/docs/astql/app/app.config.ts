export default defineAppConfig({
  title: "ASTQL",
  collection: {
    key: "astql",
    title: "ASTQL",
    hero: {
      tagline: "Schema-Validated SQL for Go.",
      taglineHighlight: "DBML In, Safe SQL Out.",
      description:
        "Build SQL queries validated against a DBML schema. Every table and field checked at init, every value parameterized, every identifier quoted for the target dialect.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/astql"

// Schema from DBML — single source of truth
instance, _ := astql.NewFromDBML(project)

// Typos caught immediately: instance.F("emial") panics with a clear error
query := astql.Select(instance.T("users")).
    Fields(instance.F("email"), instance.F("name")).
    Where(instance.C(instance.F("active"), astql.EQ, instance.P("is_active"))).
    OrderBy(instance.F("email"), astql.ASC).
    Limit(10)

// One AST, four databases
pg   := query.Render(postgres.New())  // "email", LIMIT 10
lite := query.Render(sqlite.New())    // "email", LIMIT 10
my   := query.Render(mariadb.New())   // \`email\`, LIMIT 10
ms   := query.Render(mssql.New())     // [email], FETCH NEXT 10

// SQL: SELECT "email", "name" FROM "users"
//      WHERE "active" = :is_active ORDER BY "email" ASC LIMIT 10
// Params: [is_active]`,
      },
    },
    highlights: {
      title: "Why ASTQL?",
      description:
        "SQL injection eliminated by construction, not by convention.",
      items: [
        {
          icon: "shield",
          title: "Schema-First Validation",
          description:
            "Every table and field checked against DBML at build time. Typos become immediate panics, not runtime bugs.",
        },
        {
          icon: "sort",
          title: "Four Dialects, One AST",
          description:
            "PostgreSQL, SQLite, MariaDB, SQL Server — proper identifier quoting, pagination syntax, and operator translation per dialect.",
        },
        {
          icon: "lock",
          title: "Defense in Depth",
          description:
            "Schema allowlist, identifier validation, keyword blocking, quoted identifiers, and parameterized values. Five layers, zero vectors.",
        },
        {
          icon: "code",
          title: "Composable Complexity",
          description:
            "Nested AND/OR conditions, multi-table JOINs, subqueries with parameter namespacing, window functions, and CASE expressions.",
        },
        {
          icon: "speed",
          title: "Zero Reflection on Query Path",
          description:
            "Schema validation at init, not per query. Building and rendering are pure struct operations.",
        },
        {
          icon: "anchor",
          title: "ORM Foundation",
          description:
            "Designed as the query layer for type-safe ORMs. Sentinel extracts metadata, ASTQL validates queries, sqlx executes.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "From simple SELECTs to vector search — all validated against your schema, all rendered per dialect.",
      items: [
        {
          feature: "Schema Validation",
          description:
            "Tables and fields checked against DBML. Try variants for runtime validation of dynamic queries.",
          link: { label: "Schema Validation", to: "/guides/schema-validation" },
        },
        {
          feature: "Multi-Dialect Rendering",
          description:
            "PostgreSQL, SQLite, MariaDB, SQL Server. Identifier quoting, pagination, and operators handled per provider.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Conditions & Joins",
          description:
            "Nested AND/OR, subqueries, all JOIN types, field comparisons, BETWEEN, EXISTS/NOT EXISTS.",
          link: { label: "Conditions", to: "/guides/conditions" },
        },
        {
          feature: "Aggregates & Windows",
          description:
            "GROUP BY, HAVING, aggregate functions with FILTER, window functions (ROW_NUMBER, RANK, LAG/LEAD).",
          link: { label: "Aggregates", to: "/guides/aggregates" },
        },
        {
          feature: "Vector Search",
          description:
            "pgvector operators, distance metrics, and metadata filtering for semantic search applications.",
          link: { label: "Vector Search", to: "/cookbook/vector-search" },
        },
        {
          feature: "Upserts & Pagination",
          description:
            "ON CONFLICT with RETURNING, cursor-based pagination, and LIMIT/OFFSET patterns across dialects.",
          link: { label: "Upserts", to: "/cookbook/upserts" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full astql documentation.",
    },
    repo: "https://github.com/zoobzio/astql",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
