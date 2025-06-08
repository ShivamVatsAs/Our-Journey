import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

// A small, reusable component for displaying a single time unit
const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <p className="text-4xl md:text-5xl font-bold text-primary">{String(value).padStart(2, '0')}</p>
      <span className="text-xs uppercase text-text-light">{type}</span>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <div className="text-2xl font-bold text-primary animate-pulse">
        We're together now!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <DateTimeDisplay value={days} type={'Days'} />
      <span className="text-4xl text-primary -mt-4">:</span>
      <DateTimeDisplay value={hours} type={'Hours'} />
      <span className="text-4xl text-primary -mt-4">:</span>
      <DateTimeDisplay value={minutes} type={'Minutes'} />
      <span className="text-4xl text-primary -mt-4">:</span>
      <DateTimeDisplay value={seconds} type={'Seconds'} />
    </div>
  );
};

export default CountdownTimer;