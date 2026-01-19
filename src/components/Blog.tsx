
import React from 'react';
import { BLOG_POSTS } from '../data';
import { ArrowUpRight, BookOpen } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <BookOpen size={14} />
          <span>Bilimlar Bazasi</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
          FOYDALI <span className="text-orange-600">MAQOLALAR</span> ✍️
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
          Startup olamiga oid eng so'nggi yangiliklar va mentorlarimiz tavsiyalari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 hover:shadow-2xl transition-all group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-orange-600 text-white text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-xl shadow-lg shadow-orange-900/20">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 sm:p-10 flex flex-col flex-1">
              <div className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest">{post.date} • {post.author}</div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-medium leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <a 
                  href="https://t.me/toshkent_startup_community" 
                  target="_blank"
                  className="flex items-center space-x-2 text-gray-900 font-black uppercase tracking-widest text-xs group-hover:text-orange-600 transition-colors"
                >
                  <span>Batafsil o'qish</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </article>
        ))}
        
        <div className="flex flex-col h-full logo-gradient rounded-[2.5rem] p-8 sm:p-10 text-white shadow-xl shadow-orange-100 relative overflow-hidden group min-h-[350px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-black mb-6 leading-tight uppercase tracking-tighter">YANGILIKLARGA OBUNA BO'LING</h3>
            <p className="text-sm opacity-90 mb-8 font-bold leading-relaxed max-w-xs">
              Haftalik eng sara maqolalar va tadbirlar ro'yxatini Telegram orqali birinchilardan bo'lib oling!
            </p>
            <div className="mt-auto space-y-4">
              <a 
                href="https://t.me/toshkent_startup_community"
                target="_blank"
                className="block bg-white text-orange-600 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center shadow-lg hover:bg-gray-50 transition-all active:scale-95"
              >
                KANALGA QO'SHILISH
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
