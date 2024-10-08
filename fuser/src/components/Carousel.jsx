import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import m1 from "../assets/m1.jpg";
import m2 from "../assets/m2.jpeg";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpeg";

const images = [m1, m2, m3, m4, m1, m2, m3, m4, m1, m2, m3, m4];

// Duplicate images for the carousel effect
const duplicatedImages = [...images, ...images];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set the number of images to show based on the screen width
  const imagesToShow = window.innerWidth < 640 ? 1 : 3; // 1 for mobile, 3 for larger screens

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Box textAlign="center" py={4} position="relative">
      <Typography 
        variant="h4"
        sx={{ mb: 4, color: '#333' }}
      >
        Our Exclusive Range of Products
      </Typography>
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '20rem', sm: '25rem', md: '30rem' }, // Responsive height
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {duplicatedImages.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Product ${index + 1}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: `${(index - currentIndex) * (100 / imagesToShow)}%`, // Adjust position based on how many images are shown
              width: { xs: '100%', sm: `${100 / imagesToShow}%` },  // Responsive width for mobile and larger screens
              height: '100%', // Maintain full height
              objectFit: 'cover',
              transition: 'left 1s ease-in-out', // Smooth transition
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              margin: 'auto', // Center the images
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
