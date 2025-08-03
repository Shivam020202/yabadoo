// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  setIsMobileMenuOpen,
  setIsLoginModalOpen,
  isAuthenticated,
}) => {
  return (
    <nav className="absolute top-0 left-0 right-0 px-4 lg:px-10 py-5 flex justify-between items-center z-10">
      {/* <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div> */}

      <div className="flex items-center">
        <span className="text-white text-3xl font-bold rainbow-text">
          Yabadoo
        </span>
      </div>

      <div className="hidden md:flex space-x-10">
        <a
          href="#services"
          className="text-white hover:text-aussie-gold transition font-bold"
        >
          Services
        </a>
        <a
          href="#gallery"
          className="text-white hover:text-aussie-gold transition font-bold"
        >
          Gallery
        </a>
        <a
          href="#about"
          className="text-white hover:text-aussie-gold transition font-bold"
        >
          About Us
        </a>
        <a
          href="#contact"
          className="text-white hover:text-aussie-gold transition font-bold"
        >
          Contact
        </a>

        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="text-white hover:text-aussie-gold transition font-bold"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-white hover:text-aussie-gold transition font-bold"
          >
            Login
          </button>
        )}
      </div>

      <button
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <i className="fas fa-bars text-2xl"></i>
      </button>
    </nav>
  );
};

export default Navbar;
