import React, { useState, useEffect } from "react";
import SEO from "./SEO";
import { apiClient } from "../lib/apiClient";
import {
  Rocket,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { JobListing } from "../types";
import { JobCard } from "./ui/JobCard";
import { CustomSelect } from "./ui/CustomSelect";

const JobListings: React.FC = () => {
  const [listings, setListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("Barchasi");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRole]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await apiClient.get<JobListing[]>("job-listings");
        if (data) {
          const approved = data.filter((l) => l.status === "APPROVED");
          setListings(approved);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const allRoles = Array.from(
    new Set(listings.flatMap((l) => l.roles_needed)),
  ).sort();

  const roleOptions = [
    { value: "Barchasi", label: "Barcha kasblar" },
    ...allRoles.map((r) => ({ value: r, label: r })),
  ];

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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedListings = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <SEO
        title="Startup E'lonlar | Toshkent Startup Ekotizimi"
        description="Toshkentdagi startup loyihalarga qo'shiling. O'z mutaxassisligingiz bo'yicha e'lonlarni toping va qiziqarli loyihalarga a'zo bo'ling."
        canonical="https://www.startuptashkent.uz/elonlar"
      />
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
        <p className="text-gray-600 font-bold max-w-2xl mx-auto text-lg md:text-xl leading-relaxed px-6">
          Eng qiziqarli loyihalarni toping va jamoaga qo'shiling. O'z
          mutaxassisligingiz bo'yicha e'lonlarni filtrlang.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative z-50 flex flex-col md:flex-row gap-4 mb-12 bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] border-2 border-orange-50 shadow-xl shadow-orange-100/20">
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
        <div className="w-full md:w-[220px]">
          <CustomSelect
            value={selectedRole}
            onChange={setSelectedRole}
            options={roleOptions}
          />
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
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
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
            <p className="text-gray-500 font-bold mb-8 max-w-xs mx-auto text-sm">
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
          <div>
            <div className="grid grid-cols-1 gap-6 items-start">
              {paginatedListings.map((listing) => {
                const isExpanded = expandedId === listing.id;
                return (
                  <JobCard
                    key={listing.id}
                    listing={listing}
                    isExpanded={isExpanded}
                    onToggle={() =>
                      setExpandedId(isExpanded ? null : listing.id)
                    }
                  />
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12 bg-white/50 backdrop-blur-sm p-2 rounded-2xl w-max mx-auto border border-gray-100 shadow-sm">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center px-2 space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all text-sm ${
                          currentPage === page
                            ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                            : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
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
          <p className="text-gray-300 font-bold mb-10 text-lg relative z-10 max-w-xl mx-auto">
            Jamoangizga yangi talantlarni qo'shing. E'lon berish mutlaqo bepul!
          </p>
          <a
            href="https://t.me/startuptashkent_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-orange-600 hover:text-white transition-all shadow-2xl relative z-10"
          >
            <Plus size={18} />
            <span>Bot orqali e'lon berish</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default JobListings;
