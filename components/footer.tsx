import React from "react";
import { profile } from "@/constant/profile";

const Footer = () => {
  return (
    <footer className="text-center text-zinc-500 py-16">
      <p>
         &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
