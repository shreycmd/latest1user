import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpg";
import m5 from "../assets/m5.jpg";
import m6 from "../assets/m6.png";
import m7 from "../assets/m7.jpg";

const products = [
  {
    id: 1,
    name: "Vivo X100 Pro",
    brand: "Vivo",
    image: m1,
    specs: "Zeiss APO Telephoto • Dimensity 9300 • 100W FlashCharge",
    originalPrice: "₹89,999",
    status: "Grand Prize",
    color: "from-blue-600/30 via-blue-900/10 to-transparent",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: 2,
    name: "Vivo V30 Pro",
    brand: "Vivo",
    image: m2,
    specs: "Zeiss Portrait Camera • Aura Light OIS • Slim 3D Curved",
    originalPrice: "₹41,999",
    status: "Mega Prize",
    color: "from-teal-600/30 via-teal-900/10 to-transparent",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
  {
    id: 3,
    name: "Vivo Y200 Pro",
    brand: "Vivo",
    image: m3,
    specs: "3D Curved Display • Snapdragon 695 • 64MP OIS Camera",
    originalPrice: "₹24,999",
    status: "Special Prize",
    color: "from-rose-600/30 via-rose-900/10 to-transparent",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  {
    id: 4,
    name: "Vivo T3 5G",
    brand: "Vivo",
    image: m4,
    specs: "Dimensity 7200 • 120Hz AMOLED • Sony IMX882 Sensor",
    originalPrice: "₹19,999",
    status: "Featured Prize",
    color: "from-emerald-600/30 via-emerald-900/10 to-transparent",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: 5,
    name: "Vivo V29 Pro",
    brand: "Vivo",
    image: m5,
    specs: "Smart Aura Light • 50MP Eye AF Selfie • Curved Screen",
    originalPrice: "₹39,999",
    status: "Exclusive Prize",
    color: "from-indigo-600/30 via-indigo-900/10 to-transparent",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    id: 6,
    name: "Vivo X90 Pro",
    brand: "Vivo",
    image: m6,
    specs: "1-inch Sony IMX989 • Zeiss Co-engineered • V2 Chip",
    originalPrice: "₹84,999",
    status: "Super Prize",
    color: "from-cyan-600/30 via-cyan-900/10 to-transparent",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    id: 7,
    name: "Vivo Y28 5G",
    brand: "Vivo",
    image: m7,
    specs: "5000mAh Battery • Dual Stereo Speakers • Glossy Design",
    originalPrice: "₹13,999",
    status: "Lucky Prize",
    color: "from-purple-600/30 via-purple-900/10 to-transparent",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = products.length - visibleCount;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, visibleCount, isPaused]);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-16 px-4 md:px-8">
      {/* Header section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 mb-3 tracking-tight drop-shadow-sm">
          Our Exclusive Range of Products
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
          Participate in our lucky draw for a chance to win one of these premium devices.
        </p>
      </div>

      {/* Slider Viewport Container */}
      <div 
        className="relative overflow-hidden w-full px-2 group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-blue-400 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-blue-400 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Sliding Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-4"
              >
                <motion.div
                  className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-300"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Header: Brand & Badge */}
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                        {product.brand}
                      </span>
                      <span className={`text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full border ${product.badgeColor}`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Image Area with nice background gradient */}
                    <div className={`relative h-60 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b ${product.color} p-6 mb-5 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-shadow duration-300`}>
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] z-10"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="relative z-10">
                      <h3 className="text-white text-xl font-bold tracking-tight mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed min-h-[36px]">
                        {product.specs}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase tracking-wider font-semibold">Value</span>
                      <span className="text-white font-extrabold text-xl tracking-tight">{product.originalPrice}</span>
                    </div>
                    <Link to="/form">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-300"
                      >
                        Win This
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pagination indicators */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-blue-500 w-8 shadow-lg shadow-blue-500/50' 
                : 'bg-slate-700 w-2.5 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
