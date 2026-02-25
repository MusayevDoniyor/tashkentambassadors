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
  CheckCircle,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: "PENDING",
        },
      ]);

      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
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
                  onClick={() => navigate("/blog")}
                  className="px-4 py-2 -ml-4 rounded-xl hover:bg-white/5 hover:text-white transition-all w-fit flex items-center"
                >
                  Blog
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

          <motion.div variants={columnVariants}>
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-orange-500">
              Bog'lanish
            </h4>
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-green-500/10 border border-green-500/20 rounded-[2rem] p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <p className="text-green-500 font-black uppercase tracking-tighter text-lg leading-tight">
                  Xabaringiz yuborildi!
                </p>
                <p className="text-gray-400 text-xs mt-2 font-medium">
                  Tez orada javob beramiz.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors font-bold"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors font-bold"
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
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none font-bold"
                ></textarea>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full logo-gradient py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-orange-950/20 disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Yuborilmoqda..." : "Yuborish"}</span>
                  <Send size={16} />
                </motion.button>
              </form>
            )}
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
