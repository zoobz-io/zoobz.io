import createClient from "openapi-fetch";
import type { paths } from "#argus/types";

export function useArgus() {
  const {
    public: { argus },
  } = useRuntimeConfig();

  const headers: HeadersInit = {};
  if (import.meta.server) {
    const cookie = useRequestHeaders(["cookie"]).cookie;
    if (cookie) headers.cookie = cookie;
  }

  return createClient<paths>({
    baseUrl: argus.apiUrl,
    credentials: "include",
    headers,
  });
}
