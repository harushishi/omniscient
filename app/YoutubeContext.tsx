"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export type TYoutubeContext = {
  token: string;
  userId: string;
  isLoggedIn: boolean | null;
  login: VoidFunction;
  logout: VoidFunction;
  setUserId: React.Dispatch<React.SetStateAction<TYoutubeContext["userId"]>>;
};

const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENTID!;

export const YoutubeContext = React.createContext<TYoutubeContext>({
  token: "",
  userId: "",
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
  setUserId: () => {},
});

export const YoutubeProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<TYoutubeContext["token"]>("");
  const [userId, setUserId] = React.useState<TYoutubeContext["userId"]>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<TYoutubeContext["isLoggedIn"]>(null);
  const searchParams = useSearchParams();

  async function login() {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "token");
    params.append("redirect_uri", "http://localhost:3000/dashboard?provider=youtube");
    params.append("scope", "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile");

    document.location = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async function logout() {
    localStorage.removeItem("ytToken");
    localStorage.removeItem("ytUserId");
    setToken("");
    setUserId("");
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    const provider = searchParams.get("provider");
    const paramToken = hashParams.get("access_token");
    const ytToken = localStorage.getItem("ytToken");

    if (ytToken) {
      setToken(ytToken);
      setIsLoggedIn(true);
      return;
    }

    if (!paramToken) {
      return;
    }

    if (provider && provider !== "youtube") {
      return;
    }

    if (paramToken && provider === "youtube") {
      localStorage.setItem("ytToken", paramToken);
      setToken(paramToken);
      setIsLoggedIn(true);
      //todo: hacer un request al endpoint que trae la data del canal, si falla deslogear y borrar todo.
      return;
    }
  }, []);

  const ctx = { token, userId, isLoggedIn, login, logout, setUserId };

  return <YoutubeContext.Provider value={ctx}>{props.children}</YoutubeContext.Provider>;
};

export const useYoutube = () => React.useContext(YoutubeContext);
