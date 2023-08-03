"use client";
import { generateCodeChallenge, generateCodeVerifier } from "@/app/utils/utils";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Providers, TProviders } from "./types";

type TSpotifyContext = {
  token: string;
  userId: string;
  isLoggedIn: boolean | null;
  login: VoidFunction;
  setUserId: React.Dispatch<React.SetStateAction<TSpotifyContext["userId"]>>;
};

const clientId = "69a4b326ad514f1d8c8bda9929bad754"; // llevar a un env.

export const SpotifyContext = React.createContext<TSpotifyContext>({
  token: "",
  userId: "",
  isLoggedIn: null,
  login: () => {},
  setUserId: () => {},
});

export const SpotifyProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<TSpotifyContext["token"]>("");
  const [userId, setUserId] = React.useState<TSpotifyContext["userId"]>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<TSpotifyContext["isLoggedIn"]>(null);

  const searchParams = useSearchParams();

  async function login() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("spVerifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/dashboard?provider=spotify");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async function getAccessToken(code: string): Promise<string> {
    //me puedo traer tambien el userid. todo. y cambiar el nombre
    const verifier = localStorage.getItem("spVerifier") || "";
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/dashboard?provider=spotify");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();
    return access_token;
  }
  //este use effect es para despues del login
  React.useEffect(() => {
    const code = searchParams.get("code");
    const provider = searchParams.get("provider")?.toLowerCase() as TProviders;

    if (!Providers.Spotify.match(provider)) {
      return;
    }

    if (!code) {
      return;
    }

    getAccessToken(code).then(onGetAccessToken);
  }, []);

  //este useeffect es para levantar el token y distingue si esta logeado o no
  React.useEffect(() => {
    const spToken = localStorage.getItem("spToken");

    if (!spToken) {
      return;
    }

    setToken(spToken);
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(true);

    if (!userId) {
      return;
    }

    setUserId(userId);
    // setIsLoggedIn(true); este es el que queda cuando tambien contemple el userid
  }, []);

  const onGetAccessToken = (token: string) => {
    localStorage.setItem("spToken", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const ctx = { token, userId, isLoggedIn, login, setUserId };

  return <SpotifyContext.Provider value={ctx}>{props.children}</SpotifyContext.Provider>;
};

export const useSpotify = () => React.useContext(SpotifyContext);
