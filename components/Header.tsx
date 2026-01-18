
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="logo-gradient p-2 rounded-lg shadow-lg">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-gray-900 tracking-tight">
                STARTUP <span className="text-orange-600">AMBASSADORS</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">Tashkent</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
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
              className="logo-gradient text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all transform hover:scale-105 active:scale-95"
            >
              Klubga qo'shilish
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-orange-100 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg font-bold ${
                  activeTab === item.id ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://t.me/toshkent_startup_community"
              className="logo-gradient text-white text-center py-4 rounded-2xl font-black shadow-lg"
            >
              KLUBGA QO'SHILISH
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
