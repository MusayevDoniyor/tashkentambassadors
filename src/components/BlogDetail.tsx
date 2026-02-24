import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, BookOpen, X, Calendar, ArrowRight } from "lucide-react";
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

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // Fetch current post
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();

        if (postError) throw postError;
        setPost(postData);

        // Fetch related posts (limited to 3)
        const { data: relatedData } = await supabase
          .from("blog_posts")
          .select("*")
          .neq("id", id)
          .limit(3);

        setRelatedPosts(relatedData || []);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-orange-600 font-black animate-pulse uppercase tracking-widest text-xl">
          Maqola yuklanmoqda...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          Maqola topilmadi 😅
        </h2>
        <Link
          to="/#blog"
          className="text-orange-600 font-black uppercase tracking-widest text-sm hover:underline"
        >
          Blogga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFE] flex flex-col pt-8">
      {/* Detailed View Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-[100px] z-[100] shadow-sm rounded-2xl mx-4 lg:mx-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-900 hover:text-orange-600 transition-all font-black uppercase text-[10px] tracking-widest bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100"
          >
            <X size={18} />
            <span>Orqaga</span>
          </button>
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-gray-900">
              Asosiy
            </Link>
            <span>/</span>
            <Link to="/#blog" className="hover:text-gray-900">
              Blog
            </Link>
            <span>/</span>
            <span className="text-orange-600 truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
            <ArrowUpRight size={16} />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      <div className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-orange-600 text-white text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-xl shadow-lg shadow-orange-100">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={14} className="text-gray-300" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 border-l border-gray-100 pl-4">
                      <BookOpen size={14} className="text-gray-300" />
                      <span>127 marta ko'rildi</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-8 uppercase">
                  {post.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-6 mb-12">
                  {post.excerpt}
                </p>
              </div>

              {/* Featured Image */}
              <div className="w-full aspect-[16/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl border border-gray-100 bg-gray-50">
                {post.image ? (
                  <img
                    src={post.image}
                    className="w-full h-full object-cover"
                    alt={post.title}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                )}
              </div>

              {/* Content Body */}
              <div className="prose prose-orange prose-lg md:prose-xl max-w-none">
                <div
                  className="text-gray-800 font-medium leading-[1.8] space-y-8 text-lg blog-content-styles"
                  dangerouslySetInnerHTML={{
                    __html: post.content.includes("<")
                      ? post.content
                      : post.content
                          .split("\n")
                          .map((para) => `<p>${para}</p>`)
                          .join(""),
                  }}
                />
              </div>

              {/* Call to action inside post */}
              <div className="mt-20 p-8 md:p-12 bg-white rounded-[3rem] border border-orange-100 shadow-xl shadow-orange-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                      Maqola foydali bo'ldimi?
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Eng so'nggi yangiliklar va maqolalarni kanalimizda kuzatib
                      boring!
                    </p>
                  </div>
                  <a
                    href="https://t.me/tashkent_ambassadors"
                    target="_blank"
                    className="flex-shrink-0 inline-flex items-center space-x-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg active:scale-95"
                  >
                    <span>Kanalga a'zo bo'lish</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8 pb-20">
              {/* Author Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                  Muallif:
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shadow-sm font-black text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 uppercase tracking-tight text-lg leading-tight">
                      {post.author}
                    </h3>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-widest mt-1">
                      Ambassador
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500 font-medium leading-relaxed">
                  Tashkent Startup Ambassadors jamoasi a'zosi. Startuplar va
                  innovatsiyalar sohasida ekspert.
                </p>
              </div>

              {/* Recommended Posts */}
              <div className="bg-[#F8FAFC] p-8 rounded-[2.5rem] border border-gray-100">
                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] mb-6">
                  Tavsiya etamiz:
                </h4>
                <div className="space-y-6">
                  {relatedPosts.map((rec) => (
                    <Link
                      key={rec.id}
                      to={`/blog/${rec.id}`}
                      className="group flex gap-4"
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                        {rec.image && (
                          <img
                            src={rec.image}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h5 className="font-black text-gray-900 text-xs uppercase tracking-tight leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                          {rec.title}
                        </h5>
                        <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                          {rec.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/#blog"
                  className="w-full mt-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-900 uppercase tracking-widest hover:border-orange-200 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Barcha maqolalar</span>
                  <ArrowRight size={14} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
