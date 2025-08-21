'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export default function AnimatedText({ texts, className = "", interval = 2000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 500); // Yazının kaybolma süresi
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <h1 
      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 sm:mt-3 md:mt-4 h-[8vh] sm:h-[9vh] md:h-[9vh] lg:h-auto font-bold text-foreground font-GoogleSansCode-Medium text-center transition-all duration-500 px-2 sm:px-0 md ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      } ${className}`}
    >
      {texts[currentIndex]}
    </h1>
  );
}