"use client";
import AppleCard from "@/components/AppleCard";
import Navbar from "@/components/Navbar";
import SpotifyCard from "@/components/SpotifyCard";
import YoutubeCard from "@/components/YoutubeCard";
import * as React from "react";
import { useSpotify } from "../context";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <h1 className=" text-white text-2xl text-center mt-[150px]">Choose which platforms you'll work with.</h1>
      <div className="flex w-full justify-center space-x-5 mt-11">
        <SpotifyCard />
        <YoutubeCard />
        <AppleCard />
      </div>
    </div>
  );
}
