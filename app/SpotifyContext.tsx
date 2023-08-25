"use client";
import * as React from "react";
import { useSpotifyAuth } from "./SpotifyAuthContext";

export type TSpotifyContext = {
  userId: string;
  playlistId: string;
  setPlaylistId: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean | null;
};

export const SpotifyContext = React.createContext<TSpotifyContext>({
  userId: "",
  playlistId: "",
  setPlaylistId: () => {},
  isLoggedIn: null,
});

export const SpotifyProvider = (props: { children: React.ReactNode }) => {
  const { userId } = useSpotifyAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const [playlistId, setPlaylistId] = React.useState<string>("");

  React.useEffect(() => {
    const playlistId = localStorage.getItem("spPlaylistId");
    setIsLoggedIn(Boolean(userId));
    setPlaylistId(playlistId ? playlistId : "");
  }, [userId]);

  const ctx = { userId, isLoggedIn, playlistId, setPlaylistId };

  return <SpotifyContext.Provider value={ctx}>{props.children}</SpotifyContext.Provider>;
};

export const useSpotify = () => React.useContext(SpotifyContext);
