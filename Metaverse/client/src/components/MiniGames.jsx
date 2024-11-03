import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MiniGames = () => {
  const games = [
    {
      title: 'Flappy Bird-Like Game',
      description: 'Avoid obstacles and survive as long as possible to earn rewards.',
      videoSrc: "https://res.cloudinary.com/dwbndhm4p/video/upload/v1728880558/f5qdod32bd39yqvvvfgt.mp4",
    },
    {
      title: 'Car Racing Game',
      description: 'Compete in races; the higher you rank, the more you earn.',
      videoSrc: "https://res.cloudinary.com/dwbndhm4p/video/upload/v1728880558/f5qdod32bd39yqvvvfgt.mp4",
    },
    {
      title: 'Fighting Game',
      description: 'Engage in PvP or PvE combat in a 2D arena.',
      videoSrc: "https://res.cloudinary.com/dwbndhm4p/video/upload/v1728880558/f5qdod32bd39yqvvvfgt.mp4",
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants for Framer Motion with staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Staggered delay for each child
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  return (
    <div className="relative py-16 bg-[#07030b]" id='minigames'>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        // style={{
        //   backgroundImage: `url(${bg1})`,
        //   zIndex: 1, // Ensure it’s below the content
        //   opacity: 0.6, // Slightly hide the background
        // }}
      ></div>

      <div className="container mx-auto px-6 text-center relative z-10"> {/* Ensure it has the same width as the Features section */}
        <h2 className="text-4xl font-bold text-white mb-4 text-shadow-custom">Dive into Mini-Games</h2>
        <p className="text-gray-300 mb-12">
          Play and compete in exciting mini-games to win resources and exclusive in-game rewards.
        </p>

        {/* Grid Layout with staggered animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants} // Apply stagger effect at container level
        >
          {games.map((game, index) => (
            <motion.div
              key={index}
              className="max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-[#1d0e32] p-4 hover:shadow-[#64748B]"
              variants={cardVariants}
            >
              {/* Video Element */}
              <video
                src={game.videoSrc}
                className="w-full h-48 object-cover"
                autoPlay
                loop
                muted
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-300">{game.title}</h3>
                <p className="text-gray-400 mt-5 text-sm">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MiniGames;
