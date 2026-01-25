import React, { useState } from "react";
import {
  Rocket,
  Send,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowUp,
  User,
} from "lucide-react";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submission:", formData);
    alert("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blur - Pointer events none prevents overflow issues */}
      <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 border-b border-white/5 pb-20">
          <div className="space-y-8">
            <div
              className="flex items-center group cursor-pointer"
              onClick={scrollToTop}
            >
              <img
                src="/White.png"
                alt="Startup Ambassadors Tashkent"
                className="h-12 object-contain group-hover:opacity-90 transition-opacity"
              />
            </div>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              Toshkent shahar yoshlarining startup va innovatsion g'oyalarini
              rivojlantirish uchun tuzilgan yagona rasmiy platforma.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/toshkent_startup_community"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm"
              >
                <Send size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Bo'limlar
            </h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ambassadors")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Ambassadorlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("network")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Hamkor Fondlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("events")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Tadbirlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Bilimlar bazasi
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Bog'lanish
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Ismingiz"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <textarea
                placeholder="Xabaringiz"
                required
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
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
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Tezkor havolalar
            </h4>
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
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left space-y-4 md:space-y-0">
          <p>
            © 2026 Startup Ambassadors Tashkent. Yoshlar Ventures hamkorligida.
          </p>
          <div className="flex items-center space-x-8">
            {/* Link removed - replaced by floating button */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
