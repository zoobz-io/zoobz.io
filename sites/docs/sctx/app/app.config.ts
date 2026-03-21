export default defineAppConfig({
  title: "Sctx",
  collection: {
    key: "sctx",
    title: "Sctx",
    hero: {
      tagline: "Certificate-Powered Authorization for Go.",
      taglineHighlight: "Your PKI, Your Permissions.",
      description:
        "Transform X.509 certificates into typed security contexts with permission guards, instant revocation, and built-in observability.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/sctx"

type UserMeta struct {
    Role     string
    TenantID string
}

// Certificates become authorization contexts
admin, _ := sctx.NewAdminService[UserMeta](key, trustedCAs)
admin.SetPolicy(func(cert *x509.Certificate) (*sctx.Context[UserMeta], error) {
    return &sctx.Context[UserMeta]{
        Permissions: permissionsFromOUs(cert.Subject.OrganizationalUnit),
        ExpiresAt:   time.Now().Add(time.Hour),
        Metadata:    UserMeta{Role: "engineer", TenantID: cert.Subject.Organization[0]},
    }, nil
})

// In your mTLS handler
assertion, _ := sctx.CreateAssertion(clientKey, cert)
token, _ := admin.Generate(ctx, cert, assertion)

// Permission gates
guard, _ := admin.CreateGuard(ctx, token, "api:write")
if err := guard.Validate(ctx, token); err != nil {
    // Forbidden
}

// Instant revocation — all guards reject immediately
admin.RevokeByFingerprint(ctx, sctx.GetFingerprint(cert))`,
      },
    },
    highlights: {
      title: "Why Sctx?",
      description:
        "Your mTLS infrastructure already proves identity. Sctx turns that into application-level authorization.",
      items: [
        {
          icon: "shield",
          title: "Certificate-Native",
          description:
            "Built for mTLS. Your PKI becomes your authorization system. No external identity providers needed.",
        },
        {
          icon: "lock",
          title: "Instant Revocation",
          description:
            "Revoke by certificate fingerprint and all guards reject immediately. No waiting for token expiry.",
        },
        {
          icon: "code",
          title: "Typed Contexts",
          description:
            "Generic over a metadata type. Compile-time checking for your permission and tenant data, not interface{} casts.",
        },
        {
          icon: "user",
          title: "Delegatable Guards",
          description:
            "Token holders create guards for specific permissions. Authorization composes across services naturally.",
        },
        {
          icon: "anchor",
          title: "Assertion-Based Auth",
          description:
            "Clients prove private key possession before token generation. Stolen tokens are useless without the key.",
        },
        {
          icon: "explore",
          title: "Built-in Observability",
          description:
            "17 capitan events across token, guard, context, assertion, and cache lifecycles. Hook for logging, metrics, and alerts.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "From certificate verification to permission enforcement — a complete authorization pipeline.",
      items: [
        {
          feature: "Policy Engine",
          description:
            "Custom functions transform certificates into contexts with permissions, metadata, and expiration.",
          link: { label: "Policy", to: "/guides/policy" },
        },
        {
          feature: "Permission Guards",
          description:
            "Create guards that enforce required permissions. Reusable across requests and services.",
          link: { label: "Guards", to: "/guides/guards" },
        },
        {
          feature: "Token Generation",
          description:
            "Signed tokens from certificate + assertion. Ed25519 by default, FIPS ECDSA P-256 available.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Revocation",
          description:
            "By fingerprint, by organization, or emergency shutdown. Guards reject immediately after revocation.",
          link: { label: "Revocation", to: "/cookbook/revocation" },
        },
        {
          feature: "Context Caching",
          description:
            "In-memory cache by certificate fingerprint with configurable cleanup intervals.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Testing Utilities",
          description:
            "CertBuilder, GenerateTestCertificates, and built-in mock certificates for deterministic tests.",
          link: { label: "Testing", to: "/guides/testing" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full sctx documentation.",
    },
    repo: "https://github.com/zoobz-io/sctx",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
