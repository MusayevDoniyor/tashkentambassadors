import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="text-9xl md:text-[12rem] font-black text-orange-600/10 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertCircle size={80} className="text-orange-600" />
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
        Sahifa <span className="text-orange-600">topilmadi</span> 😅
      </h1>

      <p className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
        ko'chirilgan.
      </p>

      <div>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 active:scale-95 group"
        >
          <ArrowLeft size={18} />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
