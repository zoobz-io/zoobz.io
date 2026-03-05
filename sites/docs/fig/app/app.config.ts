export default defineAppConfig({
  title: "Fig",
  collection: {
    key: "fig",
    title: "Fig",
    hero: {
      tagline: "Struct Tags In, Configuration Out.",
      taglineHighlight: "One Call. Done.",
      description:
        "Load configuration from secrets, environment variables, and defaults using struct tags. No config files, no YAML, no builder patterns — just fig.Load(&cfg).",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/fig"

type Config struct {
    // Resolution order: secret → env → default → zero value
    DBPassword string        \`secret:"db/pass" env:"DB_PASSWORD" default:"changeme"\`
    Host       string        \`env:"APP_HOST" default:"localhost"\`
    Port       int           \`env:"APP_PORT" default:"8080"\`
    APIKey     string        \`env:"API_KEY" required:"true"\`
    Timeout    time.Duration \`env:"TIMEOUT" default:"30s"\`
    Tags       []string      \`env:"APP_TAGS"\`
}

func (c *Config) Validate() error {
    if c.Port < 1 || c.Port > 65535 {
        return errors.New("port out of range")
    }
    return nil
}

// One call. Secrets checked first, then env, then defaults.
provider, _ := vault.New()
var cfg Config
fig.Load(&cfg, provider)`,
      },
    },
    highlights: {
      title: "Why Fig?",
      description:
        "Configuration loading that fits in your head.",
      items: [
        {
          icon: "sort",
          title: "Deterministic Resolution",
          description:
            "Secret → env → default → zero value. Every time, same order, no ambiguity. The most secure source wins.",
        },
        {
          icon: "tag",
          title: "Declarative Struct Tags",
          description:
            "Requirements live with the fields they configure. One place to read, one place to change.",
        },
        {
          icon: "lock",
          title: "Pluggable Secret Providers",
          description:
            "One method interface. Vault, AWS Secrets Manager, GCP Secret Manager — or write your own in five lines.",
        },
        {
          icon: "check",
          title: "Validation Hooks",
          description:
            "Implement Validate() for cross-field checks, range validation, and business logic after all fields are populated.",
        },
        {
          icon: "speed",
          title: "Cached Metadata",
          description:
            "Struct tag parsing via sentinel is cached after first load. Reflection cost paid once per type, not per call.",
        },
        {
          icon: "anchor",
          title: "Nested Struct Recursion",
          description:
            "Embedded structs descended automatically. Build hierarchical configs naturally without extra boilerplate.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Secrets, environment variables, defaults, validation, and type conversion — all through struct tags.",
      items: [
        {
          feature: "Environment Binding",
          description:
            "env:\"VAR_NAME\" reads from os.Getenv. Empty strings fall through to the next source in the resolution chain.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Secret Providers",
          description:
            "Minimal interface for pluggable backends. Built-in providers for Vault, AWS Secrets Manager, and GCP Secret Manager.",
          link: { label: "Secret Providers", to: "/guides/secret-providers" },
        },
        {
          feature: "Default Values",
          description:
            "default:\"value\" provides sensible fallbacks parsed with the same type conversion as env and secrets.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Required Fields",
          description:
            "required:\"true\" fails Load if no value from any source. Clear error messages with field context.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
        {
          feature: "Type Conversion",
          description:
            "Primitives, durations, slices, pointers, and any encoding.TextUnmarshaler. Extensible via UnmarshalText.",
          link: { label: "Types", to: "/reference/types" },
        },
        {
          feature: "Cloud Integrations",
          description:
            "Separate modules for HashiCorp Vault KV v2, AWS Secrets Manager, and GCP Secret Manager.",
          link: { label: "Vault", to: "/integrations/vault" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full fig documentation.",
    },
    repo: "https://github.com/zoobzio/fig",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
  },
});
