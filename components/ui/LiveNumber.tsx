import React, { useEffect, useState, useRef } from 'react';

interface LiveNumberProps {
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LiveNumber({ value, className = '', style }: LiveNumberProps) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevValue = useRef(value);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Extract numerical value to compare
    const currentNum = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    const prevNum = typeof prevValue.current === 'string' ? parseFloat(prevValue.current.replace(/[^0-9.-]+/g, '')) : prevValue.current;

    if (!isNaN(currentNum) && !isNaN(prevNum) && currentNum !== prevNum) {
      setFlash(currentNum > prevNum ? 'up' : 'down');
      
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setFlash(null);
      }, 1200); // 1200ms fade duration
    }
    
    prevValue.current = value;
    
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value]);

  const flashClass = flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : '';

  return (
    <span 
      className={`rounded transition-colors duration-300 ${flashClass} ${className}`}
      style={style}
    >
      {value}
    </span>
  );
}
