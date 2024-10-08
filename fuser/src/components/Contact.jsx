import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Importing the mail icon from react-icons
import { motion } from 'framer-motion'; // Import Framer Motion

const Contact = () => {
  return (
    <div className='w-full h-fit p-8 md:p-16 lg:p-20 mx-auto text-center bg-slate-800'>
      <motion.div 
        className='bg-gray-50 rounded-2xl p-6 md:p-10 lg:p-12 shadow-lg'
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4'
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Contact
        </motion.div>
        <motion.div 
          className='flex flex-col items-center justify-center gap-4'
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a href="mailto:vivoswg@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className='text-6xl md:text-8xl text-blue-500 cursor-pointer' />
          </a>
          <motion.div 
            className='text-lg md:text-xl lg:text-2xl font-semibold'
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.0, duration: 1.0 }}
          >
            vivoswg@gmail.com
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
