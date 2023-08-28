import { useSpotify } from "@/app/SpotifyContext";
import { axios } from "@/lib/axios";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import { PagingObject, PlaylistTrackObject } from "spotify-api";
import useSWRInfinite from "swr/infinite";
import React from "react";

const fetcher = (options: string[]): Promise<PagingObject<PlaylistTrackObject>> => {
  return axios
    .get(options[0], { headers: { Authorization: "Bearer " + options[1] } })
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
  const { data, size, setSize, error, isLoading } = useSWRInfinite(
    (pageIndex: number, previousPageData: PagingObject<PlaylistTrackObject>) => {
      if (!token || !playlistId) return null;

      if (previousPageData && !previousPageData.next) return null; // llegue al final.

      if (pageIndex === 0) return [`/playlists/${playlistId}/tracks?limit=50`, token]; // es la primera pag, por lo que no tiene offset.

      return [previousPageData.next, token];
    },
    fetcher
  );

  // const tracks = React.useMemo(() => {
  //   //junto los diferentes resultados de las requests para mandar todo junto
  //   if (data) {
  //     return [...data.map((page) => page.items)];
  //   }
  //   return [];
  // }, [data]);

  const tracksMemo = React.useMemo(() => {
    //me quedo con la info de paging mas reciente y junto todos los tracks
    if (data) {
      const allItems = [...data.map((page) => page.items)];
      return {
        href: data[data.length - 1].href,
        items: allItems.flat(1),
        limit: data[data.length - 1].limit,
        next: data[data.length - 1].next,
        offset: data[data.length - 1].offset,
        previous: data[data.length - 1].previous,
        total: data[data.length - 1].total,
      };
    }
    return {};
  }, [data]);

  //data ? ([] as PlaylistTrackObject[]).concat(...tracks) : [],
  return {
    data: data ? (tracksMemo as PagingObject<PlaylistTrackObject>) : null,
    size,
    setSize,
    isLoading,
    error,
  };
}
