"use client";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSpotifyData } from "../hooks/useSpotifyData";
import { useSpotify } from "../SpotifyContext";
import LibrarySidebar from "@/components/LibrarySidebar";
import LibraryPlaylist from "@/components/LibraryPlaylist";

export default function page() {
  const searchParams = useSearchParams();
  const { userId } = useSpotify();
  const { data, error, isLoading } = useSpotifyData({ url: `/users/${userId}/playlists` });

  React.useEffect(() => {
    const platform = searchParams.get("platform");
    console.log(platform);
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-wrap items-center justify-between mt-[50px]">
        <div className="w-3/12"></div>
        <div className="w-1/12 overflow-y-scroll no-scrollbar pl-6 h-[56rem]">
          <LibrarySidebar playlists={[]} />
        </div>
        <div className="w-5/12 overflow-y-scroll no-scrollbar p-4 h-[56rem]">
          <LibraryPlaylist playlistId="" />
        </div>
        <div className="w-3/12"></div>
      </div>
    </>
  );
}
