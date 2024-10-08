import React, { useEffect, useRef, useState } from 'react';
import './Styles/scard.css'; // Import the updated styles
import confetti from 'canvas-confetti'; // Import the confetti library
import scratchImage from "../assets/scratchimg.jpeg"; // Scratchable image (hidden overlay)
import Fireworks from './Fireworks';

const Scard = ({ scprize }) => {
    const canvasRef = useRef(null);
    const [isScratching, setIsScratching] = useState(false);
    const [scratchedPercent, setScratchedPercent] = useState(0);
    const [isPrizeRevealed, setIsPrizeRevealed] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = scratchImage; // Use the scratchable image as the overlay

        // Once the image loads, draw it on the canvas
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, []);

    const handleMouseDown = (e) => {
        setIsScratching(true);
        scratch(e);
    };

    const handleMouseMove = (e) => {
        if (isScratching) {
            scratch(e);
        }
    };

    const handleMouseUp = () => {
        setIsScratching(false);
        checkScratchedPercentage();
    };

    const scratch = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        // Erase part of the overlay
        ctx.globalCompositeOperation = 'destination-out'; // Erase instead of drawing
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false); // Circle as eraser
        ctx.fill();
    };

    const checkScratchedPercentage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let scratchedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 0) {
                scratchedPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const percentScratched = (scratchedPixels / totalPixels) * 100;
        setScratchedPercent(percentScratched);

        // If scratched more than 50%, reveal prize and trigger confetti
        if (percentScratched > 55 && !isPrizeRevealed) {
            setIsPrizeRevealed(true);
            if (scprize !== 'BadLuck') {
                triggerConfetti();
            } // Trigger confetti effect
        }
    };

    // Function to trigger confetti
    const triggerConfetti = () => {
        confetti({
            particleCount: 1000,
            spread: 500,
            origin: { y: 0.6 }, // Confetti shoots from slightly below the top
        });
    };

    return (
        <>
            <Fireworks />
            <div className="scratch-card-wrapper">
                <div className="scratch-card-container">
                    <div className="prize text-xl">
                        {isPrizeRevealed ? (
                            <h3>
                                <div className="m-2">{scprize}</div>
                                {scprize === "BadLuck" ? null : <div>🎉You won a prize!🎉</div>}
                            </h3>
                        ) : (
                            <h3>VIVO CELEBRATION</h3>
                        )}
                    </div>
                    <canvas
                        ref={canvasRef}
                        width="300"
                        height="300"
                        className="scratch-card"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsScratching(false)}
                    ></canvas>
                </div>
            </div>
        </>
    );
};

export default Scard;
