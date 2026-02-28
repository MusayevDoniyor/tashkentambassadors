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
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

  // Collect all unique roles from listings
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <Rocket size={14} />
          <span>Aktiv E'lonlar</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          STARTUP <span className="text-orange-600">E'LONLAR</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">
          Startuplar tomonidan berilgan ish e'lonlarini ko'ring va o'zingizga
          mos loyihaga qo'shiling
        </p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Startup yoki kasb bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-10 text-sm font-bold focus:outline-none focus:border-orange-400 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-white border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:outline-none focus:border-orange-400 transition-all shadow-sm appearance-none cursor-pointer text-gray-600 min-w-[200px]"
        >
          <option value="Barchasi">Barcha kasblar</option>
          {allRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Count */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-black text-gray-500 uppercase tracking-widest">
            {filtered.length} ta aktiv e'lon
          </span>
        </motion.div>
      )}

      {/* Listings */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-orange-50/30 rounded-[2.5rem] border-2 border-dashed border-orange-100"
        >
          <Rocket size={48} className="mx-auto text-orange-200 mb-4" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-1">
            E'lonlar topilmadi
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedRole("Barchasi");
            }}
            className="mt-3 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline"
          >
            Filtrlarni tozalash
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((listing) => {
            const isExpanded = expandedId === listing.id;
            return (
              <motion.div
                key={listing.id}
                variants={cardVariants}
                layout
                className="bg-white rounded-[2rem] border-2 border-gray-50 hover:border-orange-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                {/* Card header — clickable to expand */}
                <div
                  className="flex items-start justify-between p-6 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : listing.id)}
                >
                  <div className="flex items-start space-x-4 min-w-0">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-2xl uppercase flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      {listing.startup_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter group-hover:text-orange-600 transition-colors truncate">
                        {listing.startup_name}
                      </h2>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                        {listing.founder_name}
                      </p>
                      {/* Role tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {listing.roles_needed.slice(0, 3).map((role, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100"
                          >
                            {role}
                          </span>
                        ))}
                        {listing.roles_needed.length > 3 && (
                          <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100">
                            +{listing.roles_needed.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Clock size={10} />
                        <span className="text-[9px] font-bold">
                          {formatDate(listing.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-50 space-y-5">
                        {/* Description */}
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            Startup haqida
                          </p>
                          <p className="text-gray-700 text-sm font-medium leading-relaxed">
                            {listing.description}
                          </p>
                        </div>

                        {/* All roles */}
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            Qidirilayotgan mutaxassislar
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {listing.roles_needed.map((role, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Additional notes */}
                        {listing.message && (
                          <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-100">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
                              Qo'shimcha
                            </p>
                            <p className="text-gray-600 text-sm font-medium italic leading-relaxed">
                              "{listing.message}"
                            </p>
                          </div>
                        )}

                        {/* Contact CTA */}
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            Bog'lanish
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {listing.telegram && (
                              <a
                                href={`https://t.me/${listing.telegram.replace("@", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-700 active:scale-95 transition-all shadow-sm"
                              >
                                <Send size={14} />
                                <span>
                                  {listing.telegram.startsWith("@")
                                    ? listing.telegram
                                    : `@${listing.telegram}`}
                                </span>
                                <ExternalLink size={12} />
                              </a>
                            )}
                            {listing.phone && (
                              <a
                                href={`tel:${listing.phone}`}
                                className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:border-orange-400 hover:text-orange-600 active:scale-95 transition-all"
                              >
                                <Phone size={14} />
                                <span>{listing.phone}</span>
                              </a>
                            )}
                            {listing.email && (
                              <a
                                href={`mailto:${listing.email}`}
                                className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:border-orange-400 hover:text-orange-600 active:scale-95 transition-all"
                              >
                                <Mail size={14} />
                                <span>{listing.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Post your own CTA */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] border border-orange-100"
        >
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-3">
            Startupingiz uchun jamoa kerakmi?
          </h3>
          <p className="text-gray-500 font-medium mb-6 text-sm">
            E'lon bering — admin tasdiqlashi bilanoq e'loningiz shu sahifada
            ko'rinadi
          </p>
          <a
            href="/request"
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 active:scale-95 transition-all shadow-lg shadow-orange-100"
          >
            <Rocket size={16} />
            <span>E'lon Berish</span>
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default JobListings;
