"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import LibrarySidebar from "@/components/LibrarySidebar";
import LibraryPlaylist from "@/components/LibraryPlaylist";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-wrap items-center justify-between mt-[100px]">
        <div className="w-3/12"></div>
        <div className="w-1/12 overflow-y-scroll no-scrollbar pl-6 h-[56rem]">
          <LibrarySidebar />
        </div>
        <div className="w-5/12 overflow-y-scroll no-scrollbar p-4 h-[56rem]">
          <LibraryPlaylist />
        </div>
        <div className="w-3/12"></div>
      </div>
    </>
  );
}
