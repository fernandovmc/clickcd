"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
        <header className="
        bg-orange-500
        text-white
        p-3
        text-2xl
        font-bold
        cursor-default
        rounded-b-full flex justify-between items-center
        text-decoration-none no-background">
          <div className="flex-grow text-center no-background custom-link">
            <Link href="/" className="no-underline text-white custom-link no-background">CLICK CD</Link>
          </div>
          <div className="relative no-background">
            <button 
              className="text-white focus:outline-none no-background"
              onClick={toggleDropdown} custom-link
            >
              Admin
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-orange-500 rounded-md shadow-lg z-20 transition-all duration-300 ${isDropdownOpen ? 'block' : 'hidden'} no-background`}>
              <Link href="/cadastro" className="block px-4 py-2 text-white hover:bg-orange-600 no-background">Cadastro</Link>
            </div>
          </div>
        </header>
          <main className="flex-grow p-6">{children}</main>
          <footer className="bg-orange-500 text-white p-1 text-center cursor-default rounded-t-full">© 2025 CLICK CD</footer>
        </div>
      </body>
    </html>
  );
}
