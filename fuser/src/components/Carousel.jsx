import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpg";
import m5 from "../assets/m5.jpg";
import m6 from "../assets/m6.png";
import m7 from "../assets/m7.jpg";

const images = [m1, m2, m3, m4, m5, m6, m7];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const gapSize = 15;
  const imageHeight = isMobile ? '300px' : '400px'; // Adjust as needed

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Update layout on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);

    const interval = setInterval(handleNext, 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box textAlign="center" py={4} position="relative">
      <Typography variant="h4" sx={{ mb: 4, color: '#333' }}>
        Our Exclusive Range of Products
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '20rem', sm: '30rem', md: '40rem' },
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)',
            color: 'black',
            zIndex: 1,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * (100 / (isMobile ? 1 : 3))}%)`,
            gap: `${gapSize}px`,
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Product ${index + 1}`}
              sx={{
                width: isMobile ? '80%' : `calc(${100 / 3}% - ${gapSize}px)`,
                height: imageHeight,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)',
            color: 'black',
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#333' : '#bbb',
              marginX: 1,
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
