import { useSpotifyPlaylists } from "@/app/hooks/useSpotifyPlaylists";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useSpotify } from "@/app/SpotifyContext";

export default function Playlists() {
  const { playlistId, setPlaylistId } = useSpotify();
  const { data, error, isLoading } = useSpotifyPlaylists();
  const [currentPlaylist, setCurrentPlaylist] = React.useState(playlistId);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading</div>;
  // if (!data) return <div>Failed to load</div>;

  console.log({ playlistId });
  const renderPlaylists = data?.map((playlist) => (
    <li key={playlist.id} className="mt-2">
      {playlist.id === playlistId ? (
        <Button
          variant="ghost"
          className="text-indigo-500"
          onClick={() => {
            localStorage.setItem("spPlaylistId", playlist.id);
            setPlaylistId(playlist.id);
          }}
        >
          {playlist.name}
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.setItem("spPlaylistId", playlist.id);
            setPlaylistId(playlist.id);
          }}
        >
          {playlist.name}
        </Button>
      )}
    </li>
  ));

  return (
    <div className="text-white">
      <h1 className="text-2xl underline decoration-gray-500 underline-offset-4 mt-32 ml-3">Playlists</h1>
      <ul className="">{renderPlaylists}</ul>
    </div>
  );
}
