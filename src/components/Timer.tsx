
import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  duration: number; // Duration in seconds
  isRunning: boolean;
  onTimeEnd: () => void;
  onTimeUpdate?: (elapsedTime: number) => void;
}

const Timer: React.FC<TimerProps> = ({ duration, isRunning, onTimeEnd, onTimeUpdate }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startTimeRef.current = null;
      return;
    }

    startTimeRef.current = Date.now();
    
    // Update timer every 100ms for smoother time display
    intervalRef.current = window.setInterval(() => {
      const elapsedSeconds = (Date.now() - (startTimeRef.current || 0)) / 1000;
      const remaining = duration - elapsedSeconds;
      
      // Update elapsed time for scoring
      if (onTimeUpdate) {
        onTimeUpdate(elapsedSeconds);
      }
      
      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeLeft(0);
        onTimeEnd();
        return;
      }
      
      setTimeLeft(remaining);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, duration, onTimeEnd, onTimeUpdate]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Calculate progress percentage
  const progress = (timeLeft / duration) * 100;
  
  // Determine color based on time remaining
  const getColor = () => {
    if (progress > 60) return 'bg-success';
    if (progress > 30) return 'bg-accent';
    return 'bg-secondary';
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>Time left</span>
        <span>{Math.ceil(timeLeft)} seconds</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
