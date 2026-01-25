import React, { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, X, Calendar } from "lucide-react";
import { supabase } from "../lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string | null;
  author: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  if (loading)
    return (
      <div className="py-20 text-center font-black text-orange-600 animate-pulse">
        BLOG YUKLANMOQDA...
      </div>
    );

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
          Startup olamiga oid eng so'nggi yangiliklar va mentorlarimiz
          tavsiyalari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center bg-gray-50">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90"></div>
              )}
              {/* <div className="relative z-10 text-white flex flex-col items-center">
                <BookOpen size={40} className="mb-2 opacity-50" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {post.category}
                </span>
              </div> */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-xl shadow-lg border border-white/50">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 flex flex-col flex-1">
              <div className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest">
                {post.date}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-medium leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <button className="flex items-center space-x-2 text-gray-900 font-black uppercase tracking-widest text-xs group-hover:text-orange-600 transition-colors">
                  <span>Batafsil o'qish</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}

        <div className="flex flex-col h-full logo-gradient rounded-[2.5rem] p-8 sm:p-10 text-white shadow-xl shadow-orange-100 relative overflow-hidden group min-h-[350px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-black mb-6 leading-tight uppercase tracking-tighter">
              YANGILIKLARGA OBUNA BO'LING
            </h3>
            <p className="text-sm opacity-90 mb-8 font-bold leading-relaxed max-w-xs">
              Haftalik eng sara maqolalar va tadbirlar ro'yxatini Telegram
              orqali birinchilardan bo'lib oling!
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

      {/* Full-Screen Blog Detail Overlay */}
      {selectedPost && (
        <div className="fixed inset-0 z-[150] bg-white animate-in fade-in duration-300 flex flex-col">
          {/* Sticky Header for Detail View */}
          <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center space-x-2 text-gray-500 hover:text-orange-600 transition-colors font-black uppercase text-[10px] tracking-widest"
            >
              <X size={20} />
              <span>Orqaga Qaytish</span>
            </button>
            <div className="hidden sm:block text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">
              Startup Ambassadors Blog
            </div>
            <div className="w-20"></div> {/* Spacer */}
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            <div className="max-w-5xl mx-auto px-6 pt-10 sm:pt-20">
              {/* Cover Image - Larger and Cinematic */}
              <div className="w-full h-[300px] sm:h-[550px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-2 border-orange-50 bg-gray-50 flex items-center justify-center">
                {selectedPost.image ? (
                  <img
                    src={selectedPost.image}
                    className="w-full h-full object-cover"
                    alt={selectedPost.title}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                )}
              </div>

              <div className="mb-10">
                <span className="inline-block bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-100">
                  {selectedPost.category}
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-8">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Nashr etilgan sana
                    </p>
                    <p className="font-bold text-gray-900 uppercase text-xs">
                      {selectedPost.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-orange prose-xl max-w-none">
                <div className="text-gray-700 font-medium leading-relaxed space-y-6 text-lg sm:text-xl">
                  {selectedPost.content.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="mt-20 p-10 bg-orange-50 rounded-[3rem] text-center border-2 border-orange-100">
                <h3 className="text-2xl font-black text-orange-900 mb-4 uppercase tracking-tighter">
                  Maqola yoqdimi?
                </h3>
                <p className="text-orange-800 mb-8 font-medium">
                  Boshqa foydali maqolalar va yangiliklarni kanalimizda kuzatib
                  boring!
                </p>
                <a
                  href="https://t.me/toshkent_startup_community"
                  target="_blank"
                  className="inline-flex items-center space-x-3 px-10 py-5 bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-200"
                >
                  <span>KANALGA QO'SHILISH</span>
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
