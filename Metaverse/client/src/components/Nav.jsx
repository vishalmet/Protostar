import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.png';
import {
    DynamicContextProvider,
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  import { EthersExtension } from "@dynamic-labs/ethers-v5";
  
  import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
  



const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { link: "Home", path: "home" },
        { link: "Features", path: "features" },
        { link: "Game Loop", path: "gameloop" },
        { link: "Mini Games", path: "minigames" },
        { link: "NFT Market", path: "nftmarket" },
        { link: "Community", path: "connect" },
    ];

    return (
                <header className='w-full fixed top-0 left-0 right-0 z-50'>
                    <DynamicContextProvider
            settings={{
            environmentId: '09c22ca0-8d2b-4bfc-956e-3aa619ddcbbc',
            walletConnectors: [ EthereumWalletConnectors ],
            }}>
    
  
            <nav
                className={`lg:px-14 px-4 ${isSticky ? "bg-[#0d0517] text-white shadow-md" : "bg-transparent text-white"} transition-all duration-300 ease-in-out`}
                style={{ padding: '0 5%' }}
            >
                <div className='flex justify-between items-center py-4'>
                    {/* Logo */}
                    <a href="/" className='text-2xl font-semibold'>
                        <img
                            src={logo}
                            alt="Logo"
                            className='w-16 h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 object-contain'
                        />
                    </a>

                    {/* NavItems for larger screens */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-6"> {/* Adjusted space-x for md screens */}
                        <ul className='flex space-x-3 lg:space-x-6'> {/* Adjusted space for smaller screens */}
                            {navItems.map(({ link, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        spy={true}
                                        smooth={true}
                                        offset={-50}
                                        duration={300}
                                        className={`block text-base lg:text-xl font-medium cursor-pointer hover:text-[#8689EB] transition-colors duration-300`} // Reduced font size on md screens
                                        activeClass="text-[#8689EB]"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Connect Button */}
                        <DynamicWidget />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button className='text-gray-300 focus:outline-none' onClick={toggleMenu}>
                            {isMenuOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute bg-[#0d0517] top-16 left-0 w-full py-4 z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className='space-y-4 px-4'>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    spy={true}
                                    smooth={true}
                                    offset={-50}
                                    duration={300}
                                    className="block text-base font-medium text-white cursor-pointer"
                                    activeClass="text-[#8689EB]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Connect Button for Mobile */}
                    <div className="px-4 mt-4">
                        <a
                            href="#connect"
                            className="block w-full text-center py-2 bg-[#64748B] text-white rounded-lg hover:bg-[#8689eb94] transition duration-300 ease-in-out"
                            style={{ border: 'none' }}
                        >
                            Connect
                        </a>
                    </div>
                </div>
            </nav>
            </DynamicContextProvider>
        </header>
    );
};

export default Nav;
