import createClient from "openapi-fetch";
import type { paths } from "#vicky/types";

export function useVicky() {
  const client = createClient<paths>({
    baseUrl: "/api",
    credentials: "include",
  });

  return client;
}
