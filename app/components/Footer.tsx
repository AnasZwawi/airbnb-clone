import { GithubIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-stone-100 border-t border-stone-200 text-stone-900 py-8 px-2 w-full  absolute bottom-0 mt-6">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-stone-900 " href="#">
            <YoutubeIcon className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link className="text-stone-900 " href="#">
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link className="text-stone-900 " href="#">
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-stone-900">
          © 2024 Tuniloge Inc - LLC by Anas zouaoui. All rights reserved.
        </p>
      </div>
    </div>
  );
};
