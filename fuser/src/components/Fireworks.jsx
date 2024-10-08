import React from 'react';
import Particles from 'react-tsparticles';
import { loadFireworksPreset } from 'tsparticles-preset-fireworks';

const Fireworks = () => {
  // Load the fireworks preset globally
  async function particlesInit(main) {
    await loadFireworksPreset(main);
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "fireworks",
          fullScreen: {
            enable: true,
            zIndex: -1, // Places it in the background
          },
          background: {
            color: "#000", // Background color
          },
          particles: {
            number: {
              value: 7, // Adjust this to control the maximum number of fireworks
              density: {
                enable: true,
                area: 800, // Adjust area if needed
              },
            },
          },
          emitters: {
            position: {
              x: 50, // Center spawn point horizontally
              y: 50, // Center spawn point vertically
            },
            rate: {
              delay: 0.2, // Control the delay for fireworks appearance
              quantity: 1, // Control how many fireworks appear at once
            },
          },
        }}
      />
    </div>
  );
};

export default Fireworks;
