export const SpotifyConfig = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  redirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URI ??
    `${window.location.protocol}//${window.location.host}/login/success`,
};

export const CookiesConfig = {
  maxAgeForWeek: 1 * 60 * 60 * 24 * 7,
  tokenValidDurationInSec: 1 * 60 * 59, //*提前一分鐘過期
  tokenValidDurationInMs: 3540000, //*提前一分鐘過期
};
