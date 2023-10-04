export type RefreshTokenBody = {
  grant_type: "refresh_token";
  client_id: string;
  refresh_token: string;
};
