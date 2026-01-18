
import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'about', label: 'Biz haqimizda' },
    { id: 'ambassadors', label: 'Ambassadorlar' },
    { id: 'network', label: 'Hamkorlar' },
    { id: 'events', label: 'Tadbirlar' },
    { id: 'blog', label: 'Blog' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
            <div className="logo-gradient p-1.5 md:p-2 rounded-lg shadow-md">
              <Rocket className="text-white w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm md:text-xl font-black text-gray-900 tracking-tight">
                STARTUP <span className="text-orange-600">AMBASSADORS</span>
              </span>
              <span className="text-[7px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] text-gray-400 uppercase">Tashkent</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold transition-colors ${
                  activeTab === item.id ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://t.me/toshkent_startup_community"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-gradient text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all transform hover:scale-105 active:scale-95"
            >
              Qo'shilish
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 p-2 hover:bg-orange-50 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-orange-100 overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-1 px-4 py-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-3 px-4 rounded-xl text-base font-bold transition-colors ${
                  activeTab === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <a
                href="https://t.me/toshkent_startup_community"
                className="logo-gradient text-white text-center block py-4 rounded-2xl font-black shadow-lg text-sm uppercase tracking-widest"
              >
                KLUBGA QO'SHILISH
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
