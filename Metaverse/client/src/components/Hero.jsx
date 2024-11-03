import React, { useState, useEffect } from 'react';
import bg2 from '../assets/bg2.jpg';
import char1 from '../assets/char1.png';
import char2 from '../assets/char2.png';
import char3 from '../assets/char3.png';
import char4 from '../assets/char4.png';
import char5 from '../assets/char5.png';
import char6 from '../assets/char6.png';
import bg from '../assets/magicstudio-art.jpg'

const Hero = () => {
  const characters = [char1, char2, char3, char4, char5, char6];
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const charInterval = setInterval(() => {
      setCurrentCharIndex((prevIndex) => (prevIndex + 1) % characters.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(charInterval);
  }, [characters.length]);

  return (
    <div  id='home'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5%', // Adds padding to both sides for some spacing
      }}
      className="relative"
      

    >
      {/* Left section - Content */}
      <div className="text-left text-white space-y-6 w-full md:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
          Explore, Build, and Thrive in Multiple Realms
        </h1>
        <p className="text-base md:text-lg lg:text-xl">
          Create your world, compete with others, and trade NFT worlds in a vibrant metaverse.
        </p>
        <button className="px-6 py-3 bg-[#8689EB] border border-[#07030b] text-white font-semibold rounded-lg shadow-md hover:border-[#64748B] hover:border hover:bg-[#07030b] transition duration-300">
          Join Now
        </button>
      </div>

      {/* Right section - Character slideshow */}
      <div className="w-1/2 hidden md:flex justify-center items-center">
        <img
          src={characters[currentCharIndex]}
          alt="Character"
          className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[440px] lg:h-[620px] p-5 object-cover rounded-lg shadow-lg transition duration-1000 ease-in-out"
        />
      </div>

      {/* Mobile Character Slideshow */}
      <div className="md:hidden w-full flex justify-center items-center mt-8">
        <img
          src={characters[currentCharIndex]}
          alt="Character"
          className="w-[250px] h-[370px] object-cover rounded-lg shadow-lg  transition duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Hero;
