const REFRESH_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event, { xForwardedHost: false });

  // Let auth flow and internal paths through unguarded.
  if (
    path.startsWith("/auth/") ||
    path.startsWith("/api/_auth/") ||
    path.startsWith("/_nuxt/") ||
    path.startsWith("/__")
  ) {
    return;
  }

  const session = await getUserSession(event);

  if (!session.user) {
    if (path.startsWith("/api/")) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }
    return sendRedirect(event, "/auth/zitadel");
  }

  // Proactively refresh if token expires within threshold.
  const { expiresAt, refreshToken } = session.secure ?? {};
  if (
    expiresAt &&
    refreshToken &&
    Date.now() + REFRESH_THRESHOLD_MS >= expiresAt
  ) {
    await refreshAccessToken(event, session);
  }

  // Bind access token to event context for downstream handlers.
  event.context.accessToken = session.secure?.accessToken;
});

async function refreshAccessToken(
  event: Parameters<Parameters<typeof defineEventHandler>[0]>[0],
  session: Awaited<ReturnType<typeof getUserSession>>,
) {
  const config = useRuntimeConfig();
  const domain = config.oauth?.zitadel?.domain;
  const clientId = config.oauth?.zitadel?.clientId;

  if (!domain || !clientId) return;

  try {
    const tokens: Record<string, unknown> = await $fetch(
      `https://${domain}/oauth/v2/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: clientId,
          refresh_token: session.secure!.refreshToken,
        }),
      },
    );

    await setUserSession(event, {
      ...session,
      secure: {
        ...session.secure,
        accessToken: tokens.access_token as string,
        refreshToken:
          (tokens.refresh_token as string) ?? session.secure!.refreshToken,
        expiresAt: Date.now() + ((tokens.expires_in as number) ?? 3600) * 1000,
      },
    });
  } catch (error) {
    console.error("Token refresh failed:", error);
    await clearUserSession(event);

    if (event.path.startsWith("/api/")) {
      throw createError({ statusCode: 401, message: "Session expired" });
    }
    return sendRedirect(event, "/auth/zitadel");
  }
}
