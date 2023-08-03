"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSpotify } from "@/app/context";

//probar pasar por prop el hook y tener solo un componente para todo

export default function SpotifyCard() {
  const { login, isLoggedIn } = useSpotify();

  return (
    //logout que limpie todo y me redireccione al dashboard
    <div className="w-full max-w-sm bg-black border border-gray-500 rounded-lg shadow hover:border-white">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-white  hover:bg-black focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Refresh</span>
          {/* Cambiar este svg por uno de refresh */}
          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-60 h-60 mb-3 rounded-full shadow-lg" src="/Spotify.png" alt="Spotify" />
        <h1 className="mb-1 text-2xl font-medium text-white ">Spotify</h1>
        {isLoggedIn ? (
          <Button variant="outline" size="default2" className="mt-10" asChild>
            <Link href="/library?platform=spotify">Library</Link>
          </Button>
        ) : (
          <Button variant="outline" size="default2" className="mt-10" onClick={login}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
