import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bgimg from "../assets/bg/gameloop.jpg";

const GameLoop = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0d0517] min-h-[600px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      id="gameloop"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="hidden md:block w-full md:w-1/2 h-[400px] lg:h-[500px] rounded-lg shadow-lg mb-8 md:mb-0"></div>

        {/* Right Section - Steps */}
        <div className="w-full md:w-1/2 space-y-6 sm:space-y-8 relative ml-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 text-shadow-custom">
            The Gameplay Loop
          </h2>

          {/* Vertical Line for Timeline */}
          <motion.div
            initial={{ height: "0px" }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 9, ease: "linear" }}
            className="absolute left-[-15px] lg:left-[-25px] top-0 w-1 bg-[#07030b]"
          ></motion.div>

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0, duration: 3 }}
            className="relative flex items-start"
          >
            <div className="absolute -left-5 lg:-left-7 top-2 h-4 w-4 bg-white border border-[#07030b] rounded-full"></div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#07030b]">Build your realm</h3>
              <p className="text-gray-100">Create and customize your own universe.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 3, duration: 3 }}
            className="relative flex items-start"
          >
            <div className="absolute -left-5 lg:-left-7 top-2 h-4 w-4 bg-white border border-[#07030b] rounded-full"></div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#07030b]">Engage in mini-games</h3>
              <p className="text-gray-100">Play and compete to earn in-game rewards.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 6, duration: 3 }}
            className="relative flex items-start"
          >
            <div className="absolute -left-5 lg:-left-7 top-2 h-4 w-4 bg-white border border-[#07030b] rounded-full"></div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#07030b]">Earn rewards and trade NFTs</h3>
              <p className="text-gray-100">Exchange in-game rewards for NFTs in the marketplace.</p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 9, duration: 3 }}
            className="relative flex items-start"
          >
            <div className="absolute -left-5 lg:-left-7 top-2 h-4 w-4 bg-white border border-[#07030b] rounded-full"></div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#07030b]">Expand and interact with Sophia</h3>
              <p className="text-gray-100">Grow your realm and engage with your AI companion.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameLoop;
