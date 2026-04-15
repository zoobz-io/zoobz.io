import {
  defineNuxtModule,
  createResolver,
  addTemplate,
  addImports,
  useLogger,
} from "@nuxt/kit";
import openapiTS, { astToString } from "openapi-typescript";

export interface ModuleOptions {
  openapiUrl?: string;
}

const logger = useLogger("argus");

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "argus",
    configKey: "argus",
  },
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const backendUrl =
      nuxt.options.runtimeConfig.argus?.backendUrl || "http://localhost:8080";
    const openapiUrl = `${backendUrl}/openapi`;

    let schemaContent = "export default {} as const;";
    let typesContent = "export type paths = {}; export type components = {};";

    try {
      const response = await fetch(openapiUrl);
      if (response.ok) {
        const schema = await response.json();
        schemaContent = `export default ${JSON.stringify(schema, null, 2)} as const;`;

        const ast = await openapiTS(new URL(openapiUrl));
        typesContent = astToString(ast);
      } else {
        logger.warn(
          `Failed to fetch OpenAPI spec from ${openapiUrl}: ${response.status}`,
        );
      }
    } catch (error) {
      logger.warn(
        `Could not fetch OpenAPI spec from ${openapiUrl}:`,
        error instanceof Error ? error.message : error,
      );
      logger.warn(
        "Using empty schema. Run with API available to generate types.",
      );
    }

    addTemplate({
      filename: "argus/schema.ts",
      write: true,
      getContents: () => schemaContent,
    });

    addTemplate({
      filename: "argus/types.ts",
      write: true,
      getContents: () => typesContent,
    });

    nuxt.options.alias["#argus/schema"] = resolver.resolve(
      nuxt.options.buildDir,
      "argus/schema.ts",
    );
    nuxt.options.alias["#argus/types"] = resolver.resolve(
      nuxt.options.buildDir,
      "argus/types.ts",
    );

    nuxt.options.typescript = nuxt.options.typescript || {};
    nuxt.options.typescript.tsConfig = nuxt.options.typescript.tsConfig || {};
    nuxt.options.typescript.tsConfig.compilerOptions =
      nuxt.options.typescript.tsConfig.compilerOptions || {};
    nuxt.options.typescript.tsConfig.compilerOptions.paths = {
      ...nuxt.options.typescript.tsConfig.compilerOptions.paths,
      "#argus/schema": ["./.nuxt/argus/schema.ts"],
      "#argus/types": ["./.nuxt/argus/types.ts"],
    };
  },
});
