"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Check for saved theme preference or system preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center p-8 animate-float">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
          Ashkan Tofangdar
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 opacity-0 animate-[fadeIn_1s_ease-in_forwards_0.5s]">
          Coming Soon
        </p>
        <button
          onClick={toggleTheme}
          className="mt-8 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                   hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          Toggle Theme
        </button>
      </div>
    </main>
  );
}
