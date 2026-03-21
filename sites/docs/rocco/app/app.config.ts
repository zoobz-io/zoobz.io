export default defineAppConfig({
  title: "Rocco",
  collection: {
    key: "rocco",
    title: "Rocco",
    hero: {
      tagline: "Type-Safe HTTP Framework for Go.",
      taglineHighlight: "Define Types. Derive Everything.",
      description:
        "Build APIs where struct types are the single source of truth. Validation, OpenAPI 3.1.0 specs, error contracts, and interactive docs all generated automatically from your Go types — on a stdlib foundation.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/rocco"

type CreateOrderInput struct {
    CustomerID string  \`json:"customer_id" description:"Customer UUID"\`
    Total      float64 \`json:"total" description:"Order total"\`
}

type OrderOutput struct {
    ID        string    \`json:"id"\`
    Status    string    \`json:"status"\`
    CreatedAt time.Time \`json:"created_at"\`
}

// Define once — validation, OpenAPI, and docs derived automatically
engine := rocco.New()

rocco.POST[CreateOrderInput, OrderOutput]("/orders",
    func(req *rocco.Request[CreateOrderInput]) (OrderOutput, error) {
        body := req.Body() // Typed, validated
        return OrderOutput{
            ID:        uuid.New().String(),
            Status:    "created",
            CreatedAt: time.Now(),
        }, nil
    },
).WithSuccessStatus(201).
  WithErrors(ErrInvalidOrder, ErrCustomerNotFound).
  Register(engine)

// OpenAPI at /openapi, interactive docs at /docs
engine.Run(":8080")`,
      },
    },
    highlights: {
      title: "Why Rocco?",
      description:
        "One type definition drives validation, documentation, and error contracts.",
      items: [
        {
          icon: "code",
          title: "Contract-First by Default",
          description:
            "Struct types are the single source of truth. OpenAPI schemas, validation rules, and error contracts all derived — never out of sync.",
        },
        {
          icon: "reference",
          title: "Automatic OpenAPI 3.1.0",
          description:
            "Specs generated at handler registration. Served at /openapi with interactive docs at /docs. No separate schema files.",
        },
        {
          icon: "check",
          title: "Built-In Validation",
          description:
            "Opt-in via Validatable interface. Struct tag constraints and cross-field checks run before your handler sees the data.",
        },
        {
          icon: "bolt",
          title: "Stdlib Foundation",
          description:
            "Built on Go 1.22+ http.ServeMux with native path parameters. No heavy external router — direct access to the underlying mux.",
        },
        {
          icon: "sort",
          title: "First-Class SSE Streaming",
          description:
            "Server-Sent Events with typed Stream[T] interface. Real-time data flows are a core feature, not an afterthought.",
        },
        {
          icon: "shield",
          title: "Declared Error Contracts",
          description:
            "Handlers must declare their errors. Undeclared errors log warnings and return 500 — no silent failures in production.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Type-safe handlers, automatic documentation, authentication, and streaming on a stdlib foundation.",
      items: [
        {
          feature: "Type-Safe Handlers",
          description:
            "Generic handlers with compile-time input/output checking. NoBody for bodyless requests, path and query parameters.",
          link: { label: "Handlers", to: "/guides/handlers" },
        },
        {
          feature: "Error Handling",
          description:
            "Sentinel errors with structured JSON responses. Error types declared per handler, auto-documented in OpenAPI.",
          link: { label: "Errors", to: "/guides/errors" },
        },
        {
          feature: "Authentication",
          description:
            "Built-in identity extraction, scope-based authorization, and role-based access control middleware.",
          link: { label: "Authentication", to: "/guides/authentication" },
        },
        {
          feature: "OpenAPI Generation",
          description:
            "Schema generation from types at registration time. Customizable with descriptions, examples, and overrides.",
          link: { label: "OpenAPI", to: "/guides/openapi" },
        },
        {
          feature: "Server-Sent Events",
          description:
            "Typed Stream[T] interface for real-time data. Heartbeats, reconnection, and graceful shutdown built in.",
          link: { label: "Streaming", to: "/guides/streaming" },
        },
        {
          feature: "Lifecycle Events",
          description:
            "Capitan signals for request received, handler executing, errors, and completion. Full observability hooks.",
          link: { label: "Observability", to: "/cookbook/observability" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full rocco documentation.",
    },
    repo: "https://github.com/zoobz-io/rocco",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
