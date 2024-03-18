import { FacebookIcon, GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="mt-12">
      <div className="bg-stone-100 border-t border-stone-300 text-stone-900 py-8 px-2 w-full mt-auto">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <p className="mt-4 md:mt-0 text-sm text-stone-900 text-center">
            © 2024 Tuniloge Inc - Created by Anas Zouaoui. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
