"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center p-8 animate-float">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
            Ashkan Tofangdar
          </h1>
          <div className="mt-12 flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                       hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
