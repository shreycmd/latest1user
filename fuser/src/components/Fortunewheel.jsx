import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
//import celeb1 from "../assets/celeb1.jpg";
import "./Styles/Style8.css";
import Fireworks from "./Fireworks";

const Fortunewheel = ({ prizelist, wprize }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [curIndex, setCurIndex] = useState(null);
  const [winningPrize, setWinningPrize] = useState(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelIndex, setWheelIndex] = useState(null);

  // Map the winning prize index when prizelist or wprize changes
  useEffect(() => {
    const index = prizelist.findIndex((p) => p === wprize);
    if (index !== -1) {
      setWheelIndex(index-1); 
    }
  }, [prizelist, wprize]);

  // Function to handle wheel spin
  const rotateWheel = () => {
    if (isSpinning) return; // Prevent multiple spins
    setIsSpinning(true);
    setIsConfettiActive(false);

    const segmentAngle = 360 / prizelist.length;

    // Calculate the target segment and random spins
    const targetIndex = wheelIndex !== null ? wheelIndex : Math.floor(Math.random() * prizelist.length);
    const randomSpins = Math.floor(Math.random() * 4) + 7; // Random spins between 7 and 10 for smoother deceleration

    // Calculate the final rotation based on random spins and target segment
    const winningOffset = targetIndex * segmentAngle;
    const finalRotation = randomSpins * 360 + (360 - winningOffset);

    // Smoothly animate the rotation over 6 seconds with gradual deceleration
    setRotationAngle(finalRotation);

    // Delay the prize announcement and confetti until after the spin completes
    setTimeout(() => {
      const normalizedAngle = finalRotation % 360;
      const arrowIndex = Math.floor((normalizedAngle / segmentAngle) % prizelist.length);

      setCurIndex(arrowIndex); // Highlight the winning segment
      setWinningPrize(prizelist[arrowIndex]);

      if (wprize !== "BadLuck") {
        setIsConfettiActive(true);
      }

      setIsSpinning(false);
    }, 6000); // This should match the transition duration
  };

  // Define color options for the segments
  const colors = [
    "#FF6F61", // Coral
    "#6B5B93", // Purple
    "#88B04B", // Olive Green
    "#F7CAC9", // Light Pink
    "#92A8D1", // Light Blue
    "#955251", // Burgundy
    "#D6D6D6", // Light Gray
    "#FFCC29", // Golden Yellow
    "#5D7E96", // Teal
    "#C3D6B9"  // Soft Green
  ];
  

  // Create segments with unique colors
  const segments = prizelist.map((item, index) => ({
    color: colors[index % colors.length],
    value: item,
  }));

  return (
    <>
    <Fireworks/>
    <div
      className="festival-theme"
      style={{
        
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center h-screen">
        {isConfettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} />}
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
              transition: "transform 6s cubic-bezier(0.25, 1, 0.5, 1)", // Smooth deceleration with an ease-out effect
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
          <div className="congrats absolute top-full w-full text-center">
            {winningPrize && (
              <div>
                {wprize === "BadLuck" ? (
                  <p className="bad-luck inline">Better Luck Next Time</p>
                ) : (
                  <p className="congrats-message inline">
                    Congratulations! You won: {wprize}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Fortunewheel;
