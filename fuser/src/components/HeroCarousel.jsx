import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i4 from '../assets/i4.jpeg';
import i5 from '../assets/i5.jpeg';
import i6 from '../assets/i6.jpeg';

const images = [i4, i5, i6];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const HeroCarousel = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = ((page % images.length) + images.length) % images.length;

    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const timer = setInterval(() => paginate(1), 5000);
        return () => clearInterval(timer);
    }, [page]);

    return (
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl mb-8 group border border-white/20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > imageIndex ? 1 : -1;
                setPage([i, dir]);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === imageIndex ? 'bg-white w-8 shadow-lg' : 'bg-white/40 w-2.5'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50"
            onClick={() => paginate(-1)}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>
        <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50"
            onClick={() => paginate(1)}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
      </div>
    );
};

export default HeroCarousel;
