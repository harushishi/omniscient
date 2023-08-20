import { useSpotify } from "@/app/SpotifyContext";
import useSWR from "swr";
import { axios } from "@/lib/axios";
import { Paging, Playlist } from "spotify-types";

type TUseSpotifyPlaylist = {
  data: Paging<Playlist>;
  isLoading: boolean;
  error: any;
};

const fetcher = (url: string, token: string, userId: string | null) => {
  return axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

// const fetcher = (url: string, token: string, userId: string | null) => {
//   console.log({ url }, { token });
//   return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());
// };

type TUseSpotifyDataProps = {
  url: string;
};

export function useSpotifyData<T>(options: TUseSpotifyDataProps): TUseSpotifyPlaylist {
  const { url } = options;
  const { token, userId } = useSpotify();
  const { data, error, isLoading } = useSWR(token ? [url, token] : null, ([url, token]) => fetcher(url, token, userId));

  return {
    data,
    isLoading,
    error,
  };
}
