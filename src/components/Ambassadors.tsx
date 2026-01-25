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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-center">
        {filteredAmbassadors.map((amb) => (
          <div
            key={amb.id}
            className="group flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="relative mb-8">
              {/* Outer Glow/Ring */}
              <div className="absolute -inset-4 bg-orange-100 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 blur-xl"></div>

              {/* Initials Avatar Replacement */}
              <div className="relative w-48 h-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 font-black text-white text-6xl uppercase tracking-tighter">
                {amb.name.charAt(0)}
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center z-20 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                <Users
                  size={20}
                  className="text-orange-600 group-hover:text-white"
                />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase group-hover:text-orange-600 transition-colors">
                {amb.name}
              </h3>
              <div className="flex flex-col items-center space-y-3">
                <p className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
                  {amb.role}
                </p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  {amb.district} District
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-4">
                {amb.socials.telegram && (
                  <a
                    href={`https://t.me/${amb.socials.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all duration-300"
                  >
                    <Send size={18} />
                  </a>
                )}
                {amb.socials.linkedin && (
                  <a
                    href={amb.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Linkedin size={18} />
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
