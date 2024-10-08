import React from 'react';
import { motion } from 'framer-motion'; 
import vivo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4"> {/* Decreased vertical padding */}
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <motion.div 
            className="flex flex-col px-5 items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={vivo}
              alt="Vivo Logo"
              className="h-20 w-auto mb-2" // Adjusted height of the logo
            />
            <div className="text-sm sm:text-base lg:text-lg">
              Vivo is a technology company that creates great products based on a design-driven value, with smart devices and intelligent services as its core.
              <div className="mt-2 text-xs sm:text-sm">© 2024.</div> {/* Reduced margin-top */}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-2">Information</h3>
            <ul className="space-y-2">
              <li><a href="about" className="hover:underline">About</a></li>
              <li><a href="contact" className="hover:underline">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-2">Social</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-2"> {/* Reduced margin-top */}
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-5 h-5" // Adjusted icon size
                />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/twitter.png"
                  alt="Twitter"
                  className="w-5 h-5" // Adjusted icon size
                />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
                  alt="Instagram"
                  className="w-5 h-5" // Adjusted icon size
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
