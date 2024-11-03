import React from 'react';
import sofiaImage from '../assets/ai.png'; 
import bg from '../assets/bg/Gradient.png'; 

const SofiaAi = () => {
  return (
    <div className="py-16 bg-[#07030b] overflow-hidden relative">
      {/* Container with similar width as Features section */}
      <div className="relative z-10" style={{ padding: '0 5%' }}>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left: Image of Sophia */}
          <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
            <img 
              src={sofiaImage} 
              alt="Sophia AI" 
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
          
          {/* Right: Details about Sophia */}
          <div className="lg:w-1/2 w-full text-white lg:pl-12 relative z-10">
            <h2 className="text-4xl font-bold mb-8 text-shadow-custom">Meet Sophia, Your AI Companion</h2>
            <p className="text-gray-300 mb-6">
              Sophia is your AI companion in the game, providing guidance, emotional support, 
              and personalized interactions to help you navigate the game's world. Whether you 
              need advice, a helping hand, or just someone to talk to, Sophia is always there for you.
            </p>
            <p className="text-gray-300">
              With advanced AI capabilities, Sophia learns from your interactions, offering 
              tailored advice and deepening your in-game experience. She’s not just an AI; she’s 
              your friend and guide in this virtual adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Smoke effect on the right side */}
      <div 
        className="absolute top-0 right-[-50px] lg:w-[700px] lg:h-[500px] w-[300px] h-[300px] pointer-events-none"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center', 
          opacity: 0.7,
        }}
      ></div>
    </div>
  );
};

export default SofiaAi;
