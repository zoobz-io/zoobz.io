export default defineAppConfig({
  title: "Slush",
  collection: {
    key: "slush",
    title: "Slush",
    hero: {
      tagline: "Guarded Service Locator for Go.",
      taglineHighlight: "Access Control at Every Lookup.",
      description:
        "Type-safe service retrieval with composable guard functions that validate request context before granting access. Not a DI container — a controlled discovery mechanism where every lookup is explicitly authorized.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/slush"

// Initialize and register services
k := slush.Start()
handle := slush.Register[UserService](k, &userServiceImpl{})

// Chain guards — each validates context before access
handle.Guard(func(ctx context.Context) error {
    caller := sctx.FromContext(ctx)
    if !caller.HasScope("users:read") {
        return errors.New("insufficient permissions")
    }
    return nil
})

// Lock registry — no more registration allowed
slush.Freeze(k)

// Retrieve with guard validation
svc, err := slush.Use[UserService](ctx)
if err != nil {
    // Guard denied access — not "service not found"
    log.Fatal(err)
}

// Introspect registered services
for _, info := range slush.Services(k) {
    fmt.Println(info.Name, info.Version)
}`,
      },
    },
    highlights: {
      title: "Why Slush?",
      description:
        "Service discovery where access control is the design, not an afterthought.",
      items: [
        {
          icon: "shield",
          title: "Guards as First-Class Citizens",
          description:
            "Simple functions that decide access: return nil to allow, error to deny. Chain, compose, and test independently.",
        },
        {
          icon: "code",
          title: "Full Generic Type Safety",
          description:
            "Register and retrieve by type — no string keys, no interface{} casting. Compile-time checking via generics.",
        },
        {
          icon: "lock",
          title: "Freeze-Based Lifecycle",
          description:
            "Start() returns a key for registration. Freeze() invalidates it permanently — no late binding, no accidental overwrites.",
        },
        {
          icon: "speed",
          title: "Zero Reflection in Hot Path",
          description:
            "FQDNs pre-computed at registration. Use() is an O(1) map lookup plus guard chain — no reflection overhead per call.",
        },
        {
          icon: "explore",
          title: "Lifecycle Events",
          description:
            "Capitan signals for registered, accessed, denied, and not-found. Observability without instrumenting guard logic.",
        },
        {
          icon: "search",
          title: "Service Introspection",
          description:
            "Sentinel metadata for all registered services. Generate documentation endpoints, dependency graphs, and ER diagrams.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Type-safe service registration with composable access control, lifecycle events, and introspection.",
      items: [
        {
          feature: "Guard Patterns",
          description:
            "Basic, parameterized, composed (AND/OR/NOT), stateful (rate limiting, circuit breakers), and async-safe guards.",
          link: { label: "Guards", to: "/guides/guards" },
        },
        {
          feature: "Sentinel Integration",
          description:
            "Automatic struct metadata extraction for registered implementations. Service introspection and discovery tracking.",
          link: { label: "Sentinel", to: "/integrations/sentinel" },
        },
        {
          feature: "Capitan Events",
          description:
            "Lifecycle signals for registration, access, denial, and missing services. Hook into existing observability.",
          link: { label: "Capitan", to: "/integrations/capitan" },
        },
        {
          feature: "Cryptographic Guards",
          description:
            "Bridge to sctx for guards that verify token signatures, expiry, replay protection, and permissions.",
          link: { label: "Sctx", to: "/integrations/sctx" },
        },
        {
          feature: "Testing Support",
          description:
            "Reset() and Unregister[T]() for test isolation. Guard testing patterns without the full registry.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "Troubleshooting",
          description:
            "Debug service resolution with lifecycle events. Common patterns for guard composition errors.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full slush documentation.",
    },
    repo: "https://github.com/zoobz-io/slush",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
