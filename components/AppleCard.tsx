"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function YoutubeCard() {
  return (
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
        <img className="w-60 h-60 mb-3 rounded-full shadow-lg" src="/AppleMusic.png" alt="Youtube Music" />
        <h1 className="mb-1 text-2xl font-medium text-white ">Apple Music</h1>
        <Button variant="outline" size="default2" className="mt-10">
          Connect
        </Button>
      </div>
    </div>
  );
}
