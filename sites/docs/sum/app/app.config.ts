export default defineAppConfig({
  title: "Sum",
  collection: {
    key: "sum",
    title: "Sum",
    hero: {
      tagline: "Application Framework for Go.",
      taglineHighlight: "Wire Once. Run Anywhere.",
      description:
        "Unify HTTP, data stores, configuration, and services into a single lifecycle. Type-safe registry, integrated config loading, typed events, and automatic data catalog registration — with no code generation.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/sum"

// Initialize registry
k := sum.Start()

// Register services by type — compile-time safety
sum.Register[UserService](k, &userServiceImpl{})
sum.Register[OrderService](k, &orderServiceImpl{})

// Lock registry — no late binding
sum.Freeze(k)

// Type-safe events
var OrderPlaced = sum.NewInfoEvent[Order](orderSignal)
OrderPlaced.Emit(ctx, order)
OrderPlaced.Listen(func(ctx context.Context, o Order) {
    log.Printf("Order %s placed", o.ID)
})

// Retrieve services with guard validation
svc := sum.MustUse[UserService](ctx)

// Single lifecycle — HTTP, shutdown, signals
service := sum.NewService(k)
service.Run(ctx) // Blocks until SIGINT/SIGTERM`,
      },
    },
    highlights: {
      title: "Why Sum?",
      description:
        "One framework, one lifecycle — HTTP, data, config, and services unified.",
      items: [
        {
          icon: "code",
          title: "Type-Safe Registry",
          description:
            "Register and retrieve services by type with generics. No string keys, no casting. Freeze prevents late binding.",
        },
        {
          icon: "bolt",
          title: "Unified Lifecycle",
          description:
            "Single Service.Run() orchestrates HTTP server, graceful shutdown, and signal handling. No threading together separate lifecycles.",
        },
        {
          icon: "settings",
          title: "Integrated Configuration",
          description:
            "Fig-powered config loading with struct tags. Secrets, environment variables, and defaults resolved in one call.",
        },
        {
          icon: "explore",
          title: "Typed Events",
          description:
            "Type-safe signal system wrapping capitan. Define once, emit and listen with full compile-time checking and severity levels.",
        },
        {
          icon: "cache",
          title: "Automatic Data Registration",
          description:
            "NewDatabase, NewStore, NewBucket helpers register atomics with the scio data catalog. Observability built into every data access.",
        },
        {
          icon: "link",
          title: "No Framework Lock-In",
          description:
            "Core components (slush, grub, rocco, capitan, fig) are independent packages. Use sum or use them separately.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Application lifecycle, service registry, typed events, and data store integration in one package.",
      items: [
        {
          feature: "Service Registry",
          description:
            "Type-safe registration with guards for access control. Start/Freeze lifecycle prevents accidental late binding.",
          link: { label: "Service Registry", to: "/guides/service-registry" },
        },
        {
          feature: "Event System",
          description:
            "Type-safe events with Debug, Info, Warn, Error severity. Emit and listen with compile-time type checking.",
          link: { label: "Events", to: "/guides/events" },
        },
        {
          feature: "Data Store Helpers",
          description:
            "SQL databases, key-value stores, and object storage via grub. Automatic catalog registration with scio.",
          link: { label: "Data Stores", to: "/guides/data-stores" },
        },
        {
          feature: "Rocco Integration",
          description:
            "Built-in HTTP engine with type-safe handlers, automatic OpenAPI generation, and SSE streaming.",
          link: { label: "Rocco", to: "/integrations/rocco" },
        },
        {
          feature: "Fig Configuration",
          description:
            "Struct tag configuration loading with secret provider support. Integrated into the service lifecycle.",
          link: { label: "Fig", to: "/integrations/fig" },
        },
        {
          feature: "Testing",
          description:
            "Registry reset, service mocking, and event capture patterns for isolated unit and integration tests.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full sum documentation.",
    },
    repo: "https://github.com/zoobzio/sum",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
