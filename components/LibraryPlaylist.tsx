"use client";
import * as React from "react";
import useSWR from "swr";

type Props = {
  playlistId: string | null; //recibo el id de la playlist por parametro?
};

export default function PlaylistTable({ playlistId }: Props) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md">
        <div className="flex items-center justify-between py-4 bg-black dark:bg-gray-800 p-3">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="w-4 h-4 text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-white border border-gray-800 rounded-lg w-80 bg-black focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search a song"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              <th scope="col" className="px-20 py-3">
                Song
              </th>
              <th scope="col" className="px-6 py-3">
                Artist
              </th>
              <th scope="col" className="px-6 py-3">
                Album
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-black border-t border-gray-800 hover:bg-gray-800 text-white">
              <th scope="row" className="flex items-center px-6 py-4  blackspace-nowrap">
                <img
                  className="w-10 h-10 rounded"
                  src="https://lastfm.freetls.fastly.net/i/u/500x500/9be2323eb0c24a7fcaf0f458d4110b5f.jpg"
                  alt="Jese image"
                />
                <div className="pl-3">Sin quererlo</div>
              </th>
              <td className="px-6 py-4">Eterna Inocencia</td>
              <td className="px-6 py-4">
                <div className="flex items-center">Las palabras y los rios.</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">3:48</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
