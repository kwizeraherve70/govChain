import React, { useState, useEffect } from 'react';

const RealTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-1">
      <p className="text-md mt-2">{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default RealTime;
