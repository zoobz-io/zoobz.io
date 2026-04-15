export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const target = config.argus?.backendUrl || "http://localhost:8080";
  const path = event.path.replace(/^\/api/, "");

  const headers: Record<string, string> = {};
  if (event.context.accessToken) {
    headers["Authorization"] = `Bearer ${event.context.accessToken}`;
  }

  return proxyRequest(event, `${target}${path}`, { headers });
});
