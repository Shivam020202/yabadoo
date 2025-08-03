// pages/Home.jsx
import { useState, useEffect } from "react";
import { verifyToken } from "../services/api";
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import KidsMemoryGame from "../components/Game";

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await verifyToken();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  return (
    <div className="font-sans text-gray-800 confetti-bg">
      <Navbar
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isAuthenticated={isAuthenticated}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isAuthenticated={isAuthenticated}
      />

      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <KidsMemoryGame />
      <Contact />
      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home;
