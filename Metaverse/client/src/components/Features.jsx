import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import bg1 from '../assets/bg/feature.avif'; // Background image

const Features = () => {
  const features = [
    {
      title: 'World Building',
      description: 'Build and customize your own universe.',
      icon: '🌍',
    },
    {
      title: 'Mini-Games',
      description: 'Play and compete in various games to earn rewards.',
      icon: '🎮',
    },
    {
      title: 'NFT Marketplace',
      description: 'Trade custom-made worlds and rare in-game items.',
      icon: '🛒',
    },
    {
      title: 'AI Companion',
      description: 'Personalized interaction with your AI friend, Sophia.',
      icon: '🤖',
    },
  ];

  // Use Intersection Observer to trigger animation on scroll
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="py-16 relative" // Add relative positioning
      id="features"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        zIndex: 1, // Ensure it's above other elements
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" /> {/* Adjust opacity */}

      {/* Container with similar width as Hero section */}
      <div className="relative z-10" style={{ padding: '0 5%' }}>
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-10 text-shadow-custom">
          Core Features
        </h2>

        {/* Feature Cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg transition-shadow duration-300 border bg-[#0d0517] bg-opacity-80 border-[#1d0e32]"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-200 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
