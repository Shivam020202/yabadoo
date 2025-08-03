// src/components/Gallery.jsx
const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-festival-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">
          Our Magical Gallery
        </h2>
        <p className="text-xl text-center mb-16 text-white max-w-3xl mx-auto">
          Every face tells a story. Here are some of our favorite masterpieces!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/butterfly.jpg"
              alt="Butterfly Fantasy"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-purple">
                Butterfly Fantasy
              </h3>
              <p className="text-gray-600 text-sm">Perfect for birthdays</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/superhero-f.jpg"
              alt="Superhero Mask"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-blue">Superhero Mask</h3>
              <p className="text-gray-600 text-sm">Kids' favorite</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/festival.jpg"
              alt="Festival Glitter"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-red">Festival Glitter</h3>
              <p className="text-gray-600 text-sm">Perfect for events</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/wildlife.jpg"
              alt="Aussie Wildlife"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-green">Aussie Wildlife</h3>
              <p className="text-gray-600 text-sm">Iconic designs</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/mermaid.jpg"
              alt="Mermaid Magic"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-purple">Mermaid Magic</h3>
              <p className="text-gray-600 text-sm">Stunning details</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/corporate.jpg"
              alt="Corporate Branding"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-blue">Corporate Branding</h3>
              <p className="text-gray-600 text-sm">For business events</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/crown.jpg"
              alt="Golden Crown"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-gold">Golden Crown</h3>
              <p className="text-gray-600 text-sm">Royal treatment</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="assets/floral.jpg"
              alt="Floral Dreams"
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="p-4 bg-white">
              <h3 className="font-bold text-aussie-red">Floral Dreams</h3>
              <p className="text-gray-600 text-sm">Elegant and beautiful</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-white text-aussie-purple font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            See More Designs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
