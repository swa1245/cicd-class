"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [balloons, setBalloons] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Current date for the birthday message
  const currentDate = new Date("2025-04-06");
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  useEffect(() => {
    // Generate random balloons
    const newBalloons = [];
    const colors = ["#FF5252", "#FFEB3B", "#2196F3", "#4CAF50", "#9C27B0", "#FF9800"];
    
    for (let i = 0; i < 30; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setBalloons(newBalloons);
    setShowConfetti(true);
    
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Balloons */}
      {balloons.map((balloon) => (
        <div 
          key={balloon.id}
          className="absolute animate-float"
          style={{
            left: `${balloon.x}%`,
            bottom: `${balloon.y + 100}%`,
            animationDuration: `${Math.random() * 5 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          <div 
            className="w-12 h-16 rounded-full relative"
            style={{ background: balloon.color }}
          >
            <div className="absolute w-1 h-20 bg-gray-300 left-1/2 -bottom-20 transform -translate-x-1/2" />
          </div>
        </div>
      ))}
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen relative z-20">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-8 animate-bounce text-yellow-300 drop-shadow-lg">
          Happy Birthday Swaraj!
        </h1>
        
        <div className="text-2xl md:text-3xl text-center mb-12 animate-pulse">
          {day} {month} {year}
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-2xl mx-auto mb-12 border border-white/20 shadow-xl">
          <p className="text-xl md:text-2xl text-center mb-6">
            Wishing you a fantastic birthday filled with joy, success, and amazing code! 🎉
          </p>
          <p className="text-lg md:text-xl text-center">
            May your commits always be clean, your deployments smooth, and your bugs easy to fix!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 transform transition-transform hover:scale-105 shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center">🚀 Success</h3>
            <p className="text-center">May your career soar to new heights this year!</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 transform transition-transform hover:scale-105 shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center">💻 Code</h3>
            <p className="text-center">May your code be as elegant as your ideas!</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 transform transition-transform hover:scale-105 shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center">🎂 Joy</h3>
            <p className="text-center">May your day be as sweet as your birthday cake!</p>
          </div>
        </div>
        
        <button 
          className="mt-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-xl transform transition-transform hover:scale-110 shadow-lg"
          onClick={() => setShowConfetti(true)}
        >
          Celebrate Again! 🎉
        </button>
      </div>
    </div>
  );
}
