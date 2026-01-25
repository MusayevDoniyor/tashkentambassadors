import React, { useState, useEffect } from "react";
import {
  Globe,
  Linkedin,
  Send,
  Award,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  website: string;
  type: string;
  role?: string | null;
  expertise?: string | null;
  telegram?: string | null;
  linkedin?: string | null;
}

const Network: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from("partners").select("*");
        if (error) throw error;
        setPartners(data || []);
      } catch (err) {
        console.error("Error fetching partners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const ventureFunds = partners.filter((p) => p.type === "VENTURE_FUND");
  const mentors = partners.filter((p) => p.type === "MENTOR");

  if (loading)
    return (
      <div className="py-20 text-center font-black text-orange-600 animate-pulse">
        NETWORK YUKLANMOQDA...
      </div>
    );

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
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg text-center">
            Loyihangizni moliyalashtirishga tayyor bo'lgan yetakchi venchur
            fondlar
          </p>
        </div>

        <div className="relative group/carousel">
          <div
            className="flex overflow-x-auto space-x-6 pb-12 transition-all scroll-smooth no-scrollbar snap-x snap-mandatory"
            id="fund-carousel"
          >
            {ventureFunds.map((fund) => (
              <div
                key={fund.id}
                className="flex-none w-[280px] sm:w-[320px] bg-[#F8F9FA] rounded-[2.5rem] border border-gray-100 overflow-hidden snap-center flex flex-col items-center text-center p-6 sm:p-8 relative group"
                style={{
                  backgroundImage: `radial-gradient(#E5E7EB 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              >
                {/* Logo Area - Compact and Clean */}
                <div className="h-44 sm:h-48 flex items-center justify-center w-full mb-4">
                  {fund.logo ? (
                    <div className="w-40 h-40 flex items-center justify-center p-2 relative">
                      <div className="absolute inset-0 bg-white/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={fund.logo}
                        alt={fund.name}
                        className="relative max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50">
                      <span className="text-3xl font-black text-orange-200 uppercase">
                        {fund.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="w-full flex flex-col items-center">
                  <h3 className="text-xs font-black text-gray-900 mb-6 px-4 h-10 flex items-center justify-center leading-tight uppercase tracking-tight">
                    {fund.name}
                  </h3>

                  <a
                    href={fund.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-orange-600 border border-orange-100 px-7 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-orange-50 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95"
                  >
                    Ko'proq o'qish
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() =>
              document
                .getElementById("fund-carousel")
                ?.scrollBy({ left: -400, behavior: "smooth" })
            }
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-orange-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-orange-50 z-10 hidden md:flex"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("fund-carousel")
                ?.scrollBy({ left: 400, behavior: "smooth" })
            }
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-orange-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-orange-50 z-10 hidden md:flex"
          >
            <ArrowRight size={20} />
          </button>

          {ventureFunds.length === 0 && (
            <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-xs py-20">
              Fondlar topilmadi
            </p>
          )}
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
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg text-center">
            Startupingizni keyingi bosqichga olib chiqishda yordam beradigan
            tajribali mutaxassislar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 hover:shadow-2xl transition-all group flex flex-col p-4"
            >
              <div className="aspect-square relative rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl">
                {mentor.logo ? ( // Using logo field as image for mentors
                  <img
                    src={mentor.logo}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-7xl font-black text-white uppercase tracking-tighter">
                    {mentor.name.charAt(0)}
                  </span>
                )}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight leading-none uppercase">
                  {mentor.name}
                </h3>
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  {mentor.role || "Mentor"}
                </p>
                <div className="bg-orange-50 p-3 rounded-xl mb-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Expertise
                  </p>
                  <p className="text-gray-800 text-sm font-bold">
                    {mentor.expertise || "Business Development"}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {mentor.linkedin && (
                    <a
                      href={
                        mentor.linkedin.startsWith("http")
                          ? mentor.linkedin
                          : `https://${mentor.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                      title="LinkedIn Profil"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {mentor.telegram && (
                    <a
                      href={`https://t.me/${mentor.telegram.replace("@", "")}`}
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
          {mentors.length === 0 && (
            <p className="col-span-3 text-center text-gray-400">
              Mentorlar topilmadi
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Network;
