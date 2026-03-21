export default defineAppConfig({
  title: "Atom",
  collection: {
    key: "atom",
    title: "Atom",
    hero: {
      tagline: "Struct Decomposition for Go.",
      taglineHighlight: "Type-Safe Without T.",
      description:
        "Break structs into typed maps so infrastructure code can read, write, and transform fields without importing your types.",
      action: { label: "Get Started", to: "/learn/quickstart", icon: "bolt" },
      example: {
        lang: "go",
        code: `import "github.com/zoobz-io/atom"

type User struct {
    ID      string
    Name    string
    Age     int64
    Balance float64
    Active  bool
}

atomizer, _ := atom.Use[User]()
a := atomizer.Atomize(&User{
    ID: "usr-1", Name: "Alice", Age: 30, Balance: 100.50, Active: true,
})

// Type-segregated maps — no interface{}, no reflection at access time
a.Strings["ID"]      // "usr-1"
a.Strings["Name"]    // "Alice"
a.Ints["Age"]        // 30
a.Floats["Balance"]  // 100.50
a.Bools["Active"]    // true

// Infrastructure code never imports User
storage.Save(a)          // storage works with typed maps
validator.Check(a)       // validator reads fields directly
migrator.Upgrade(a)      // migrator transforms field-by-field

// Reconstruct when you need the original type back
restored, _ := atomizer.Deatomize(a)`,
      },
    },
    highlights: {
      title: "Why Atom?",
      description:
        "The bridge between your domain types and the infrastructure that operates on them.",
      items: [
        {
          icon: "filter",
          title: "Type Segregation",
          description:
            "Fields sorted into Strings, Ints, Floats, Bools, Times, Bytes. Each map carries only its type — no interface{} maps.",
        },
        {
          icon: "link",
          title: "Infrastructure Decoupling",
          description:
            "Libraries accept atoms, not your structs. Storage, validation, and migration work without importing domain types.",
        },
        {
          icon: "search",
          title: "Spec-Driven Introspection",
          description:
            "Query field names, types, and table assignments at runtime. Know your data shape without the original struct.",
        },
        {
          icon: "settings",
          title: "Width Normalization",
          description:
            "int8 through int64 all land in Ints. float32 and float64 in Floats. Overflow detected on reconstruction.",
        },
        {
          icon: "speed",
          title: "Three Performance Paths",
          description:
            "Reflection for convenience, interfaces for control, code generation for speed. Same API, same result.",
        },
        {
          icon: "anchor",
          title: "Nested Composition",
          description:
            "Recursive atoms for complex object graphs. Each nested level carries its own Spec and typed maps.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      description:
        "Decompose, inspect, transform, and reconstruct Go structs through typed maps.",
      items: [
        {
          feature: "Atomize",
          description:
            "Decompose any struct into typed maps with a single call. Registration is cached per type.",
          link: { label: "Quickstart", to: "/learn/quickstart" },
        },
        {
          feature: "Deatomize",
          description:
            "Reconstruct the original struct from an atom with width overflow detection.",
          link: { label: "Basic Usage", to: "/guides/basic-usage" },
        },
        {
          feature: "Custom Interfaces",
          description:
            "Implement Atomizable/Deatomizable for computed fields, encryption, or schema migration.",
          link: { label: "Interfaces", to: "/guides/interfaces" },
        },
        {
          feature: "Named Types",
          description:
            "type UserID string, type Status int — semantics preserved through round-trip decomposition.",
          link: { label: "Custom Types", to: "/guides/custom-types" },
        },
        {
          feature: "Nullable Fields",
          description:
            "Separate pointer tables with explicit nil handling. StringPtrs, IntPtrs, and friends.",
          link: { label: "Tables", to: "/reference/tables" },
        },
        {
          feature: "Field Introspection",
          description:
            "Fields(), FieldsIn(table), TableFor(field), Spec() — full runtime queryability of your type layout.",
          link: { label: "API", to: "/reference/api" },
        },
      ],
    },
    articles: {
      title: "Articles",
      description: "Browse the full atom documentation.",
    },
    repo: "https://github.com/zoobz-io/atom",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Cookbook: "book-open",
      Reference: "reference",
    },
  },
});
