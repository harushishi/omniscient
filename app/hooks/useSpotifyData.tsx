import useSWR from "swr";
import { axios } from "@/lib/axios";
import { useSpotifyAuth } from "../SpotifyAuthContext";

type TUseSpotifyData<T> = {
  data: T;
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
//   return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json()); //version vieja del fetcher usando fetch.
// };

type TUseSpotifyDataProps = {
  url: string;
};

export function useSpotifyData<T>(options: TUseSpotifyDataProps): TUseSpotifyData<T> {
  const { url } = options;
  const { token, userId } = useSpotifyAuth();
  const { data, error, isLoading } = useSWR(token ? [url, token] : null, ([url, token]) => fetcher(url, token, userId));

  return {
    data,
    isLoading,
    error,
  };
}
