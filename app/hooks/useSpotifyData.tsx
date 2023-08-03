import { useSpotify } from "@/app/context";
import * as React from "react";
import useSWR from "swr";

type TUseSpotifyData<T> = {
  data: T;
  isLoading: boolean;
  error: any;
};

const fetcher = (url: string, token: string, userId: string | null) => {
  console.log({ url }, { token });
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());
};

type TUseSpotifyDataProps = {
  options: {
    url: string;
    withUserId?: boolean;
  };
};

export function useSpotifyData<T>({ options }: TUseSpotifyDataProps): TUseSpotifyData<T> {
  const { url, withUserId = false } = options;
  const { token, userId } = useSpotify();
  const { data, error, isLoading } = useSWR(token ? [url, token, withUserId ? userId : null] : null, ([url, token]) =>
    fetcher(url, token, userId)
  );

  return {
    data,
    isLoading,
    error,
  };
}
