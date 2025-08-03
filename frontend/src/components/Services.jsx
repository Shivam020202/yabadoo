// src/components/Services.jsx
const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 rainbow-text">
          Our Colorful Services
        </h2>
        <p className="text-xl text-center mb-16 text-gray-600 max-w-3xl mx-auto">
          Transforming faces into works of art for every occasion!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl p-8 shadow-xl transition transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden border-t-8 border-aussie-gold">
            <div className="bg-amber-500 text-white rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
              <i className="fas fa-birthday-cake text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-aussie-gold">
              Birthday Parties
            </h3>
            <p className="text-gray-600 text-center">
              Turn your child's special day into a magical experience with our
              dazzling face painting designs that will delight everyone!
            </p>
            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-8 shadow-xl transition transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden border-t-8 border-aussie-blue">
            <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
              <i className="fas fa-building text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-aussie-blue">
              Corporate Events
            </h3>
            <p className="text-gray-600 text-center">
              Elevate your company events with our professional face painting
              services that create memorable experiences for all attendees!
            </p>
            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="inline-block bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-8 shadow-xl transition transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden border-t-8 border-aussie-purple">
            <div className="bg-purple-500 text-white rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
              <i className="fas fa-music text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-aussie-purple">
              Festivals & Events
            </h3>
            <p className="text-gray-600 text-center">
              Stand out in the crowd with our festival-ready designs, from
              subtle accents to full-face artistic masterpieces!
            </p>
            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
