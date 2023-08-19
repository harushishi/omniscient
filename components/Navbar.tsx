import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-gray-200 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="text-3xl underline decoration-gray-500 hover:decoration-indigo-500 underline-offset-4">
            Omniscient
          </span>
        </Link>
        <div className="flex md:order-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Get started</Link>
          </Button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          {/* <ul className="flex flex-col text-lg p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 hover:underline hover:underline-offset-4 hover:decoration-indigo-500 hover:decoration-2
                md:hover:bg-transparent md:hover:text-white md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 hover:underline hover:underline-offset-4 hover:decoration-indigo-500 hover:decoration-2
                md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/donate"
                className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 hover:underline hover:underline-offset-4 hover:decoration-indigo-500 hover:decoration-2
                 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Donate
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
