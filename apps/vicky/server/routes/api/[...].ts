export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const target = config.vicky?.apiUrl || "http://localhost:8080";
  const path = event.path.replace(/^\/api/, "");

  return proxyRequest(event, `${target}${path}`);
});
