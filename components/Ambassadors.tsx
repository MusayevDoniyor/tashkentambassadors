
import React, { useState, useMemo } from 'react';
import { AMBASSADORS } from '../data';
import { MapPin, Send, Linkedin, Instagram, Search, X } from 'lucide-react';

const Ambassadors: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const districts = useMemo(() => {
    const d = Array.from(new Set(AMBASSADORS.map(a => a.district)));
    return ['Barchasi', ...d];
  }, []);

  const filteredAmbassadors = useMemo(() => {
    let results = AMBASSADORS;
    
    if (selectedDistrict !== 'Barchasi') {
      results = results.filter(a => a.district === selectedDistrict);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(a => 
        a.name.toLowerCase().includes(query) || 
        a.district.toLowerCase().includes(query)
      );
    }
    
    return results;
  }, [selectedDistrict, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          TUMAN <span className="text-orange-600">AMBASSADORLARI</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">
          Toshkent shahrining har bir tumani uchun mas'ul bo'lgan innovatsiyalar yetakchilari
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-16 space-y-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-300 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Ambassador ismini yoki tumanini qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-orange-50 rounded-2xl py-4 pl-14 pr-12 text-sm font-bold focus:outline-none focus:border-orange-500 shadow-sm transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                selectedDistrict === district 
                ? 'logo-gradient text-white shadow-lg shadow-orange-200 scale-105' 
                : 'bg-white text-gray-500 border-2 border-orange-50 hover:border-orange-200'
              }`}
            >
              {district}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAmbassadors.map((amb) => (
          <div key={amb.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 hover:shadow-2xl transition-all group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={amb.image} 
                alt={amb.name} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 logo-gradient backdrop-blur-md px-4 py-1.5 rounded-xl flex items-center space-x-2 border border-white/20 shadow-lg">
                <MapPin size={12} className="text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{amb.district}</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight leading-none">{amb.name}</h3>
              <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{amb.role}</p>
              
              <div className="flex items-center space-x-3 mt-auto">
                {amb.socials.telegram && (
                  <a href={`https://t.me/${amb.socials.telegram.replace('@', '')}`} target="_blank" className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                    <Send size={18} />
                  </a>
                )}
                {amb.socials.linkedin && (
                  <a href={amb.socials.linkedin} target="_blank" className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                    <Linkedin size={18} />
                  </a>
                )}
                {amb.socials.instagram && (
                  <a href={amb.socials.instagram} target="_blank" className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAmbassadors.length === 0 && (
        <div className="text-center py-20 bg-orange-50/50 rounded-[3rem] border-2 border-dashed border-orange-200">
          <Search size={48} className="mx-auto text-orange-200 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">Hech narsa topilmadi</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedDistrict('Barchasi');}}
            className="mt-6 text-orange-600 font-black text-xs uppercase tracking-widest hover:underline"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}
    </div>
  );
};

export default Ambassadors;
