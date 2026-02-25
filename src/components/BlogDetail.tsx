import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, BookOpen, X, Calendar, ArrowRight } from "lucide-react";
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

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        // Try fetching by slug first
        let { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        // Fallback to id if slug not found (for old links)
        if (!postData) {
          const { data: fallbackData } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("id", slug)
            .maybeSingle();
          postData = fallbackData;
        }

        if (postError) throw postError;

        if (postData) {
          setPost(postData);

          // Increment views
          await supabase
            .from("blog_posts")
            .update({ views: (postData.views || 0) + 1 })
            .eq("id", postData.id);

          // Fetch related posts
          const { data: relatedData } = await supabase
            .from("blog_posts")
            .select("*")
            .neq("id", postData.id)
            .limit(3);

          setRelatedPosts(relatedData || []);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    window.scrollTo(0, 0);
  }, [slug]);

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
    <div className="min-h-screen bg-[#FBFCFE] flex flex-col relative">
      {/* Detailed View Header / Breadcrumbs - Fixed Z-Index and Sticky */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-12 z-40 shadow-sm rounded-2xl mx-4 lg:mx-8 my-4 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-900 hover:text-orange-600 transition-all font-black uppercase text-[10px] tracking-widest bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 group"
          >
            <X
              size={18}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Orqaga</span>
          </button>
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Asosiy
            </Link>
            <span>/</span>
            <Link to="/#blog" className="hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-orange-600 truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link nusxalandi!");
              }
            }}
            className="flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-sm"
          >
            <ArrowUpRight size={16} />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      <div className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="bg-orange-600 text-white text-[10px] uppercase tracking-[0.2em] font-black px-5 py-2.5 rounded-xl shadow-lg shadow-orange-100">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-300" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 border-l border-gray-100 pl-6">
                      <BookOpen size={14} className="text-gray-300" />
                      <span>{(post.views || 0) + 127} marta ko'rildi</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.05] mb-10 uppercase">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-8 mb-16 lg:max-w-3xl">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              <div className="w-full aspect-[16/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden mb-16 shadow-2xl shadow-orange-50 border border-gray-100 bg-gray-50">
                {post.image ? (
                  <img
                    src={post.image}
                    className="w-full h-full object-cover"
                    alt={post.title}
                  />
                ) : (
                  <div className="w-full h-full logo-gradient"></div>
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

              {/* CTA Section with Decorative Grid */}
              <div
                className="mt-24 p-10 md:p-14 text-white text-center md:text-left relative overflow-hidden rounded-[3rem] shadow-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, #F9B513, #EA601E)",
                  backgroundSize: "100% 130%",
                  backgroundPosition: "top center",
                }}
              >
                <div className="stories-random-bg">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className={`stories-random-cell ${Math.random() > 0.8 ? "active" : ""}`}
                    />
                  ))}
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter">
                      YANGILIKLARDAN BOXABAR BO'LING
                    </h3>
                    <p className="text-white/80 font-medium text-lg">
                      Haftalik eng sara maqolalar va startap olamidagi
                      yangiliklarni kanalimizda kuzatib boring!
                    </p>
                  </div>
                  <a
                    href="https://t.me/tashkent_ambassadors"
                    target="_blank"
                    className="flex-shrink-0 inline-flex items-center space-x-4 px-10 py-5 bg-white text-orange-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 hover:-translate-y-1 group"
                  >
                    <span>KANALGA QO'SHILISH</span>
                    <ArrowUpRight
                      size={22}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-40 space-y-10">
                {/* Author Card - Refined */}
                <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-50 pb-4">
                    Muallif:
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-black text-gray-900 uppercase tracking-tight text-xl leading-none">
                        {post.author}
                      </h3>
                      <div className="w-12 h-1 bg-orange-600 rounded-full mt-3"></div>
                    </div>
                  </div>
                </div>

                {/* Recommended Posts */}
                <div className="bg-[#F8FAFC] p-8 md:p-10 rounded-[3rem] border border-gray-100">
                  <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] mb-10 text-center">
                    TAVSIYA ETAMIZ:
                  </h4>
                  <div className="space-y-10">
                    {relatedPosts.map((rec) => (
                      <Link
                        key={rec.id}
                        to={`/blog/${rec.slug || rec.id}`}
                        className="group flex flex-col gap-4"
                      >
                        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                          {rec.image && (
                            <img
                              src={rec.image}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">
                            {rec.category}
                          </span>
                          <h5 className="font-black text-gray-900 text-sm uppercase tracking-tight leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                            {rec.title}
                          </h5>
                          <span className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">
                            {rec.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/blog"
                    className="w-full mt-12 py-5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-900 uppercase tracking-widest hover:border-orange-600 hover:text-orange-600 transition-all flex items-center justify-center space-x-3 shadow-sm group"
                  >
                    <span>Barcha maqolalar</span>
                    <ArrowRight
                      size={16}
                      className="text-orange-600 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
