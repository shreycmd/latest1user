import React, { useState, useEffect, useCallback, useMemo } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./Styles/Style8.css";
import Fireworks from "./Fireworks";

const Fortunewheel = ({ prizelist, wprize }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [curIndex, setCurIndex] = useState(null);
  const [winningPrize, setWinningPrize] = useState(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelIndex, setWheelIndex] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update window size for Confetti only when needed
  const updateWindowSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  // Calculate target index whenever prizelist or wprize changes
  useEffect(() => {
    const index = prizelist.findIndex((p) => p === wprize);
    if (index !== -1) {
      setWheelIndex(index - 1);
    }
  }, [prizelist, wprize]);

  // Color options for the segments
  const colors = useMemo(() => [
    "#FF6F61", "#6B5B93", "#88B04B", "#F7CAC9", "#92A8D1",
    "#955251", "#D6D6D6", "#FFCC29", "#5D7E96", "#C3D6B9"
  ], []);

  const segments = useMemo(() => prizelist.map((item, index) => ({
    color: colors[index % colors.length],
    value: item,
  })), [prizelist, colors]);

  const rotateWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsConfettiActive(false);

    const segmentAngle = 360 / prizelist.length;
    const targetIndex = wheelIndex !== null ? wheelIndex : Math.floor(Math.random() * prizelist.length);
    const randomSpins = Math.floor(Math.random() * 4) + 7;
    const winningOffset = targetIndex * segmentAngle;
    const finalRotation = randomSpins * 360 + (360 - winningOffset);

    setRotationAngle(finalRotation);

    setTimeout(() => {
      const normalizedAngle = finalRotation % 360;
      const arrowIndex = Math.floor((normalizedAngle / segmentAngle) % prizelist.length);

      setCurIndex(arrowIndex);
      setWinningPrize(prizelist[arrowIndex]);
      if (wprize !== "HardLuck") setIsConfettiActive(true);
      setIsSpinning(false);
    }, 6000);
  };

  return (
    <>
      <Fireworks />
      <div className="festival-theme" style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="flex items-center justify-center h-screen">
          {isConfettiActive && <Confetti width={windowSize.width} height={windowSize.height} />}
          <div className="spin_container">
            <div className="bulb-lights"></div>
            <div className="arrow"></div>

            {/* Spin Button */}
            <div
              className={`spinBtn ${isSpinning ? "disabled" : ""}`}
              onClick={rotateWheel}
              style={{ cursor: isSpinning ? "not-allowed" : "pointer" }}
            >
              {isSpinning ? "SPINNING..." : "SPIN"}
            </div>

            {/* Wheel */}
            <div
              className="wheel"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: "transform 6s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {segments.map((segment, index) => (
                <div
                  className={`number ${index === curIndex ? "active" : ""}`}
                  key={index}
                  style={{
                    backgroundColor: segment.color,
                    transform: `rotate(${index * (360 / segments.length)}deg)`,
                  }}
                >
                  <span>{segment.value}</span>
                </div>
              ))}
            </div>

            {/* Congrats Message */}
            <motion.div
              className="congrats absolute top-full w-full text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={winningPrize ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {winningPrize && (
                <p className={wprize === "HardLuck" ? "bad-luck" : "congrats-message"}>
                  {wprize === "HardLuck" ? "Better Luck Next Time" : `Congratulations! You won: ${wprize}`}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Fortunewheel);
