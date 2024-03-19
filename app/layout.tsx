import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";

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
      <body
        className={`${montserrat.className} flex flex-col min-h-screen text-[#1b1b1b]`}
      >
        <Navbar />
        {children}
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error: "bg-red-400",
              success: "bg-black p-4 text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
