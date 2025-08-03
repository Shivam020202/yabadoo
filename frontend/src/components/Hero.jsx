// components/Hero.jsx - Minimal working Hero component
import React from "react";

const Hero = () => {
  return (
    <header
      className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="text-center text-white px-4 z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fadeIn rainbow-text">
          Bring Color to Life!
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-semibold">
          Australia's most vibrant face painting service for parties, festivals,
          and events!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="bg-amber-500 p-4 rounded-full px-6 transform hover:scale-105"
          >
            Book Your Event
          </a>
          <a
            href="#gallery"
            className="bg-purple-500 p-4 rounded-full px-6 transform hover:scale-105"
          >
            See Our Magic
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
