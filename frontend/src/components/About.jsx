// src/components/About.jsx
const About = () => {
  return (
    <section id="about" className="py-20 bg-white confetti-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img
              src="assets/about.jpg"
              alt="About Yabadoo"
              className="rounded-2xl shadow-2xl border-8 border-white transform -rotate-3"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold mb-6 rainbow-text">
              About yabadoo
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              Founded in 2015 by a team of passionate artists, yabadoo has grown
              to become Australia's premier face painting service, bringing joy
              and creativity to events across the country.
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              Our team of professional artists uses only the highest-quality,
              skin-safe products to ensure beautiful results and happy customers
              of all ages.
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              From Sydney to Perth, Brisbane to Melbourne, our talented artists
              have delighted thousands of clients at parties, corporate events,
              and festivals throughout Australia.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-aussie-green bg-opacity-10 shadow-md">
                <div className="text-4xl font-bold text-aussie-green">500+</div>
                <div className="text-gray-600">Events</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-aussie-blue bg-opacity-10 shadow-md">
                <div className="text-4xl font-bold text-aussie-blue">
                  15,000+
                </div>
                <div className="text-gray-600">Happy Faces</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-aussie-purple bg-opacity-10 shadow-md">
                <div className="text-4xl font-bold text-aussie-purple">7</div>
                <div className="text-gray-600">Australian States</div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block bg-aussie-gradient text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              Join Our Colorful Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
