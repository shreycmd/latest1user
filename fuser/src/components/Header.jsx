import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import logo from "../assets/logo-removebg-preview.png";
import l1 from "../assets/l1.png"
export const Header = () => {
  const [nav, setNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start({ opacity: nav ? 1 : 0.8, y: nav ? 0 : -10 });
  }, [nav, controls]);

  return (
    <motion.div
      className={`fixed z-10 top-0 w-full h-fit flex justify-between items-center py-2 px-4 md:px-8 ${nav ? 'bg-opacity-70 shadow-sm  duration-300 shadow-black' : 'duration-300'} backdrop-blur-sm`}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div>
        <img src={logo} className="h-10 w-40 object-cover rounded-xl" alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center text-black  font-semibold text-xl gap-5 mx-4">
        <div className="hover:underline">
          <Link to='/'>Home</Link>
        </div>
        <div className="hover:underline">
          <Link to='/about'>About</Link>
        </div>
        <div className="hover:underline">
          <Link to='/contact'>Contact</Link>
        </div>
        <div className="hover:underline">
          <Link to='/form'>Play & Win</Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-black">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: menuOpen ? 'auto' : 0 }}
        className="md:hidden w-full absolute top-12 left-0 bg-white shadow-lg z-10 overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-4 py-4 text-black">
          <Link to='/' onClick={toggleMenu} className="hover:underline">Home</Link>
          <Link to='/about' onClick={toggleMenu} className="hover:underline">About</Link>
          <Link to='/contact' onClick={toggleMenu} className="hover:underline">Contact</Link>
          <Link to='/form' onClick={toggleMenu} className="hover:underline">Scratch & Win</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
