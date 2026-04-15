export default defineOAuthZitadelEventHandler({
  config: {
    scope: ["openid", "profile", "email", "offline_access", "urn:zitadel:iam:org:project:id:zitadel:aud", "urn:zitadel:iam:user:resourceowner"],
    authorizationParams: {
      prompt: "login",
    },
  },
  async onSuccess(event, { user, tokens }) {
    const expiresAt = Date.now() + (tokens.expires_in ?? 3600) * 1000;

    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email,
        name: user.name,
      },
      secure: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Zitadel OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
