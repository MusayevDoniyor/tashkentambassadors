
import React from 'react';
import { VENTURE_FUNDS, MENTORS } from '../data';
import { Globe, Linkedin, Send, Award, ExternalLink } from 'lucide-react';

const Network: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Venture Funds Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Award size={14} />
            <span>Hamkor Fondlar</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
            VENCHUR <span className="text-orange-600">NETWORK</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
            Loyihangizni moliyalashtirishga tayyor bo'lgan yetakchi venchur fondlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VENTURE_FUNDS.map((fund) => (
            <a 
              key={fund.id} 
              href={fund.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-[2.5rem] border border-orange-50 hover:border-orange-500 hover:shadow-2xl transition-all flex flex-col items-center text-center"
            >
              <div className="h-24 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <img 
                  src={fund.logo} 
                  alt={fund.name} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span class="text-2xl font-black text-orange-600 uppercase tracking-tighter">${fund.name}</span>`;
                  }}
                  className="max-h-full max-w-[180px] object-contain" 
                />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{fund.name}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                {fund.description}
              </p>
              <div className="flex items-center space-x-2 text-orange-600 font-black text-[10px] uppercase tracking-widest">
                <span>Saytga o'tish</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mentors Section */}
      <div>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Award size={14} />
            <span>Ekspert Mentorlar</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
            STRATEGIK <span className="text-orange-600">MENTORLAR</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
            Startupingizni keyingi bosqichga olib chiqishda yordam beradigan tajribali mutaxassislar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {MENTORS.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 hover:shadow-2xl transition-all group flex flex-col p-4">
              <div className="aspect-square relative rounded-[2rem] overflow-hidden mb-6">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight leading-none uppercase">{mentor.name}</h3>
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{mentor.role}</p>
                <div className="bg-orange-50 p-3 rounded-xl mb-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Expertise</p>
                  <p className="text-gray-800 text-sm font-bold">{mentor.expertise}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {mentor.socials.linkedin && (
                    <a 
                      href={mentor.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                      title="LinkedIn Profil"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {mentor.socials.telegram && (
                    <a 
                      href={`https://t.me/${mentor.socials.telegram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                      title="Telegram"
                    >
                      <Send size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Network;
