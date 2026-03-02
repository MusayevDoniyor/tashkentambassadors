import React from "react";
import { Send, Instagram, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (id: string, path: string) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-[#1a1c22] text-white pt-20 pb-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <img
              src="/White.png"
              alt="Startup Ambassadors Tashkent"
              className="h-10 object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Toshkent shahar yoshlarining startup va innovatsion g'oyalarini
              rivojlantirish uchun tuzilgan yagona rasmiy platforma.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Navigatsiya</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick("home", "/")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Asosiy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("about", "/#about")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("ambassadors", "/#ambassadors")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Ambassadorlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("events", "/#events")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Tadbirlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/request")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Jamoa kerak
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">
              Ijtimoiy tarmoqlar
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a
                  href="https://t.me/tashkent_ambassadors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
                >
                  <Send size={18} />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/startup.tashkent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Bog'lanish</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a
                  href="https://t.me/ambassadorsadmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>@ambassadorsadmin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>
            © 2026 Startup Ambassadors Tashkent. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>

      {/* Floating Chat Button */}
      {/* <motion.a
        href="https://t.me/ambassadorsadmin"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[100] bg-white rounded-full p-1 shadow-2xl flex items-center space-x-3 group"
      >
        <div className="bg-orange-600 rounded-full p-3 text-white transition-colors group-hover:bg-orange-700">
          <MessageCircle size={20} />
        </div>
        <span className="pr-5 font-black text-gray-900 text-xs uppercase tracking-tight hidden sm:block">
          Bog'lanish
        </span>
      </motion.a> */}
    </footer>
  );
};

export default Footer;
