"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TYoutubeContext } from "@/app/YoutubeContext";

//me paso el hook entero por props
type Props = {
  platform: string;
  usePlatform: TYoutubeContext;
};

const platformData = {
  name: "",
  logoUrl: "",
  libraryUrl: "",
};

export default function PlatformCard({ platform, usePlatform }: Props) {
  const { login, logout, isLoggedIn } = usePlatform;
  switch (platform) {
    case "spotify":
      platformData.name = "Spotify";
      platformData.logoUrl = "/Spotify.png";
      platformData.libraryUrl = "/library?platform=spotify";
      break;
    case "youtube":
      platformData.name = "Youtube Music";
      platformData.logoUrl = "/YoutubeMusic.png";
      platformData.libraryUrl = "/library?platform=youtube";
      break;
    case "apple":
      platformData.name = "Apple Music";
      platformData.logoUrl = "/AppleMusic.png";
      platformData.libraryUrl = "/library?platform=apple";
      break;
  }

  return (
    //logout que limpie todo y me redireccione al dashboard
    <div className="w-full max-w-sm bg-black border border-gray-500 rounded-lg shadow hover:border-white">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-white  hover:bg-black focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        ></button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-60 h-60 mb-3 rounded-full shadow-lg" src={platformData.logoUrl} alt="Spotify" />
        <h1 className="mb-1 text-2xl font-medium text-white ">{platformData.name}</h1>
        {isLoggedIn ? (
          <>
            <Button variant="outline" size="default2" className="mt-10" asChild>
              <Link href={platformData.libraryUrl}>Library</Link>
            </Button>
            <Button variant="outline" size="default2" className="mt-2" onClick={logout}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button variant="outline" size="default2" className="mt-10" onClick={login}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
