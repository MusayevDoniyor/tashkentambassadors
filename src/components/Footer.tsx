import React from "react";
import { Rocket, Send, Instagram, ArrowUp, ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-20 border-b border-white/5 pb-20"
        >
          {/* Brand */}
          <motion.div variants={columnVariants} className="space-y-8">
            <div
              className="flex items-center group cursor-pointer"
              onClick={scrollToTop}
            >
              <img
                src="/White.png"
                alt="Startup Ambassadors Tashkent"
                className="h-10 md:h-12 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              Toshkent shahar yoshlarining startup va innovatsion g'oyalarini
              rivojlantirish uchun tuzilgan yagona rasmiy platforma.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://t.me/tashkent_ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm"
              >
                <Send size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/startup.tashkent/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-all shadow-sm"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.div variants={columnVariants}>
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Bo'limlar
            </h4>
            <ul className="space-y-2 text-gray-400 font-bold text-sm">
              <li>
                <button
                  onClick={() => handleNavClick("about", "/#about")}
                  className="px-4 py-2 -ml-4 rounded-xl hover:bg-white/5 hover:text-white transition-all w-fit flex items-center"
                >
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("ambassadors", "/#ambassadors")}
                  className="px-4 py-2 -ml-4 rounded-xl hover:bg-white/5 hover:text-white transition-all w-fit flex items-center"
                >
                  Ambassadorlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("events", "/#events")}
                  className="px-4 py-2 -ml-4 rounded-xl hover:bg-white/5 hover:text-white transition-all w-fit flex items-center"
                >
                  Tadbirlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/request")}
                  className="px-4 py-2 -ml-4 rounded-xl hover:bg-white/5 hover:text-white transition-all w-fit flex items-center"
                >
                  Jamoa kerak
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Admin Contact */}
          <motion.div variants={columnVariants}>
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Admin bilan bog'lanish
            </h4>
            <p className="text-gray-400 text-sm font-medium mb-6 leading-relaxed">
              Savol, taklif yoki muammo bo'lsa — to'g'ridan-to'g'ri admin bilan
              Telegram orqali bog'laning.
            </p>
            <motion.a
              href="https://t.me/tashkent_ambassadors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-4 bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500/50 rounded-2xl p-5 transition-all group w-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <Rocket size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-white text-sm uppercase tracking-tight">
                  Admin
                </p>
                <p className="text-orange-400 text-[10px] font-black uppercase tracking-widest">
                  @tashkent_ambassadors
                </p>
              </div>
              <ExternalLink
                size={16}
                className="text-gray-500 group-hover:text-orange-400 flex-shrink-0 transition-colors"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left space-y-4 md:space-y-0"
        >
          <p>
            © 2026 Startup Ambassadors Tashkent. Yoshlar Ventures hamkorligida.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
