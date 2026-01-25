import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Asosiy" },
    { id: "about", label: "Biz haqimizda" },
    { id: "ambassadors", label: "Mentorlar" },
    { id: "network", label: "Hamkorlar" },
    { id: "events", label: "Tadbirlar" },
    { id: "blog", label: "Blog" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-white border border-gray-100 h-20 md:h-22 flex items-center shadow-xl rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] relative overflow-hidden">
        <div className="w-full px-6 md:px-10 flex justify-between items-center relative z-10">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <img
              src="/Black.png"
              alt="Logo"
              className="h-10 md:h-12 object-contain transition-transform group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav - Centered & Simple */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-bold transition-all hover:text-orange-600 relative py-2 ${
                  activeTab === item.id ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
                )}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <a
              href="https://t.me/toshkent_startup_community"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-900 font-bold hover:text-orange-600 transition-colors group"
            >
              <span className="text-sm">Bog'lanish</span>
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm group-hover:translate-x-1">
                <ArrowRight size={18} />
              </div>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-4 top-28 bg-white z-[90] md:hidden transition-all duration-300 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[1rem] rounded-bl-[1rem] border border-gray-100 shadow-2xl overflow-hidden ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-md font-black uppercase tracking-tighter text-left ${
                activeTab === item.id ? "text-orange-600" : "text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://t.me/toshkent_startup_community"
            className="mt-4 bg-orange-600 text-white p-5 rounded-tl-2xl rounded-br-2xl text-center font-black uppercase tracking-widest text-xs"
          >
            Klubga qo'shilish
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
