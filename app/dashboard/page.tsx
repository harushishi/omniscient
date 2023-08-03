"use client";
import Navbar from "@/components/Navbar";
import PlatformCard from "@/components/PlatformCard";
import * as React from "react";
import { useSpotify } from "../context";

export default function Dashboard() {
  //por ahora todas las cards tienen pasadas las props de spotify
  //falta implementar los logins de yt y apple.
  const { login, isLoggedIn } = useSpotify();
  return (
    <div>
      <Navbar />
      <h1 className=" text-white text-2xl text-center mt-[150px]">Choose which platforms you'll work with.</h1>
      <div className="flex w-full justify-center space-x-5 mt-11">
        <PlatformCard platform="spotify" login={login} isLoggedIn={isLoggedIn}/>
        {/* <PlatformCard platform="youtube" login={login} isLoggedIn={isLoggedIn}/>
        <PlatformCard platform="apple" login={login} isLoggedIn={isLoggedIn}/> */}
      </div>
    </div>
  );
}
