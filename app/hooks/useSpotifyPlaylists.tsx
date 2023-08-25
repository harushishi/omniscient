import { useSpotify } from "@/app/SpotifyContext";
import useSWR from "swr";
import { axios } from "@/lib/axios";
import { Paging, Playlist } from "spotify-types";
import { useSpotifyAuth } from "../SpotifyAuthContext";

type TUseSpotifyPlaylist = {
  data: Playlist[];
  isLoading: boolean;
  error: any;
};

const fetcher = (url: string, token: string) => {
  return axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data.items)
    .catch((error) => console.error(error));
};

// const fetcher = (url: string, token: string, userId: string | null) => {
//   console.log({ url }, { token });
//   return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());
// };

export function useSpotifyPlaylists(): TUseSpotifyPlaylist {
  const { token, userId } = useSpotifyAuth();
  const { data, error, isLoading } = useSWR(token ? [`/users/${userId}/playlists`, token] : null, ([url, token]) =>
    fetcher(url, token)
  );

  return {
    data,
    isLoading,
    error,
  };
}
