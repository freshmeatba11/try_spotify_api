export const SpotifyConfig = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  redirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URI ??
    `${window.location.protocol}//${window.location.host}/login/success`,
};
