import React, { useState, useMemo } from "react";
import { AMBASSADORS } from "@/data";
import {
  MapPin,
  Send,
  Linkedin,
  Instagram,
  Search,
  X,
  Users,
} from "lucide-react";

const Ambassadors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAmbassadors = useMemo(() => {
    if (searchQuery.trim() === "") return AMBASSADORS;
    const query = searchQuery.toLowerCase();
    return AMBASSADORS.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.role.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <Users size={14} />
          <span>Bizning Jamoa</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          TASHKENT STARTUP <span className="text-orange-600">TEAM</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg px-4">
          Toshkent startup ekotizimini rivojlantirishga mas'ul bo'lgan
          professional jamoa
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-16">
        <div className="relative max-w-md mx-auto px-4 sm:px-0">
          <Search className="absolute left-7 sm:left-5 top-1/2 -translate-y-1/2 text-orange-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Jamoa a'zosini qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-orange-50 rounded-2xl py-4 pl-14 pr-12 text-sm font-bold focus:outline-none focus:border-orange-500 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-7 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredAmbassadors.map((amb) => (
          <div
            key={amb.id}
            className="bg-white rounded-[2rem] overflow-hidden border border-orange-50 hover:shadow-xl transition-all group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={amb.image}
                alt={amb.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight leading-none group-hover:text-orange-600 transition-colors uppercase">
                {amb.name}
              </h3>
              <p className="text-orange-600 text-[9px] font-black uppercase tracking-[0.15em] mb-4 min-h-[1.5rem]">
                {amb.role}
              </p>

              <div className="flex items-center space-x-3 mt-auto">
                {amb.socials.telegram && (
                  <a
                    href={`https://t.me/${amb.socials.telegram.replace("@", "")}`}
                    target="_blank"
                    className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all"
                  >
                    <Send size={16} />
                  </a>
                )}
                {amb.socials.linkedin && (
                  <a
                    href={amb.socials.linkedin}
                    target="_blank"
                    className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAmbassadors.length === 0 && (
        <div className="text-center py-20 bg-orange-50/30 rounded-[2.5rem] border-2 border-dashed border-orange-100">
          <Search size={40} className="mx-auto text-orange-200 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Hech qanday a'zo topilmadi
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline"
          >
            Qidiruvni tozalash
          </button>
        </div>
      )}
    </div>
  );
};

export default Ambassadors;
