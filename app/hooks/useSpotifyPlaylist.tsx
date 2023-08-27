import { useSpotify } from "@/app/SpotifyContext";
import useSWR from "swr";
import { axios } from "@/lib/axios";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import { PlaylistObjectFull } from "spotify-api";

const fetcher = (url: string, token: string, playlistId: string | null): Promise<PlaylistObjectFull> => {
  return axios
    .get(`/playlists/${playlistId}`, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
};

// const fetcher = (url: string, token: string, userId: string | null) => {
//   console.log({ url }, { token });
//   return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());
// };

export function useSpotifyPlaylist() {
  const { token } = useSpotifyAuth(); //context
  const { playlistId } = useSpotify();
  const { data, error, isLoading } = useSWR(
    token && playlistId ? [`/playlists/${playlistId}`, token, playlistId] : null,
    ([url, token, playlistId]) => fetcher(url, token, playlistId)
  );

  return {
    data: data,
    isLoading,
    error,
  };
}
