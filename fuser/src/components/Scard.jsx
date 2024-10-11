import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Styles/scard.css';
import confetti from 'canvas-confetti';
import scratchImage from "../assets/scratchimg.jpeg";
import Fireworks from './Fireworks';

const Scard = ({ scprize }) => {
    const canvasRef = useRef(null);
    const [isPrizeRevealed, setIsPrizeRevealed] = useState(false);
    const isScratchingRef = useRef(false);
    const isConfettiTriggered = useRef(false); // New ref to prevent multiple confetti triggers
    const confettiConfig = useRef({
        particleCount: 200,
        spread: 500,
        origin: { y: 0.6 },
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = scratchImage;

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, []);

    const handleScratch = useCallback((e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();

        setIsPrizeRevealed(true); // Reveal prize on scratch
    }, []);

    const calculateScratchedPercentage = useCallback(() => {
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

        if (percentScratched > 30 && !isConfettiTriggered.current) {
            isConfettiTriggered.current = true; // Set confetti trigger flag
            if (scprize !== 'BadLuck') triggerConfetti();
        }
    }, [scprize]);

    const triggerConfetti = useCallback(() => {
        confetti(confettiConfig.current);
    }, []);

    const handleMouseDown = (e) => {
        isScratchingRef.current = true;
        handleScratch(e);
    };

    const handleMouseMove = useCallback((e) => {
        if (isScratchingRef.current) {
            handleScratch(e);
            calculateScratchedPercentage(); // Check scratched percentage while scratching
        }
    }, [handleScratch, calculateScratchedPercentage]);

    const handleMouseUp = () => {
        isScratchingRef.current = false;
    };

    return (
        <>
            <Fireworks />
            <div className="scratch-card-wrapper flex flex-col items-center justify-center">
                <div className="text-3xl text-yellow-500 font-bold mb-4">
                    Scratch Card
                </div>
                <div className="scratch-card-container">
                    <div className="prize text-xl">
                        {isPrizeRevealed && (
                            <div className="m-2">
                                {scprize}
                                {scprize !== "BadLuck" && (
                                    <div>
                                        🎉 You won a prize! 🎉
                                    </div>
                                )}
                            </div>
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
                        onMouseLeave={() => (isScratchingRef.current = false)}
                    ></canvas>
                </div>
            </div>
        </>
    );
};

export default Scard;
