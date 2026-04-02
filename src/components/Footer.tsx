import { Send, Instagram, ExternalLink, MessageCircle, Linkedin } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1a1c22] text-white pt-20 pb-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src="/White.png"
                alt="Startup Ambassadors Tashkent"
                className="h-10 object-contain"
              />
            </Link>
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
                <Link
                  to="/"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-orange-500 transition-colors"
                >
                  Asosiy
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleScroll("about");
                    }
                  }}
                  className="hover:text-orange-500 transition-colors"
                >
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link
                  to="/#ambassadors"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleScroll("ambassadors");
                    }
                  }}
                  className="hover:text-orange-500 transition-colors"
                >
                  Ambassadorlar
                </Link>
              </li>
              <li>
                <Link
                  to="/#events"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleScroll("events");
                    }
                  }}
                  className="hover:text-orange-500 transition-colors"
                >
                  Tadbirlar
                </Link>
              </li>
              <li>
                <Link
                  to="/request"
                  className="hover:text-orange-500 transition-colors"
                >
                  Jamoa kerak
                </Link>
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
              <li>
                <a
                  href="https://www.linkedin.com/company/startup-ambassadors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
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
    </footer>
  );
};

export default Footer;
