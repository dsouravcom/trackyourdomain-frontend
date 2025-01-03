import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AnimatedCircularProgressBarProps {
  value: number;
  maxValue: number;
  text: string;
  color: string;
}

export function AnimatedCircularProgressBar({ value, maxValue, text, color }: AnimatedCircularProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <CircularProgressbar
      value={animatedValue}
      maxValue={maxValue}
      text={text}
      styles={buildStyles({
        textSize: '16px',
        pathTransitionDuration: 1,
        pathColor: color,
        textColor: color,
        trailColor: '#d6d6d6',
      })}
    />
  );
}

