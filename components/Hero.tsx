
import React from 'react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] bg-orange-100 rounded-full blur-[80px] md:blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[50%] bg-amber-100 rounded-full blur-[80px] md:blur-[120px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-bold mb-6 md:mb-10 border border-orange-100 animate-pulse">
            <Sparkles size={14} className="md:w-4 md:h-4" />
            <span className="uppercase tracking-wide">Toshkent Startup Ambassadors</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
            STARTUP <span className="text-orange-600">AMBASSADORS</span> <br className="hidden sm:block"/>
            <span className="text-amber-500 italic block sm:inline mt-2 sm:mt-0"> TASHKENT</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-medium px-4">
            G'oyalaringizni Venture fondlarga taqdim eting, bilimingizni oshiring va Toshkentning eng nufuzli startup ekotizimi a'zosiga aylaning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <a 
              href="https://t.me/toshkent_startup_community"
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 logo-gradient text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:brightness-110 transition-all shadow-xl shadow-orange-200 btn-3d"
            >
              <span>QO'SHILISH</span>
              <Send size={18} />
            </a>
            <button 
              onClick={() => {
                const element = document.getElementById('ambassadors');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-900 border-2 border-orange-100 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:border-orange-500 transition-all shadow-sm"
            >
              <span>BIZNING JAMOA</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Tumanlar', val: '12' },
            { label: 'Ambassadorlar', val: '24+' },
            { label: 'Startuplar', val: '150+' },
            { label: 'Hamkorlar', val: '10+' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm">
              <div className="text-2xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2">{stat.val}</div>
              <div className="text-[8px] md:text-[10px] text-orange-600 font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
