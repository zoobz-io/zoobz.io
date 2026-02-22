export default defineAppConfig({
  title: "Sentinel",
  collection: {
    key: "sentinel",
    title: "Sentinel",
    description: "Zero-dependency struct introspection for Go. Extract struct metadata once, cache it permanently, and discover relationships between types.",
    repo: "https://github.com/zoobzio/sentinel",
    navIcons: {
      Learn: "learn",
      Guides: "guides",
      Integrations: "integration",
      Reference: "reference",
    },
    example: {
      lang: "go",
      code: `type User struct {
    ID      string   \`json:"id" db:"id"\`
    Email   string   \`json:"email" validate:"required,email"\`
    Profile *Profile
    Orders  []Order
}

metadata := sentinel.Scan[User]()
// metadata.TypeName → "User"
// metadata.Fields   → []FieldMetadata (4 fields)
// metadata.Relationships → []TypeRelationship

field := metadata.Fields[0]
// field.Name → "ID"
// field.Tags → {"json": "id", "db": "id"}`,
    },
  },
});
