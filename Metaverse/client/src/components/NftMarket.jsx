import React from 'react';
import bg from '../assets/Subscribe.png'

const NftMarket = () => {
  return (
    <div className="py-16 bg-[#0d0517] text-center" id='nftmarket'
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
      }}>
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-4 text-shadow-custom">NFT Marketplace</h2>
        
        {/* Description */}
        <p className="text-gray-300 mb-8">
          Trade your unique worlds and in-game items as NFTs on our marketplace. Expand your empire by acquiring rare, player-made worlds.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-[#8689EB] hover:bg-[#8689eb94] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            Start Trading
          </button>
          <button className="bg-transparent border border-[#8689EB] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#8689eb94] hover:text-white transition-colors duration-300">
            View Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}

export default NftMarket;
