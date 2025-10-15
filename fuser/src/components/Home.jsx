import React from 'react';
import { motion } from 'framer-motion';
import vk from "../assets/nw.png";
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-custom-radial-gradient pt-20 px-4 sm:px-8 lg:px-16'>
      <motion.img
        src={vk}
        alt="Vivo"
        className='object-cover mx-auto mb-6 rounded-lg w-full '
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* <Imgslider/> */}
      <Carousel />
      <div className="w-full mt-10 py-10 flex justify-center">
        <Link to='/form'>
          <motion.button
            className="border-2 bg-blue-300 text-black px-4 py-2 rounded-lg font-semibold text-lg sm:text-xl hover:scale-105 hover:border-black transition-transform duration-150"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Play and Win
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
