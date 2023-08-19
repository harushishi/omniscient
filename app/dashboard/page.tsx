"use client";
import Navbar from "@/components/Navbar";
import PlatformCard from "@/components/PlatformCard";
import * as React from "react";
import { useSpotify } from "../SpotifyContext";
import { useYoutube } from "../YoutubeContext";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <h1 className=" text-white text-2xl text-center mt-[150px]">Choose which platforms you'll work with.</h1>
      <div className="flex w-full justify-center space-x-5 mt-11">
        <PlatformCard platform={"spotify"} usePlatform={useSpotify()} />
        <PlatformCard platform={"youtube"} usePlatform={useYoutube()} />
      </div>
    </div>
  );
}
