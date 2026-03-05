export default defineAppConfig({
  title: "Grub",
  collection: {
    key: "grub",
    title: "Grub",
    hero: {
      tagline: "Provider-Agnostic Storage for Go.",
      taglineHighlight: "Write Once, Store Anywhere.",
      description:
        "Type-safe CRUD across databases, key-value stores, blob storage, and vector indices. Swap backends without touching business logic.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/grub"

// Same code, different backends
sessions := grub.NewStore[Session](redis.New(client))
sessions := grub.NewStore[Session](badger.New(db))
sessions := grub.NewStore[Session](bolt.New(db, "sessions"))

// Type-safe operations — returns *Session, not interface{}
session, _ := sessions.Get(ctx, "session:abc")
sessions.Set(ctx, "session:xyz", &Session{UserID: "123"}, time.Hour)

// Four storage modes, one pattern
users := grub.NewDatabase[User](postgres.New(db, "users"))
docs  := grub.NewBucket[Document](s3.New(client, "documents"))
vecs  := grub.NewIndex[Embedding](qdrant.New(client, "embeddings"))

// Consistent errors across all providers
user, err := users.Get(ctx, "usr-123")
if errors.Is(err, grub.ErrNotFound) {
    // Same error whether it's Redis, PostgreSQL, or S3
}`,
      },
    },
    highlights: {
      title: "Why Grub?",
      description:
        "Storage becomes a configuration choice, not an architectural constraint.",
      items: [
        {
          icon: "sort",
          title: "Four Storage Modes",
          description:
            "Store (key-value), Database (SQL), Bucket (blobs), Index (vectors). One pattern, every backend.",
        },
        {
          icon: "code",
          title: "Type-Safe Generics",
          description:
            "Get returns *T, Query returns []*T. The compiler enforces types across every storage operation.",
        },
        {
          icon: "shield",
          title: "Semantic Error Consistency",
          description:
            "ErrNotFound, ErrDuplicate, ErrConflict mean the same thing whether it's Redis, PostgreSQL, or S3.",
        },
        {
          icon: "settings",
          title: "Lifecycle Hooks",
          description:
            "BeforeSave, AfterLoad, BeforeDelete — validation, normalization, and side-effects without scattering logic.",
        },
        {
          icon: "filter",
          title: "Modular Providers",
          description:
            "Each provider is a separate Go module. Only import Redis if you use Redis. Clean dependency graph.",
        },
        {
          icon: "link",
          title: "Atomic Views",
          description:
            "Field-level access via atomization for encryption pipelines, data transformations, and framework internals.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "CRUD operations, caching strategies, blob storage, vector search, and provider migrations — all behind one interface.",
      items: [
        {
          feature: "Key-Value Storage",
          description:
            "Get, Set, Delete, Exists with optional TTL. Redis, BadgerDB, and BoltDB providers.",
          link: { label: "Providers", to: "/guides/providers" },
        },
        {
          feature: "SQL Databases",
          description:
            "Type-safe queries, transactions, and aggregates via soy builders. PostgreSQL, MariaDB, SQLite, SQL Server.",
          link: { label: "Lifecycle", to: "/guides/lifecycle" },
        },
        {
          feature: "Blob Storage",
          description:
            "Put, Get, Delete with typed payloads and metadata. S3, MinIO, Google Cloud Storage, Azure Blob.",
          link: { label: "Best Practices", to: "/guides/best-practices" },
        },
        {
          feature: "Vector Search",
          description:
            "Similarity search with typed metadata and filters. Qdrant, Pinecone, Milvus, Weaviate.",
          link: { label: "Vector Search", to: "/cookbook/vector-search" },
        },
        {
          feature: "Caching Patterns",
          description:
            "Cache-aside, read-through, and TTL strategies with consistent invalidation across providers.",
          link: { label: "Caching", to: "/cookbook/caching" },
        },
        {
          feature: "Provider Migrations",
          description:
            "Dual-write, shadow-read, and big-bang patterns for zero-downtime backend switches.",
          link: { label: "Migrations", to: "/cookbook/migrations" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full grub documentation.",
    },
    repo: "https://github.com/zoobzio/grub",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
