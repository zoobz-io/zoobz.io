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

const logger = useLogger("vicky");

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "vicky",
    configKey: "vicky",
  },
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const openapiUrl =
      nuxt.options.runtimeConfig.vicky?.openapiUrl ||
      "http://localhost:8080/openapi";

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
      logger.warn("Using empty schema. Run with API available to generate types.");
    }

    addTemplate({
      filename: "vicky/schema.ts",
      write: true,
      getContents: () => schemaContent,
    });

    addTemplate({
      filename: "vicky/types.ts",
      write: true,
      getContents: () => typesContent,
    });

    nuxt.options.alias["#vicky/schema"] = resolver.resolve(
      nuxt.options.buildDir,
      "vicky/schema.ts",
    );
    nuxt.options.alias["#vicky/types"] = resolver.resolve(
      nuxt.options.buildDir,
      "vicky/types.ts",
    );

    addImports({
      name: "useVicky",
      from: resolver.resolve("./runtime/composables/useVicky"),
    });

    nuxt.options.typescript = nuxt.options.typescript || {};
    nuxt.options.typescript.tsConfig = nuxt.options.typescript.tsConfig || {};
    nuxt.options.typescript.tsConfig.compilerOptions =
      nuxt.options.typescript.tsConfig.compilerOptions || {};
    nuxt.options.typescript.tsConfig.compilerOptions.paths = {
      ...nuxt.options.typescript.tsConfig.compilerOptions.paths,
      "#vicky/schema": ["./.nuxt/vicky/schema.ts"],
      "#vicky/types": ["./.nuxt/vicky/types.ts"],
    };
  },
});
