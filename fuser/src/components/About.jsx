import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import ceo from "../assets/ceo.jpg";
import cfo from "../assets/cfo.jpeg";
import logo from "../assets/logo-removebg-preview.png";

const About = () => {
  return (
    <div className='w-full min-h-screen p-6 md:p-16 lg:p-20 mx-auto text-center text-white bg-custom-radial-gradient' id='about'>
      <motion.div 
        className='bg-gray-600 rounded-2xl p-6 md:p-10 lg:p-12 shadow-lg'
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className='text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4'
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          About
        </motion.div>
        <motion.img 
          src={logo} 
          alt="Company Logo" 
          className='mx-auto h-24 md:h-32 lg:h-40 mb-4'
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className='text-base md:text-lg lg:text-xl font-semibold pb-6 md:pb-8 lg:pb-10 mb-5'
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Vivo is a technology company that creates great products based on a design-driven value, with smart devices and intelligent services as its core.
        </motion.div>
      </motion.div>
      
      <motion.div 
        className='text-2xl md:text-3xl lg:text-4xl font-bold uppercase mt-12 mb-6'
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Team
      </motion.div>
      
      <div className='flex flex-col md:flex-row justify-center md:justify-evenly gap-8'>
        <motion.div 
          className='flex flex-col items-center'
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src={ceo}
            alt="Sahil Gupta"
            className='h-32 md:h-40 lg:h-48 w-32 md:w-40 lg:w-48 rounded-full mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105'
          />
          <div className='font-bold text-lg md:text-xl lg:text-2xl'>Sahil Gupta</div>
          <div className='text-md md:text-lg lg:text-xl'>CEO</div>
        </motion.div>
        <motion.div 
          className='flex flex-col items-center'
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src={cfo}
            alt="Rajat Gupta"
            className='h-32 md:h-40 lg:h-48 w-32 md:w-40 lg:w-48 rounded-full mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105'
          />
          <div className='font-bold text-lg md:text-xl lg:text-2xl'>Rajat Gupta</div>
          <div className='text-md md:text-lg lg:text-xl'>CFO</div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
