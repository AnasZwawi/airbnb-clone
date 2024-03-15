"use client"
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
/*import { Navbar } from "./components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TuniLoge",
  description: "Louez, Explorez, Vibrez avec Tuniloge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
 */
// components/Layout.tsx
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load Navbar component
const  Navbar = dynamic(() => import("./components/Navbar") as any, { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </React.Suspense>
      )}
      {children}
    </div>
  );
};
