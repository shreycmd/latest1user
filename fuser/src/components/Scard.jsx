import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Styles/scard.css';
import confetti from 'canvas-confetti';
import scratchImage from "../assets/scratchimg.jpeg";
import Fireworks from './Fireworks';

const Scard = ({ scprize }) => {
    const canvasRef = useRef(null);
    const [isPrizeRevealed, setIsPrizeRevealed] = useState(false);
    const isScratchingRef = useRef(false);
    const isConfettiTriggered = useRef(false);
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

    const handleScratch = useCallback((x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();

        setIsPrizeRevealed(true);
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
            isConfettiTriggered.current = true;
            if (scprize !== 'HardLuck') triggerConfetti();
        }
    }, [scprize]);

    const triggerConfetti = useCallback(() => {
        confetti(confettiConfig.current);
    }, []);

    const handleMouseDown = (e) => {
        isScratchingRef.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        handleScratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = useCallback((e) => {
        if (isScratchingRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            handleScratch(e.clientX - rect.left, e.clientY - rect.top);
            calculateScratchedPercentage();
        }
    }, [handleScratch, calculateScratchedPercentage]);

    const handleTouchStart = (e) => {
        isScratchingRef.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        handleScratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchMove = useCallback((e) => {
        if (isScratchingRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const touch = e.touches[0];
            handleScratch(touch.clientX - rect.left, touch.clientY - rect.top);
            calculateScratchedPercentage();
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
                                {scprize !== "HardLuck" && (
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
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                    ></canvas>
                </div>
            </div>
        </>
    );
};

export default Scard;