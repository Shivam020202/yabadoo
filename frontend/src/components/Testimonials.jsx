// src/components/Testimonials.jsx
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 3;

  useEffect(() => {
    // Auto-advance testimonials
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <section className="py-20 bg-aussie-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">
          Happy Customers
        </h2>
        <p className="text-xl text-center mb-16 text-white max-w-3xl mx-auto">
          See what our clients have to say about our colorful creations!
        </p>

        <div id="testimonial-slider" className="relative">
          <div className="testimonial-container overflow-hidden">
            <div
              id="testimonials"
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="testimonial-slide min-w-full p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="text-aussie-gold">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    "yabadoo transformed our company family day into an
                    unforgettable experience. The designs were spectacular and
                    the artists were professional and friendly. Would definitely
                    book again!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-aussie-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                      SJ
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">Sarah Johnson</p>
                      <p className="text-gray-500 text-sm">
                        Event Manager, Brisbane
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide min-w-full p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="text-aussie-gold">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    "The highlight of my daughter's birthday party was
                    definitely the face painting. The artist was amazing with
                    the kids, and everyone loved their designs. Thank you
                    yabadoo!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-aussie-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                      MT
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">Michael Taylor</p>
                      <p className="text-gray-500 text-sm">Parent, Sydney</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide min-w-full p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="text-aussie-gold">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    "We hired yabadoo for our festival and they were a massive
                    hit! The queue never stopped all day and the artwork was
                    absolutely stunning. Very professional service from start to
                    finish."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-aussie-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                      JW
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">Jessica Wong</p>
                      <p className="text-gray-500 text-sm">
                        Festival Organizer, Melbourne
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            id="prev-btn"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 text-aussie-green"
            onClick={goToPrevSlide}
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <button
            id="next-btn"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 text-aussie-green"
            onClick={goToNextSlide}
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
