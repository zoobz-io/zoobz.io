export type { paths, components, operations } from "#argus/types";

import type { components } from "#argus/types";

export type Schemas = components["schemas"];

export type User = Schemas["UserResponse"];
export type Document = Schemas["DocumentResponse"];
export type DocumentVersion = Schemas["DocumentVersionResponse"];
export type SearchHit = Schemas["SearchHit"];
export type SearchRequest = Schemas["SearchRequest"];
export type View = Schemas["ViewResponse"];
