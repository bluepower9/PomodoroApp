import React, { useState, useEffect } from 'react';

function TimeCircle() {
  const phases = [
    { name: 'Work', duration: 25, color: '#3498db' },     // Blue
    { name: 'Short Break', duration: 5, color: '#2ecc71' }, // Green
    { name: 'Work', duration: 25, color: '#3498db' },
    { name: 'Short Break', duration: 5, color: '#2ecc71' },
    { name: 'Work', duration: 25, color: '#3498db' },
    { name: 'Long Break', duration: 15, color: '#e74c3c' }  // Red
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const innerProgress = (timeLeft / phases[phaseIndex].duration) * circumference;
  
  const outerProgress = phases.reduce((acc, phase, index) => {
    const length = (phase.duration / phases.reduce((sum, p) => sum + p.duration, 0)) * circumference;
    return [...acc, { ...phase, offset: index === 0 ? 0 : acc[index - 1].offset - acc[index - 1].length, length }];
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
      setTimeLeft(phases[(phaseIndex + 1) % phases.length].duration);
    }
  }, [timeLeft, phaseIndex]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          {/* Outer Ring Segments */}
          {outerProgress.map((segment, index) => (
            <circle
              key={index}
              stroke={segment.color}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${segment.length} ${circumference}`}
              strokeDashoffset={"-25%," + segment.offset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{ transition: 'stroke-dashoffset 0.9s linear' }}
            />
          ))}

          {/* Inner Countdown Ring */}
          <circle
            stroke="black"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - innerProgress}
            strokeLinecap="round"
            r={normalizedRadius - strokeWidth * 1.5} // Adjust radius for inner ring
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
      </div>
      <div className="mt-4 text-2xl font-bold">{phases[phaseIndex].name} - {timeLeft}s</div>
    </div>
  );
}

export default TimeCircle;