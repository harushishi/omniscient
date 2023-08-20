import { headers } from "next/dist/client/components/headers";
import * as React from "react";
import { Playlist, SimplifiedPlaylist } from "spotify-types";
import useSWR from "swr";

type Props = {
  playlists: Playlist[];
};

const fetcher = (url: string, flag: boolean) => {
  return fetch(url, { headers: { "Content-Type": "application/json" } }).then((res) => res.json());
};

export default function Playlists({ playlists }: Props) {
  const [flag, setFlag] = React.useState(true);
  const { data } = useSWR(flag ? ["/library/api", flag] : null, ([url, flag]) => fetcher(url, flag));

  React.useEffect(() => {
    if (data) {
      setFlag(false);
    }
  }, [data]);

  const rPlaylists = data?.map((item: Partial<SimplifiedPlaylist>) => (
    <li key={item.id} className="pb-3 transition ease-in-out hover:text-xl hover:text-indigo-500 duration-300">
      {item.name}
    </li>
  ));

  return (
    <div className="text-white">
      <h1 className="text-2xl underline decoration-gray-500 underline-offset-4 pt-2">Playlists</h1>
      <ul className="py-3 pl-2">{rPlaylists}</ul>
    </div>
  );
}
