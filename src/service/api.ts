import { create } from "apisauce";

export const ApiAccounts = create({
  baseURL: "https://accounts.spotify.com/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const ApiWithToken = (token: string) => {
  // api.headers.Authorization = `Bearer ${token}`;
  const api = create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return api;
  // return {
  //   getMyPlaylists: () => api.get("/me/playlists"),
  // getPlaylist: (id: string) => api.get(`/playlists/${id}`),
  // getPlaylistTracks: (id: string) => api.get(`/playlists/${id}`)
  // };
};
