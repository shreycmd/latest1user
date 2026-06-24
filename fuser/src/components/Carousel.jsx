import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import m1 from "../assets/m1.webp";
import m2 from "../assets/m2.webp";
import m3 from "../assets/m3.webp";
import m4 from "../assets/m4.webp";
import m5 from "../assets/m5.webp";
import m6 from "../assets/m6.webp";
import m7 from "../assets/m7.webp";
import m8 from "../assets/m8.webp";

const images = [m1, m2, m3, m4, m5, m6, m7, m8];

const cardGradients = [
  "from-blue-500/10 via-blue-500/5 to-transparent",
  "from-teal-500/10 via-teal-500/5 to-transparent",
  "from-rose-500/10 via-rose-500/5 to-transparent",
  "from-emerald-500/10 via-emerald-500/5 to-transparent",
  "from-indigo-500/10 via-indigo-500/5 to-transparent",
  "from-cyan-500/10 via-cyan-500/5 to-transparent",
  "from-purple-500/10 via-purple-500/5 to-transparent",
  "from-pink-500/10 via-pink-500/5 to-transparent"
];

const Carousel = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto py-16 px-4">
      {/* Header section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold  bg-clip-text  mb-3 tracking-tight drop-shadow-sm">
          Our Exclusive Range of Products
        </h2>
        <p className=" text-sm md:text-base max-w-xl mx-auto font-medium">
          Participate in our lucky draw for a chance to win one of these premium devices.
        </p>
      </div>

      {/* Marquee Viewport Container */}
      <div className="relative w-full overflow-hidden py-4 group/marquee">
        {/* Left and Right gradient overlays for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#e8ebec] to-transparent z-10 pointer-events-none opacity-40" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#e8ebec] to-transparent z-10 pointer-events-none opacity-40" />

        {/* Scrolling Track Container */}
        <div className="flex w-full">
          {/* Row 1 */}
          <div className="flex shrink-0 gap-6 pr-6 animate-slide group-hover/marquee:[animation-play-state:paused]">
            {images.map((img, i) => (
              <Link key={`r1-${i}`} to="/form">
                <motion.div
                  className="w-64 h-80 bg-neutral-500/5 border border-neutral-500/10 rounded-3xl p-5 flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-300"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image background gradient container */}
                  <div className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b ${cardGradients[i % cardGradients.length]} p-6 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-shadow duration-300`}>
                    <motion.img
                      src={img}
                      alt={`Phone prize option ${i + 1}`}
                      className="h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] z-10"
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex shrink-0 gap-6 pr-6 animate-slide group-hover/marquee:[animation-play-state:paused]" aria-hidden="true">
            {images.map((img, i) => (
              <Link key={`r2-${i}`} to="/form">
                <motion.div
                  className="w-64 h-80 bg-neutral-500/5 border border-neutral-500/10 rounded-3xl p-5 flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-300"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image background gradient container */}
                  <div className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b ${cardGradients[i % cardGradients.length]} p-6 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-shadow duration-300`}>
                    <motion.img
                      src={img}
                      alt={`Phone prize option ${i + 1}`}
                      className="h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] z-10"
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
