
import React, { useState } from 'react';
import { Rocket, Send, Instagram, Linkedin, Mail, Phone, ArrowUp, User } from 'lucide-react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form Submission:', formData);
    alert('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/5 pb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={scrollToTop}>
              <div className="logo-gradient p-2.5 rounded-2xl group-hover:rotate-12 transition-transform">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">STARTUP</span>
                <span className="text-orange-500 font-black text-lg leading-none uppercase">Ambassadors</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              Toshkent shahar yoshlarining startup va innovatsion g'oyalarini rivojlantirish uchun tuzilgan yagona rasmiy platforma.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://t.me/toshkent_startup_community" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm">
                <Send size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">Bo'limlar</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition-colors">Biz haqimizda</button></li>
              <li><button onClick={() => scrollToSection('ambassadors')} className="hover:text-orange-500 transition-colors">Ambassadorlar</button></li>
              <li><button onClick={() => scrollToSection('network')} className="hover:text-orange-500 transition-colors">Hamkor Fondlar</button></li>
              <li><button onClick={() => scrollToSection('events')} className="hover:text-orange-500 transition-colors">Tadbirlar</button></li>
              <li><button onClick={() => scrollToSection('blog')} className="hover:text-orange-500 transition-colors">Bilimlar bazasi</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">Bog'lanish</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Ismingiz"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                <input 
                  type="email" 
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <textarea 
                placeholder="Xabaringiz"
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
              ></textarea>
              <button 
                type="submit"
                className="w-full logo-gradient py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <span>Yuborish</span>
                <Send size={14} />
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">Tezkor havolalar</h4>
            <div className="grid grid-cols-1 gap-3">
              <a 
                href="https://t.me/toshkent_startup_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-orange-600 p-4 rounded-2xl transition-all border border-white/5 font-black text-[10px] uppercase tracking-widest text-center"
              >
                KANALIMIZGA QO'SHILISH
              </a>
              <a 
                href="https://t.me/startup_community_rules"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-orange-600 p-4 rounded-2xl transition-all border border-white/5 font-black text-[10px] uppercase tracking-widest text-center"
              >
                KLUB QOIDALARI
              </a>
            </div>
            <ul className="mt-8 space-y-4 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
              <li className="flex items-center space-x-3">
                <Phone size={14} className="text-orange-500" />
                <span>+998 (71) 200-00-00</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={14} className="text-orange-500" />
                <span>info@sa-tashkent.uz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© 2024 Startup Ambassadors Tashkent. Yoshlar Ventures hamkorligida.</p>
          <div className="mt-8 md:mt-0 flex items-center space-x-8">
            <button onClick={scrollToTop} className="flex items-center space-x-2 text-orange-500 hover:text-white transition-colors">
              <ArrowUp size={14} />
              <span>Yuqoriga</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
