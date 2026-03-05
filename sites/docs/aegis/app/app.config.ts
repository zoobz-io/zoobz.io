export default defineAppConfig({
  title: "Aegis",
  collection: {
    key: "aegis",
    title: "Aegis",
    hero: {
      tagline: "Embedded Service Mesh for Go.",
      taglineHighlight: "No Sidecars. No Control Plane.",
      description:
        "Automatic mTLS, built-in service discovery, and round-robin load balancing as a Go library. Nodes generate certificates on startup, sync topology gossip-style, and route requests — zero infrastructure required.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/aegis"

// Create a node with services
node, _ := aegis.NewNode(
    aegis.WithAddress("localhost:9090"),
    aegis.WithServices(aegis.ServiceInfo{
        Name: "identity", Version: "v1",
    }),
)

// mTLS certificates generated automatically
node.Start(ctx)

// Connect to peers — topology syncs gossip-style
peer := aegis.NewPeerManager(node)
peer.Connect(ctx, "peer-1:9090", "peer-2:9090")

// Discover and call services — load balanced
pool := aegis.NewServiceClientPool(node)
conn, _ := pool.Get("identity", "v1")

// Know who's calling on every request
caller := aegis.CallerFromContext(ctx)
fmt.Println(caller.NodeID, caller.Services)`,
      },
    },
    highlights: {
      title: "Why Aegis?",
      description:
        "Service mesh capabilities as a library — no infrastructure to deploy or manage.",
      items: [
        {
          icon: "lock",
          title: "Automatic mTLS",
          description:
            "Certificates generated on first run, stored and reloaded on subsequent starts. Zero PKI configuration for development.",
        },
        {
          icon: "explore",
          title: "Gossip-Style Discovery",
          description:
            "Topology syncs via version-based merging across peers. No external service registry — nodes discover providers automatically.",
        },
        {
          icon: "user",
          title: "Caller Identity on Every Request",
          description:
            "CallerFromContext() extracts calling node identity from mTLS certificates. Enable allowlists, RBAC, and caller-specific logic.",
        },
        {
          icon: "speed",
          title: "Round-Robin Load Balancing",
          description:
            "ServiceClientPool distributes calls across all providers atomically. Connection pooling with automatic rebalancing.",
        },
        {
          icon: "code",
          title: "gRPC Foundation",
          description:
            "Protocol Buffers for typed contracts with built-in streaming, deadlines, and interceptors. mTLS integrated into gRPC credentials.",
        },
        {
          icon: "shield",
          title: "Location-Transparent Routing",
          description:
            "Consumers don't know specific addresses. Topology handles routing — services move between nodes without client changes.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Secure service-to-service communication with automatic certificate management and discovery.",
      items: [
        {
          feature: "Certificate Management",
          description:
            "Auto-generated CA and node certificates. File, environment, or Vault sources for production deployment.",
          link: { label: "Certificates", to: "/guides/certificates" },
        },
        {
          feature: "Service Declaration",
          description:
            "Declare services at node creation. Topology queries answer which nodes provide a given service and version.",
          link: { label: "Services", to: "/guides/services" },
        },
        {
          feature: "Topology Sync",
          description:
            "Version-based merging provides eventual consistency. Nodes exchange full topology — highest version wins.",
          link: { label: "Concepts", to: "/learn/concepts" },
        },
        {
          feature: "Health Checking",
          description:
            "Interface-based health checker for custom logic. Extensible health status reporting across the mesh.",
          link: { label: "Architecture", to: "/learn/architecture" },
        },
        {
          feature: "Testing Utilities",
          description:
            "Test node creation, shared CA patterns for integration tests, and topology sync verification helpers.",
          link: { label: "Testing", to: "/guides/testing" },
        },
        {
          feature: "Troubleshooting",
          description:
            "Certificate errors, connection issues, and service discovery problems with debugging guidance.",
          link: { label: "Troubleshooting", to: "/guides/troubleshooting" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full aegis documentation.",
    },
    repo: "https://github.com/zoobzio/aegis",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Reference: "reference",
    },
  },
});
