
import React from 'react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      {/* Background Decor - Logotip ranglaridan ilhomlangan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-100 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-100 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-5 py-2 rounded-full text-sm font-bold mb-10 border border-orange-100 animate-pulse">
            <Sparkles size={16} />
            <span>Toshkent shahar Startup Ambassadorlari Hamjamiyati</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.9]">
            STARTUP <span className="text-orange-600">AMBASSADORS</span> <br/>
            <span className="text-amber-500 italic">TASHKENT</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            G'oyalaringizni Venture fondlarga taqdim eting, bilimingizni oshiring va Toshkentning eng nufuzli startup ekotizimi a'zosiga aylaning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://t.me/tashkent_innovators"
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 logo-gradient text-white px-10 py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-orange-200 btn-3d"
            >
              <span>KANALGA QO'SHILISH</span>
              <Send size={20} />
            </a>
            <button 
              onClick={() => document.getElementById('ambassadors')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-900 border-2 border-orange-100 px-10 py-5 rounded-2xl font-black text-lg hover:border-orange-500 transition-all shadow-sm"
            >
              <span>BIZNING JAMOA</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Tumanlar', val: '12' },
            { label: 'Ambassadorlar', val: '24+' },
            { label: 'Startuplar', val: '150+' },
            { label: 'Venture Fondlar', val: '10+' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-[2rem] bg-white border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm hover:shadow-lg">
              <div className="text-4xl font-black text-gray-900 mb-2">{stat.val}</div>
              <div className="text-xs text-orange-600 font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
