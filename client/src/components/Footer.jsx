import React from "react";
import { discord, gmail, instagram, youtube } from "../assets/Icons.jsx";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-4 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo dan nama */}
        <div className="mb-6 md:mb-0">
          <span className="text-xl self-center font-semibold whitespace-nowrap bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
            UKM Cyber Unusa
          </span>
          <p className="text-sm text-gray-400">
            Belajar, Berkembang, dan Berkontribusi dalam dunia IT
          </p>
        </div>

        {/* Sosial media */}
        <div className="flex space-x-5">
          <a
            href="https://www.youtube.com/channel/UC7YBQJ7wAoXW_W5VtouTLyA"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:text-white"
          >
            {youtube()}
          </a>
          <a
            href="https://www.instagram.com/cyberunusa_official"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:text-white"
          >
            {instagram()}
          </a>
          <a
            href="https://discord.gg/Q6qH4Xf9JR"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:text-white"
          >
            {discord()}
          </a>
          <a
            href="mailto:contact@cyberunusa.ac.id"
            className="w-5 h-5 hover:text-white "
          >
            {gmail()}
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} UKM Cyber Security UNUSA. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
