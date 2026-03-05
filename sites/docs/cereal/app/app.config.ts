export default defineAppConfig({
  title: "Cereal",
  collection: {
    key: "cereal",
    title: "Cereal",
    hero: {
      tagline: "Boundary-Aware Serialization for Go.",
      taglineHighlight: "Declare Once, Enforce Everywhere.",
      description:
        "Transform data differently as it crosses system boundaries — encrypt for storage, mask for APIs, hash on receive. Security requirements live in struct tags.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobzio/cereal"

type User struct {
    ID       string \`json:"id"\`
    Email    string \`json:"email"    store.encrypt:"aes" load.decrypt:"aes" send.mask:"email"\`
    Password string \`json:"password" receive.hash:"argon2"\`
    SSN      string \`json:"ssn"      send.mask:"ssn"\`
    Token    string \`json:"token"    send.redact:"[REDACTED]"\`
}

func (u User) Clone() User { return u }

proc, _ := cereal.NewProcessor[User]()
enc, _ := cereal.AES([]byte("32-byte-key-for-aes-256-encrypt!"))
proc.SetEncryptor(cereal.EncryptAES, enc)

received, _ := proc.Receive(ctx, user)   // Password hashed
stored, _ := proc.Store(ctx, received)    // Email encrypted
loaded, _ := proc.Load(ctx, stored)       // Email decrypted
sent, _ := proc.Send(ctx, loaded)         // Email masked, SSN masked, Token redacted
// sent.Email = "a***@example.com"
// sent.SSN   = "***-**-6789"
// sent.Token = "[REDACTED]"`,
      },
    },
    highlights: {
      title: "Why Cereal?",
      description:
        "Different boundaries demand different transforms. Cereal handles all four.",
      items: [
        {
          icon: "shield",
          title: "Four Boundaries",
          description:
            "Receive, Load, Store, Send — each edge applies its own transforms. Hash on ingest, encrypt at rest, mask on output.",
        },
        {
          icon: "tag",
          title: "Declarative Struct Tags",
          description:
            "Security requirements live next to the fields they protect. One place to audit, one place to change.",
        },
        {
          icon: "lock",
          title: "Built-in Cryptography",
          description:
            "AES-GCM, RSA-OAEP, envelope encryption, Argon2, bcrypt, SHA-256, SHA-512 — all wired through struct tags.",
        },
        {
          icon: "user",
          title: "Format-Preserving Masking",
          description:
            "Eight content-aware maskers: email, SSN, phone, card, IP, UUID, IBAN, name. Masked data stays debuggable.",
        },
        {
          icon: "anchor",
          title: "Non-Destructive",
          description:
            "Original values never mutated. Every operation clones before transforming, guaranteeing immutability.",
        },
        {
          icon: "settings",
          title: "Provider-Agnostic Codecs",
          description:
            "Same types and tags work with JSON, YAML, XML, MessagePack, or BSON. Swap wire formats without touching transforms.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Encryption, hashing, masking, and redaction — applied automatically at the right system boundary.",
      items: [
        {
          feature: "Encryption",
          description:
            "AES-GCM symmetric, RSA-OAEP asymmetric, and envelope encryption for data at rest.",
          link: { label: "Encryption", to: "/guides/encryption" },
        },
        {
          feature: "Hashing",
          description:
            "One-way hashing with Argon2, bcrypt, SHA-256, and SHA-512 on the receive boundary.",
          link: { label: "Encryption", to: "/guides/encryption" },
        },
        {
          feature: "Masking",
          description:
            "Eight format-preserving maskers for PII in API responses. Content-aware partial masking.",
          link: { label: "Masking", to: "/guides/masking" },
        },
        {
          feature: "Redaction",
          description:
            "Full value replacement for secrets on the send boundary. Custom replacement strings.",
          link: { label: "Masking", to: "/guides/masking" },
        },
        {
          feature: "Key Rotation",
          description:
            "Four production-ready patterns for zero-downtime key updates: versioned, envelope, KMS, and Decryptable.",
          link: { label: "Key Rotation", to: "/cookbook/key-rotation" },
        },
        {
          feature: "Escape Hatches",
          description:
            "Override interfaces bypass reflection on hot paths. Code generation keeps implementations in sync with tags.",
          link: { label: "Escape Hatches", to: "/cookbook/escape-hatches" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full cereal documentation.",
    },
    repo: "https://github.com/zoobzio/cereal",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
