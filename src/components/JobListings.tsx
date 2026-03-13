import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Rocket,
  Send,
  Phone,
  Mail,
  Search,
  X,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  Plus,
} from "lucide-react";

interface JobListing {
  id: string;
  startup_name: string;
  founder_name: string;
  phone: string;
  telegram: string | null;
  email: string | null;
  description: string;
  roles_needed: string[];
  message: string | null;
  status: string;
  logo: string | null;
  created_at: string;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "Bugun";
  if (diff === 1) return "Kecha";
  if (diff < 7) return `${diff} kun oldin`;
  return d.toLocaleDateString("uz-UZ", { day: "numeric", month: "long" });
};

const isNewListing = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffHours = (now.getTime() - d.getTime()) / 3600000;
  return diffHours < 48;
};

const JobListings: React.FC = () => {
  const [listings, setListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("Barchasi");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase
        .from("job_listings")
        .select("*")
        .eq("status", "APPROVED")
        .order("created_at", { ascending: false });
      if (data) setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, []);

  const allRoles = Array.from(
    new Set(listings.flatMap((l) => l.roles_needed)),
  ).sort();

  const filtered = listings.filter((l) => {
    const matchSearch =
      !search ||
      l.startup_name.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.roles_needed.some((r) =>
        r.toLowerCase().includes(search.toLowerCase()),
      );
    const matchRole =
      selectedRole === "Barchasi" || l.roles_needed.includes(selectedRole);
    return matchSearch && matchRole;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Header Section */}
      <div className="text-center mb-16 py-10 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10 -mt-32"></div>
        <div className="inline-flex items-center space-x-2 bg-orange-100/50 text-orange-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-200">
          <Rocket size={14} />
          <span>Talantlar Platformasi</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
          STARTUP <span className="text-orange-600">E'LONLAR</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed px-6">
          Eng qiziqarli loyihalarni toping va jamoaga qo'shiling. O'z
          mutaxassisligingiz bo'yicha e'lonlarni filtrlang.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] border-2 border-orange-50 shadow-xl shadow-orange-100/20">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 w-5 h-5 transition-colors" />
          <input
            type="text"
            placeholder="Kompaniya yoki ko'nikma bo'yicha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50/50 border-2 border-transparent rounded-[1.5rem] py-4 pl-14 pr-12 text-sm font-bold focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-auto bg-gray-50/50 border-2 border-transparent rounded-[1.5rem] py-4 pl-6 pr-12 text-sm font-bold focus:outline-none focus:border-orange-500 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700 min-w-[220px]"
          >
            <option value="Barchasi">Barcha kasblar</option>
            {allRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* Results Content */}
      <div className="space-y-6">
        {!loading && (
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                {filtered.length} ta aktiv imkoniyat
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"></div>
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
              Yuklanmoqda...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-orange-50/20 rounded-[3rem] border-2 border-dashed border-orange-100/50">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-orange-300" />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">
              Hech narsa topilmadi
            </h3>
            <p className="text-gray-400 font-medium mb-8 max-w-xs mx-auto text-sm">
              Qidiruv kriteriyalarini o'zgartirib ko'ring yoki barcha e'lonlarni
              ko'ring.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedRole("Barchasi");
              }}
              className="px-8 py-3 bg-white text-orange-600 border-2 border-orange-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filtered.map((listing) => {
              const isExpanded = expandedId === listing.id;
              const isNew = isNewListing(listing.created_at);
              return (
                <div
                  key={listing.id}
                  className={`bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden group ${
                    isExpanded
                      ? "border-orange-200 shadow-2xl scale-[1.01]"
                      : "border-gray-50 hover:border-orange-100 hover:shadow-xl shadow-sm"
                  }`}
                >
                  <div className="p-1">
                    <div
                      className="flex flex-col sm:flex-row items-start sm:items-center p-7 cursor-pointer"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : listing.id)
                      }
                    >
                      {/* Company Info */}
                      <div className="flex items-center space-x-5 flex-1 min-w-0 mb-6 sm:mb-0">
                        <div className="relative shrink-0">
                          {listing.logo ? (
                            <img
                              src={listing.logo}
                              className="w-16 h-16 rounded-3xl object-cover shadow-lg shadow-orange-100 group-hover:rotate-3 transition-transform border border-orange-50 bg-white"
                              alt={listing.startup_name}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-3xl uppercase shadow-lg shadow-orange-100 group-hover:rotate-3 transition-transform">
                              {listing.startup_name.charAt(0)}
                            </div>
                          )}
                          {isNew && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-md">
                              Yangi
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-orange-600 transition-colors truncate mb-1">
                            {listing.startup_name}
                          </h2>
                          <div className="flex items-center space-x-3">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {listing.founder_name}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                            <div className="flex items-center space-x-1 text-gray-300">
                              <Clock size={12} />
                              <span className="text-[9px] font-bold">
                                {formatDate(listing.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Role Preview Tags */}
                      <div className="flex flex-wrap gap-2 items-center sm:ml-4 sm:mr-8 max-w-xs justify-start sm:justify-end">
                        {listing.roles_needed.slice(0, 2).map((role, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-orange-50/50 text-orange-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-orange-100 group-hover:bg-orange-50 transition-colors"
                          >
                            {role}
                          </span>
                        ))}
                        {listing.roles_needed.length > 2 && (
                          <span className="px-2 py-1.5 bg-gray-50 text-gray-400 rounded-xl text-[9px] font-black uppercase">
                            +{listing.roles_needed.length - 2}
                          </span>
                        )}
                        <div className="sm:hidden w-full h-px bg-gray-50 my-4"></div>
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isExpanded ? "bg-orange-600 text-white rotate-180" : "bg-gray-50 text-gray-300 group-hover:bg-orange-50 group-hover:text-orange-600"}`}
                        >
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Detail Section */}
                    {isExpanded && (
                      <div className="overflow-hidden">
                        <div className="p-8 pt-2 border-t border-gray-50 bg-gray-50/30">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-8">
                              <div>
                                <div className="flex items-center space-x-2 mb-4">
                                  <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Startup haqida batafsil
                                  </h4>
                                </div>
                                <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                                  {listing.description}
                                </p>
                              </div>

                              <div>
                                <div className="flex items-center space-x-2 mb-4">
                                  <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Mutaxassislikka talablar
                                  </h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {listing.roles_needed.map((role, i) => (
                                    <span
                                      key={i}
                                      className="px-4 py-2 bg-white text-orange-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-100 shadow-sm"
                                    >
                                      {role}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {listing.message && (
                                <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-100 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Rocket size={40} />
                                  </div>
                                  <h4 className="text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] mb-3">
                                    Asoschidan xabar
                                  </h4>
                                  <p className="text-gray-600 text-sm font-bold italic leading-relaxed">
                                    "{listing.message}"
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="space-y-6">
                              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                                  Bog'lanish uchun
                                </h4>
                                <div className="space-y-4">
                                  {listing.telegram && (
                                    <a
                                      href={`https://t.me/${listing.telegram.replace("@", "")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between group/link bg-gray-50 p-4 rounded-2xl hover:bg-orange-600 hover:text-white transition-all duration-300"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <Send
                                          size={18}
                                          className="text-orange-600 group-hover/link:text-white"
                                        />
                                        <span className="text-xs font-black uppercase tracking-widest">
                                          Telegram
                                        </span>
                                      </div>
                                      <ExternalLink
                                        size={14}
                                        className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                                      />
                                    </a>
                                  )}
                                  {listing.phone && (
                                    <a
                                      href={`tel:${listing.phone}`}
                                      className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors w-full"
                                    >
                                      <Phone
                                        size={18}
                                        className="text-gray-400"
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                                          Telefon
                                        </span>
                                        <span className="text-xs font-black text-gray-900">
                                          {listing.phone}
                                        </span>
                                      </div>
                                    </a>
                                  )}
                                  {listing.email && (
                                    <a
                                      href={`mailto:${listing.email}`}
                                      className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors w-full"
                                    >
                                      <Mail
                                        size={18}
                                        className="text-gray-400"
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                                          Email
                                        </span>
                                        <span className="text-xs font-black text-gray-900 truncate max-w-[150px]">
                                          {listing.email}
                                        </span>
                                      </div>
                                    </a>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (listing.telegram)
                                    window.open(
                                      `https://t.me/${listing.telegram.replace("@", "")}`,
                                      "_blank",
                                    );
                                  else if (listing.phone)
                                    window.open(`tel:${listing.phone}`);
                                }}
                                className="w-full bg-orange-600 text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center justify-center space-x-3"
                              >
                                <span>Loyiha bilan tanishish</span>
                                <ArrowRight size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Post CTA */}
      {!loading && (
        <div className="mt-24 p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 relative z-10">
            O'zingizni startupingiz bormi?
          </h3>
          <p className="text-gray-400 font-medium mb-10 text-lg relative z-10 max-w-xl mx-auto">
            Jamoangizga yangi talantlarni qo'shing. E'lon berish mutlaqo bepul!
          </p>
          <a
            href="/request"
            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-orange-600 hover:text-white transition-all shadow-2xl relative z-10"
          >
            <Plus size={18} />
            <span>Hozir e'lon berish</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default JobListings;
