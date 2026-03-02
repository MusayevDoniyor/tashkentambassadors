import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="text-9xl md:text-[12rem] font-black text-orange-600/10 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertCircle size={80} className="text-orange-600 animate-pulse" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter"
      >
        Sahifa <span className="text-orange-600">topilmadi</span> 😅
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto"
      >
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
        ko'chirilgan.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 active:scale-95 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
