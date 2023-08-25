import Navbar from "@/components/Navbar";
import * as React from "react";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex w-full justify-center mt-[150px] space-x-5">
        <h1 className=" text-white text-2xl">Your music from anywhere to anywhere.</h1>
      </div>
    </div>
  );
}
