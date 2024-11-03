import React from 'react';
import bgimg from '../assets/Frame 1.png';
import bg from '../assets/bg/Gradient.png';

const Community = () => {
  return (
    <div className="py-16 bg-[#07030b] relative" id='connect'>
      {/* Container with similar width as SofiaAi section */}
      <div className="relative z-10" style={{ padding: '0 5%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Left side - Content */}
          <div className="text-center lg:text-left relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow-custom">Join the Community</h2>
            <p className="text-gray-300 mb-8 mt-10">
              Be part of a growing community of world-builders. Compete in tournaments, participate in events, and showcase your creations.
            </p>
            <a
              href="https://discord.com/invite/your-community-link" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8689EB] items-center justify-center text-center text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-[#8689eb94] transition-colors duration-300"
            >
              Join our Discord
            </a>
          </div>

          {/* Smoke effect - Now positioned on the left */}
          <div 
            className="absolute top-0 left-[-100px] lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] pointer-events-none"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left center',
              opacity: 0.7,
            }}
          ></div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end relative z-10">
            <img
              src={bgimg}
              alt="Community"
              className="max-w-full h-[400px] lg:h-[500px] rounded-lg shadow-lg" // Adjust the height as desired
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
