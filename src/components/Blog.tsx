import React, { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string | null;
  author: string;
  views?: number;
}

const CATEGORIES = [
  "Barchasi",
  "Startup",
  "Yangiliklar",
  "Tadbirlar",
  "Loyihalar",
  "Intervyular",
  "Ekotizim",
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Barchasi");

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

  const filteredPosts =
    activeCategory === "Barchasi"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  if (loading)
    return (
      <div className="py-20 text-center font-black text-orange-600 animate-pulse">
        BLOG YUKLANMOQDA...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Featured Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div className="flex items-center space-x-2 text-sm font-bold text-gray-400">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Bosh sahifa
          </Link>
          <span>→</span>
          <span className="text-orange-600">Blog</span>
        </div>
      </div>

      {/* Hero Featured Post */}
      {featuredPost && activeCategory === "Barchasi" && (
        <Link
          to={`/blog/${featuredPost.slug || featuredPost.id}`}
          className="group grid grid-cols-1 lg:grid-cols-2 mb-20 bg-white rounded-[3rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 min-h-[320px] max-w-7xl mx-auto"
        >
          <div className="p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center space-x-6 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {featuredPost.date}
              </span>
              <div className="flex items-center space-x-2 text-gray-400 text-[10px] font-bold">
                <BookOpen size={14} />
                <span>{(featuredPost.views || 0) + 1} marta</span>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors uppercase tracking-tighter leading-tight">
              {featuredPost.title}
            </h2>

            <div className="flex items-center space-x-2 text-[10px] text-gray-500 mb-6 font-medium">
              <span>Muallif:</span>
              <span className="font-bold text-gray-900">
                {featuredPost.author}
              </span>
            </div>
            <div className="inline-block w-fit">
              <span className="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-[0.2em] border border-orange-100">
                {featuredPost.category}
              </span>
            </div>
          </div>
          <div className="h-full max-h-[400px] ">
            {featuredPost.image ? (
              <img
                src={featuredPost.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                alt={featuredPost.title}
              />
            ) : (
              <div className="w-full h-full logo-gradient"></div>
            )}
          </div>
        </Link>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all ${
              activeCategory === cat
                ? "bg-orange-600 text-white shadow-lg shadow-orange-100 scale-105"
                : "bg-gray-50 text-gray-500 hover:bg-white hover:shadow-md border border-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 text-left">
        {(activeCategory === "Barchasi" ? otherPosts : filteredPosts).length >
        0 ? (
          (activeCategory === "Barchasi" ? otherPosts : filteredPosts).map(
            (post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug || post.id}`}
                className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full logo-gradient"></div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-orange-600 text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-xl shadow-lg border border-white/50">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {post.date}
                    </span>
                    <div className="flex items-center space-x-1.5 text-gray-400 text-[10px] font-bold">
                      <BookOpen size={12} />
                      <span>{(post.views || 0) + 127}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-orange-600 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span>Batafsil</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ),
          )
        ) : (
          <div className="col-span-full py-20 text-center">
            <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-gray-400 font-bold uppercase tracking-widest">
              Ushbu kategoriyada maqolalar topilmadi
            </h3>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div
        className="rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden mb-20 shadow-2xl"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #F9B513, #EA601E)",
          backgroundSize: "100% 130%",
          backgroundPosition: "top center",
        }}
      >
        <div className="stories-random-bg">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={`stories-random-cell ${
                Math.random() > 0.8 ? "active" : ""
              }`}
            />
          ))}
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
            YANGILIKLARDAN BOXABAR BO'LING
          </h2>
          <p className="text-lg opacity-90 mb-10 font-bold max-w-2xl mx-auto">
            Haftalik eng sara maqolalar va tadbirlar ro'yxatini Telegram
            kanalimizda kuzatib boring!
          </p>
          <a
            href="https://t.me/tashkent_ambassadors"
            target="_blank"
            className="inline-flex items-center space-x-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all hover:pr-12 group"
          >
            <span>KANALGA QO'SHILISH</span>
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;
