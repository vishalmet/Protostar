import React from 'react';
import { FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Replace with your logo image path

const Footer = () => {
  return (
    <footer className="bg-[#07030b] text-white py-10 border-t-2 border-[#0d0517]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="mb-6 md:mb-0 flex flex-col items-center text-center md:text-left">
            <img
              src={logo}
              alt="World Builders: Rise of Realms"
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2"
            />
            <h2 className="text-lg font-bold">World Builders: Rise of Realms</h2>
          </div>

          {/* Social Icons */}
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="text-2xl sm:text-3xl hover:text-[#5865F2] transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl sm:text-3xl hover:text-[#1DA1F2] transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl sm:text-3xl hover:text-[#E1306C] transition duration-300" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm md:text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} World Builders: Rise of Realms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
