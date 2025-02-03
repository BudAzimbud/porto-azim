import Image from "next/image";
import { getRandomColor } from "../utils/colors";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  // Add state for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Add effect to track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-section flex min-h-screen items-center justify-center w-full pt-16 dark:bg-gray-900 relative">
      {/* Add flashlight effect div */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/typing-keyboard.gif"
          alt="Keyboard background"
          fill
          className="bg-[100vw_100px] opacity-10 dark:opacity-5"
          priority
        />
      </div>
      <div className="text-center relative z-10">
        <div className="hidden sm:block circular-text-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px]">
          {[...Array(16)].map((_, index) => (
            <div
              key={index}
              className="circular-text absolute w-full h-full"
              style={{
                transform: `rotate(${index * 22.5}deg)`
              }}
            >
              <span 
                className={`
                  circular-badge
                  absolute 
                  left-1/2 
                  -translate-x-1/2 
                  -top-8 sm:-top-12 
                  ${getRandomColor()} 
                  text-white 
                  font-mono 
                  text-xs sm:text-sm 
                  px-2 sm:px-3 
                  py-0.5 sm:py-1 
                  rounded-full
                  shadow-md
                  hover:scale-110
                  transition-transform
                  duration-200
                `}
              >
                {['FULL', 'STACK', 'DEV', '★', 'WEB', 'EXPERT', '2025', '⚡', 'FULL', 'STACK', 'DEV', '★', 'WEB', 'EXPERT', '2025', '⚡'][index]}
              </span>
            </div>
          ))}
        </div>

        <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto mb-4">
          <Image
            src="/Azim2.png"
            alt="Azim's photo"
            fill
            className="profile-image rounded-full object-cover border-4 border-blue-600 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            priority
          />
        </div>

        <h1 className="name-title text-center font-bold text-3xl sm:text-4xl text-blue-600 transition-colors duration-300 cursor-pointer">
          Azim
        </h1>
        <h2 className="role-title text-center text-xl sm:text-2xl text-gray-700 font-semibold mt-2">
          Software Engineer
        </h2>
        <h3 className="location-text text-center text-base sm:text-lg text-gray-500 mt-1">
          Bandung, Indonesia
        </h3>
      </div>
    </div>
  );
}; 
