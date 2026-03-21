export default defineAppConfig({
  title: "OpenAPI",
  collection: {
    key: "openapi",
    title: "OpenAPI",
    hero: {
      tagline: "OpenAPI 3.1 as Native Go Types.",
      taglineHighlight: "Specification as Structs.",
      description:
        "Build, read, and write OpenAPI specifications with Go struct literals. No code generation, no builder patterns — the types are the spec.",
      action: { label: "Get Started", to: "/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/openapi"

spec := &openapi.OpenAPI{
    OpenAPI: "3.1.0",
    Info: openapi.Info{
        Title:   "Bookstore API",
        Version: "1.0.0",
    },
    Paths: map[string]openapi.PathItem{
        "/books": {
            Get: &openapi.Operation{
                Summary:     "List all books",
                OperationID: "listBooks",
                Responses: map[string]openapi.Response{
                    "200": {
                        Description: "A list of books",
                        Content: map[string]openapi.MediaType{
                            "application/json": {
                                Schema: &openapi.Schema{
                                    Type:  openapi.NewSchemaType("array"),
                                    Items: &openapi.Schema{Ref: "#/components/schemas/Book"},
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}

// Read existing specs
spec, _ := openapi.FromYAML(data)
spec, _ := openapi.FromJSON(data)

// Write to any format
jsonBytes, _ := spec.ToJSON()
yamlBytes, _ := spec.ToYAML()`,
      },
    },
    highlights: {
      title: "Why This Package?",
      description:
        "The OpenAPI spec expressed directly as Go types. No translation layer, no abstraction overhead.",
      items: [
        {
          icon: "code",
          title: "Direct Spec Mapping",
          description:
            "Every Go struct maps 1:1 to the OpenAPI specification. Learning the spec teaches you the package.",
        },
        {
          icon: "edit",
          title: "Build with Literals",
          description:
            "Standard Go struct initialization with IDE autocompletion. No builder patterns or fluent APIs.",
        },
        {
          icon: "sort",
          title: "Read and Write",
          description:
            "FromJSON, FromYAML, ToJSON, ToYAML. Round-trip specs through Go types without loss.",
        },
        {
          icon: "check",
          title: "Full 3.1 Coverage",
          description:
            "Webhooks, callbacks, discriminators, all OAuth2 flows, and JSON Schema nullable types.",
        },
        {
          icon: "settings",
          title: "SchemaType Handling",
          description:
            "JSON Schema's flexible type field (string or array) handled transparently with IsNullable() and Contains().",
        },
        {
          icon: "bolt",
          title: "Standard Marshalling",
          description:
            "Works with json.Encoder and yaml.Encoder directly. Single set of struct tags handles both formats.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Full OpenAPI 3.1 specification support as idiomatic Go types.",
      items: [
        {
          feature: "Specification Building",
          description:
            "Construct full OpenAPI documents from Go struct literals with compile-time field checking.",
          link: { label: "Quickstart", to: "/quickstart" },
        },
        {
          feature: "Spec Parsing",
          description:
            "Read existing JSON or YAML specifications into fully typed Go structures for programmatic inspection.",
          link: { label: "Quickstart", to: "/quickstart" },
        },
        {
          feature: "Components System",
          description:
            "Reusable schemas, responses, parameters, security schemes with full $ref support.",
          link: { label: "Types", to: "/types" },
        },
        {
          feature: "Security Schemes",
          description:
            "HTTP Bearer, API Key, OAuth2 (implicit, password, client credentials, authorization code), and OpenID Connect.",
          link: { label: "Quickstart", to: "/quickstart" },
        },
        {
          feature: "Schema Composition",
          description:
            "Nullable types, polymorphism with discriminators, and allOf/oneOf/anyOf composition patterns.",
          link: { label: "Types", to: "/types" },
        },
        {
          feature: "Vendor Extensions",
          description:
            "x-tagGroups and custom extension support for documentation tooling integration.",
          link: { label: "Types", to: "/types" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full openapi documentation.",
    },
    repo: "https://github.com/zoobz-io/openapi",
  },
});
