"use client";
import { generateCodeChallenge, generateCodeVerifier } from "@/app/utils/utils";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Providers, TProviders } from "./types";
import { ISUser } from "@/lib/spotify";

export type TSpotifyContext = {
  token: string;
  userId: string;
  isLoggedIn: boolean | null;
  login: VoidFunction;
  logout: VoidFunction;
  setUserId: React.Dispatch<React.SetStateAction<TSpotifyContext["userId"]>>;
};

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID!;

export const SpotifyContext = React.createContext<TSpotifyContext>({
  token: "",
  userId: "",
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
  setUserId: () => {},
});

export const SpotifyProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<TSpotifyContext["token"]>("");
  const [userId, setUserId] = React.useState<TSpotifyContext["userId"]>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<TSpotifyContext["isLoggedIn"]>(null);
  const router = useRouter();

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

  async function logout() {
    localStorage.removeItem("spToken");
    localStorage.removeItem("spUserId");
    setToken("");
    setUserId("");
    setIsLoggedIn(false);
  }

  function getAccessToken(code: string): Promise<string | null> {
    //me puedo traer tambien el userid. todo. y cambiar el nombre
    const verifier = localStorage.getItem("spVerifier") || "";
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/dashboard?provider=spotify");
    params.append("code_verifier", verifier);

    const result = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((res) => {
        return res.json().then((body) => {
          if (!res.ok) {
            throw new Error(body.error_description);
          }

          return body;
        });
      })
      .then((body) => {
        localStorage.removeItem("spVerifier");

        return body.access_token;
      })
      .catch((error) => {
        console.error(error);
        logout();
        router.push("/dashboard");
        return null;
      });

    return result;
  }

  //este use effect es para despues del login
  React.useEffect(() => {
    const code = searchParams.get("code");
    const token = localStorage.getItem("spToken");

    console.log({ code }, { token });

    const provider = searchParams.get("provider")?.toLowerCase() as TProviders;
    if (!Providers.Spotify.match(provider)) {
      return;
    }

    if (code && !token) {
      console.log({ token });
      getAccessToken(code).then(onGetAccessToken);
      return;
    }

    if (!token) {
      logout();
      return;
    }
  }, []);

  //este useeffect es para levantar el token y distingue si esta logeado o no
  React.useEffect(() => {
    const token = localStorage.getItem("spToken");
    const userId = localStorage.getItem("spUserId");

    if (!token || token === "undefined") {
      return;
    }

    setToken(token);

    if (!userId || userId === "undefined") {
      return;
    }

    setUserId(userId);
    setIsLoggedIn(true);
  }, []);

  const onGetAccessToken = async (token: string | null) => {
    if (!token) {
      return;
    }

    localStorage.setItem("spToken", token);
    setToken(token);

    await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data: ISUser) => {
        localStorage.setItem("spUserId", data.id);
        setUserId(data.id);
        setIsLoggedIn(true);
      });
  };

  const ctx = { token, userId, isLoggedIn, login, logout, setUserId };

  return <SpotifyContext.Provider value={ctx}>{props.children}</SpotifyContext.Provider>;
};

export const useSpotify = () => React.useContext(SpotifyContext);
