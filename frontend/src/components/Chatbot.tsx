import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotKnowledge {
  keywords: string[];
  response: string;
}

const YabadooChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const knowledgeBase: ChatbotKnowledge[] = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      response:
        "G'day! Welcome to Yabadoo - Australia's most vibrant face painting service! 🎨 How can I help you today? You can ask me about our services, pricing, locations, or booking information!",
    },
    {
      keywords: ["services", "what do you do", "face painting"],
      response:
        "We offer professional face painting services for: 🎉 Birthday Parties, 🏢 Corporate Events, 🎪 Festivals & Events, and 🏫 School Events. Our talented artists create everything from simple designs to full-face masterpieces using only skin-safe products!",
    },
    {
      keywords: ["birthday", "party", "kids party", "children"],
      response:
        "Our birthday party service is perfect for making your child's special day magical! ✨ We create dazzling face painting designs that delight kids and adults alike. Popular designs include butterflies, superheroes, animals, and princesses!",
    },
    {
      keywords: ["corporate", "business", "company", "office"],
      response:
        "Elevate your company events with our professional face painting services! 🏢 We create memorable experiences for team building days, family events, product launches, and corporate parties. We can even incorporate your company branding!",
    },
    {
      keywords: ["festival", "event", "public"],
      response:
        "Stand out at festivals and public events with our stunning designs! 🎪 From subtle face accents to full-face artistic masterpieces, we offer festival-ready designs with glitter, bold colors, and creative themes.",
    },
    {
      keywords: ["location", "where", "areas", "cities", "australia"],
      response:
        "We service all major Australian cities! 🇦🇺 Including Sydney, Melbourne, Brisbane, Perth, and we cover all 7 Australian states. Our artists travel nationwide to bring color to your events!",
    },
    {
      keywords: ["price", "cost", "how much", "pricing", "rates"],
      response:
        "Our pricing varies based on event type, duration, and number of artists needed. For a personalized quote, please contact us at 0416 798 698 or fill out our booking form. We offer competitive rates for all types of events! 💰",
    },
    {
      keywords: ["book", "booking", "reserve", "hire"],
      response:
        "Ready to book? 📅 You can contact us directly at 0416 798 698, email info@yabadoo.au, or fill out our contact form on the website. We'll need details about your event date, type, location, and estimated number of participants.",
    },
    {
      keywords: ["contact", "phone", "email", "address"],
      response:
        "Here's how to reach us: 📍 Address: 3/10 Glenwood Ave, Coogee 2034 Sydney NSW 📞 Phone: 0416 798 698 ✉️ Email: info@yabadoo.au We're here to help with all your face painting needs!",
    },
    {
      keywords: ["safe", "safety", "skin", "allergies", "products"],
      response:
        "Safety is our top priority! ✅ We use only the highest-quality, skin-safe face painting products. All our paints are non-toxic and washable. If you have specific allergies or skin sensitivities, please let us know when booking.",
    },
    {
      keywords: ["artists", "team", "professional", "experience"],
      response:
        "Our team consists of professional artists with years of experience! 👩‍🎨 Founded in 2015, we've painted over 15,000 happy faces at 500+ events. Our artists are friendly, professional, and amazing with children of all ages.",
    },
    {
      keywords: ["designs", "gallery", "options", "what can you paint"],
      response:
        "We offer a huge variety of designs! 🎨 Popular options include: Butterflies, Superheroes, Animals (especially Aussie wildlife), Mermaids, Flowers, Crowns, Sports themes, and Custom designs. Check out our gallery on the website for inspiration!",
    },
    {
      keywords: ["about", "company", "history", "yabadoo"],
      response:
        "Yabadoo was founded in 2015 by passionate artists and has grown to become Australia's premier face painting service! 🌟 We've brought joy and creativity to events across the country, with 500+ successful events and 15,000+ happy faces painted!",
    },
    {
      keywords: ["how long", "duration", "time"],
      response:
        "Event duration depends on your needs! ⏰ We can provide artists for 1-2 hours for smaller parties, or full-day coverage for festivals and large events. Each face typically takes 3-10 minutes depending on design complexity.",
    },
    {
      keywords: ["school", "education", "fete", "fundraiser"],
      response:
        "We love school events! 🏫 Perfect for school fetes, fundraisers, sports days, and special celebrations. We're experienced working with large groups of children and can adapt our setup for school environments.",
    },
  ];

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: "G'day! Welcome to Yabadoo! 🎨 I'm here to help with any questions about our face painting services. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const findBestResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Find the best matching response
    let bestMatchResponse: string | null = null;
    let maxScore = 0;

    knowledgeBase.forEach((knowledge: ChatbotKnowledge) => {
      let score = 0;
      knowledge.keywords.forEach((keyword: string) => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatchResponse = knowledge.response;
      }
    });

    if (bestMatchResponse !== null && maxScore > 0) {
      return bestMatchResponse;
    }

    // Default responses for unmatched queries
    const defaultResponses: string[] = [
      "Thanks for your question! 🎨 For specific inquiries, please call us at 0416 798 698 or email info@yabadoo.au. Our team will be happy to help!",
      "I'd love to help you with that! For detailed information, our friendly team is available at 0416 798 698. You can also ask me about our services, locations, or booking process!",
      "That's a great question! While I can help with general information about Yabadoo's services, for specific details please contact us directly at info@yabadoo.au or 0416 798 698. 😊",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const handleSendMessage = (): void => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: findBestResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Chat Icon */}
      <div
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full cursor-pointer shadow-lg hover:shadow-xl transform transition-all duration-300 z-50 flex items-center justify-center ${
          isOpen ? "rotate-180" : "hover:scale-110"
        }`}
      >
        {isOpen ? (
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🎨
              </div>
              <div>
                <h3 className="font-bold text-lg">Yabadoo Support</h3>
                <p className="text-sm opacity-90">Face Painting Experts</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-white text-gray-800 shadow-sm border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isUser ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border p-3 rounded-2xl max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our face painting services..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleChat}
        ></div>
      )}

      {/* Mobile Chat Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-4 top-4 bottom-4 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🎨
              </div>
              <div>
                <h3 className="font-bold text-lg">Yabadoo Support</h3>
                <p className="text-sm opacity-90">Face Painting Experts</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.isUser
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-white text-gray-800 shadow-sm border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isUser ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border p-3 rounded-2xl max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YabadooChatbot;
