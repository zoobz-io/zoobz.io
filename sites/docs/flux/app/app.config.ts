export default defineAppConfig({
  title: "Flux",
  collection: {
    key: "flux",
    title: "Flux",
    hero: {
      tagline: "Reactive Configuration for Go.",
      taglineHighlight: "Watch. Validate. Apply.",
      description:
        "Hot-reload configuration from files, Redis, Consul, or any source. Invalid configs rejected, previous retained, your application only ever sees valid data.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/flux"

type Config struct {
    Port int    \`json:"port"\`
    Host string \`json:"host"\`
}

func (c Config) Validate() error {
    if c.Port < 1 || c.Port > 65535 {
        return errors.New("invalid port")
    }
    return nil
}

// Watch a file, validate changes, apply safely
capacitor := flux.New[Config](
    file.New("/etc/app/config.json"),
    func(ctx context.Context, prev, curr Config) error {
        log.Printf("Port changed: %d -> %d", prev.Port, curr.Port)
        return reconfigureServer(curr)
    },
)

capacitor.Start(ctx)          // Start watching
capacitor.State()             // Loading → Healthy → Degraded
cfg, _ := capacitor.Current() // Always the last valid config

// Invalid config pushed? Rejected. Previous config retained.
// Source goes down? Keeps watching for recovery.`,
      },
    },
    highlights: {
      title: "Why Flux?",
      description:
        "Configuration that updates itself — safely, observably, without restarts.",
      items: [
        {
          icon: "shield",
          title: "Validation-First Pipeline",
          description:
            "Source → Deserialize → Validate → Callback. If any step fails, the previous valid config is retained automatically.",
        },
        {
          icon: "explore",
          title: "Four-State Machine",
          description:
            "Loading, Healthy, Degraded, Empty — explicit transitions, not hidden in callbacks. Always know your config health.",
        },
        {
          icon: "sort",
          title: "Multi-Source Composition",
          description:
            "Merge defaults, files, and remote configs with Compose(). Priority-based overrides validated as a single unit.",
        },
        {
          icon: "settings",
          title: "Eight Pluggable Providers",
          description:
            "File, Redis, Consul, etcd, NATS, Kubernetes ConfigMap, ZooKeeper, Firestore. One Watcher interface.",
        },
        {
          icon: "bolt",
          title: "Production Observability",
          description:
            "Capitan signals on every state transition, error type, and change detection. Metrics and alerting out of the box.",
        },
        {
          icon: "check",
          title: "Deterministic Testing",
          description:
            "Sync mode disables goroutines, fake clock controls time, channel watchers eliminate flakiness.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Watch, validate, and apply configuration changes from any source — with safe fallback on failure.",
      items: [
        {
          feature: "Hot-Reload Files",
          description:
            "Watch JSON or YAML files. Changes trigger immediate reload with validation before application.",
          link: { label: "File Config", to: "/cookbook/file-config" },
        },
        {
          feature: "Multi-Source Merging",
          description:
            "Combine defaults, local files, and remote overrides into a single validated config. Later sources win.",
          link: { label: "Multi-Source", to: "/cookbook/multi-source" },
        },
        {
          feature: "Custom Watchers",
          description:
            "One interface method: Watch(ctx) returns a byte channel. Build HTTP polling, AWS SSM, or gRPC streaming sources.",
          link: { label: "Custom Watcher", to: "/cookbook/custom-watcher" },
        },
        {
          feature: "Graceful Degradation",
          description:
            "Detect Degraded state, use fallback config, automatic recovery on next valid push. Error history for debugging.",
          link: { label: "State Management", to: "/guides/state" },
        },
        {
          feature: "Provider Ecosystem",
          description:
            "Redis for shared flags, Consul for service mesh, etcd for Kubernetes, Firestore for GCP. Same API everywhere.",
          link: { label: "Providers", to: "/guides/providers" },
        },
        {
          feature: "Change Callbacks",
          description:
            "Callbacks receive both previous and current config. Compare to make smart decisions about what changed.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full flux documentation.",
    },
    repo: "https://github.com/zoobzio/flux",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
