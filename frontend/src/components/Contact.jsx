// Updated src/components/Contact.jsx
import { useState } from "react";
import { submitForm } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const [queueInfo, setQueueInfo] = useState(null);
  const [showQueueModal, setShowQueueModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatTime = (minutes) => {
    if (minutes === 0) return "No wait time";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} and ${mins} minutes`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = await submitForm(formData);

      // Set queue information
      setQueueInfo(response.queueInfo);
      setShowQueueModal(true);

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          "There was an error submitting your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeQueueModal = () => {
    setShowQueueModal(false);
    setQueueInfo(null);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 rainbow-text">
          Book Your Event
        </h2>
        <p className="text-xl text-center mb-16 text-gray-600 max-w-3xl mx-auto">
          Ready to add some color to your next celebration? Let's make it
          unforgettable!
        </p>

        {submitStatus.message && !showQueueModal && (
          <div
            className={`mb-8 p-4 rounded-lg text-center ${
              submitStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-rainbow">
            <h3 className="text-3xl font-bold mb-6 text-aussie-purple">
              Get in Touch
            </h3>
            <p className="mb-8 text-gray-600">
              Ready to add some color to your next event? Fill out the form or
              contact us directly using the information below:
            </p>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white shadow-md">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <p className="ml-4 text-gray-600">
                3/10 Glenwood Ave, Coogee 2034 Sydney NSW
              </p>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white shadow-md">
                <i className="fas fa-phone text-xl"></i>
              </div>
              <p className="ml-4 text-gray-600">0416 798 698</p>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-md">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <p className="ml-4 text-gray-600">info@yabadoo.au</p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-white shadow-md hover:bg-red-600 transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-md hover:bg-purple-700 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                    placeholder="+61 4XX XXX XXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="eventType"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                >
                  <option value="" disabled>
                    Select Event Type
                  </option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="festival">Festival</option>
                  <option value="school">School Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-aussie-purple focus:border-transparent"
                  placeholder="Tell us about your event..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 bg-aussie-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Your Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Queue Status Modal */}
      {showQueueModal && queueInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeQueueModal}
          ></div>
          <div className="bg-white p-8 rounded-2xl shadow-2xl z-10 max-w-md w-full mx-4">
            <div className="text-center">
              {queueInfo.isFirstInQueue ? (
                <>
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-check text-white text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-green-600">
                    You're First in Queue!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Congratulations! Your reservation is confirmed and you can
                    proceed immediately.
                  </p>
                  <div className="bg-green-50 p-4 rounded-xl mb-6">
                    <p className="text-green-800 font-semibold">
                      Queue Position: #{queueInfo.position}
                    </p>
                    <p className="text-green-600">No waiting time required!</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-clock text-white text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-600">
                    You're in the Queue!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your reservation has been received. Please wait for your
                    turn to complete the booking.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-xl mb-6">
                    <p className="text-orange-800 font-semibold">
                      Queue Position: #{queueInfo.position}
                    </p>
                    <p className="text-orange-600">
                      Estimated Wait Time:{" "}
                      {formatTime(queueInfo.waitTimeMinutes)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <p className="text-blue-800 font-semibold">
                      💳 Payment Information
                    </p>
                    <p className="text-blue-600 text-sm">
                      Payment will be processed at the counter only. Please
                      bring cash or card when your turn arrives.
                    </p>
                  </div>
                </>
              )}

              <button
                onClick={closeQueueModal}
                className="w-full py-3 px-6 bg-aussie-gradient text-white font-bold rounded-xl hover:shadow-lg transition"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
