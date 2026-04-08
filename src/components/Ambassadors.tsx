import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Send, Search, X, Users, Star, Crown, Shield } from "lucide-react";
import { apiClient } from "../lib/apiClient";
import { CustomSelect } from "./ui/CustomSelect";
import { lockBodyScroll, unlockBodyScroll } from "../lib/scrollLock";

interface Ambassador {
  id: string;
  name: string;
  district: string;
  image: string | null;
  telegram: string | null;
  linkedin: string | null;
  is_leader: boolean;
  is_district_ambassador: boolean;
}

const DISTRICTS = [
  "Barchasi",
  "Yunusobod",
  "Yashnobod",
  "Yakkasaroy",
  "Uchtepa",
  "Shayxontohur",
  "Olmazor",
  "Mirzo Ulug'bek",
  "Mirobod",
  "Chilonzor",
  "Sergeli",
  "Bektemir",
  "Yangihayot",
];

const districtOptions = DISTRICTS.map((d) => ({ value: d, label: d }));

const Ambassadors: React.FC = () => {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Barchasi");
  const [loading, setLoading] = useState(true);
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const data = await apiClient.get<Ambassador[]>("ambassadors");
        setAmbassadors(data || []);
      } catch (err) {
        console.error("Error fetching ambassadors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAmbassadors();
  }, []);

  const filteredAmbassadors = useMemo(() => {
    return ambassadors.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === "Barchasi" || a.district === selectedDistrict;
      return matchesSearch && matchesDistrict;
    });
  }, [searchQuery, selectedDistrict, ambassadors]);

  const openDrawer = (amb: Ambassador) => {
    setSelectedAmbassador(amb);
    setTimeout(() => setDrawerVisible(true), 10);
    lockBodyScroll();
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    unlockBodyScroll();
    setTimeout(() => setSelectedAmbassador(null), 350);
  };

  if (loading)
    return (
      <div className="py-20 text-center font-black text-orange-600">
        YUKLANMOQDA...
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Users size={14} />
            <span>Bizning Jamoa</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            TASHKENT STARTUP <span className="text-orange-600">TEAM</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg px-4 leading-relaxed">
            Toshkent startup ekotizimini rivojlantirishga mas'ul bo'lgan 
            professional va g'ayratli jamoa
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="relative z-50 mb-16 flex flex-col md:flex-row gap-4 items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Ism bo'yicha qidiruv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-orange-50 rounded-2xl py-4 pl-14 pr-12 text-sm font-bold focus:outline-none focus:border-orange-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="w-full md:w-[250px]">
            <CustomSelect
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              options={districtOptions}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-center">
          {filteredAmbassadors.map((amb) => (
            <div
              key={amb.id}
              onClick={() => openDrawer(amb)}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-orange-100 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 blur-xl"></div>

                {amb.image ? (
                  <div className="relative w-48 h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden z-10 transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={amb.image}
                      alt={amb.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-48 h-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 font-black text-white text-6xl uppercase tracking-tighter">
                    {amb.name.charAt(0)}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                  </div>
                )}

                {amb.is_leader && (
                  <div className="absolute -top-2 -left-2 bg-orange-600 text-white p-2 rounded-2xl shadow-xl z-20">
                    <Star size={16} fill="currentColor" />
                  </div>
                )}

                {amb.is_district_ambassador && (
                  <div className="absolute -top-2 -right-2 bg-emerald-600 text-white p-2 rounded-2xl shadow-xl z-20">
                    <Shield size={16} fill="currentColor" />
                  </div>
                )}

                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-lg border border-orange-50 z-20 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                   <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 group-hover:text-white">
                    {amb.district}
                   </p>
                </div>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase group-hover:text-orange-600 transition-colors">
                  {amb.name}
                </h3>
                <div className="flex flex-col items-center space-y-3">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest flex items-center ${amb.is_leader ? "text-orange-600" : "text-gray-400"}`}
                  >
                    {amb.is_leader ? (
                      <><Crown size={12} className="mr-1" /> Team Leader</>
                    ) : amb.is_district_ambassador ? (
                      <><Shield size={12} className="mr-1 text-emerald-600" /> Tuman Ambasadori</>
                    ) : (
                      "Startup Ambasador"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Batafsil ko'rish →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAmbassadors.length === 0 && (
          <div className="text-center py-20 bg-orange-50/30 rounded-[2.5rem] border-2 border-dashed border-orange-100">
            <Search size={40} className="mx-auto text-orange-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Hech qanday a'zo topilmadi
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDistrict("Barchasi");
              }}
              className="mt-4 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>

      {/* Ambassador Detail Drawer */}
      {selectedAmbassador && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeDrawer}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 9998,
              opacity: drawerVisible ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* Side Panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(480px, 100vw)",
              zIndex: 9999,
              background: "#ffffff",
              boxShadow: "-20px 0 80px rgba(0,0,0,0.15)",
              transform: drawerVisible ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.35s cubic-bezier(0.32, 0, 0.67, 0)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Header gradient band */}
            <div
              style={{
                background: "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                padding: "48px 32px 80px",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

              {/* Close button */}
              <button
                onClick={closeDrawer}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "background 0.2s",
                }}
              >
                <X size={20} />
              </button>

              {/* Badges */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {selectedAmbassador.is_leader && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "4px 14px",
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Star size={12} fill="currentColor" />
                    TEAM LEADER
                  </div>
                )}
                {selectedAmbassador.is_district_ambassador && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(16,185,129,0.3)",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "4px 14px",
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Shield size={12} fill="currentColor" />
                    TUMAN AMBASADORI
                  </div>
                )}
              </div>

              <h2
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {selectedAmbassador.name}
              </h2>
            </div>

            {/* Avatar overlapping header */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: -56, position: "relative", zIndex: 10, flexShrink: 0 }}>
              {selectedAmbassador.image ? (
                <img
                  src={selectedAmbassador.image}
                  alt={selectedAmbassador.name}
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "6px solid #fff",
                    boxShadow: "0 12px 40px rgba(234,88,12,0.3)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    border: "6px solid #fff",
                    boxShadow: "0 12px 40px rgba(234,88,12,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                    fontWeight: 900,
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedAmbassador.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Content body */}
            <div style={{ padding: "24px 32px 40px", flex: 1 }}>
              {/* Info chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#fff7ed",
                    color: "#ea580c",
                    borderRadius: 999,
                    padding: "6px 16px",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <MapPin size={13} />
                  {selectedAmbassador.district} tumani
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {[
                  { label: "Hudud", value: selectedAmbassador.district },
                  { label: "Maqom", value: selectedAmbassador.is_leader ? "Lider" : selectedAmbassador.is_district_ambassador ? "Tuman Vakili" : "Ambasador" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      background: "#f8fafc",
                      borderRadius: 16,
                      padding: "16px 18px",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <p style={{ color: "#94a3b8", fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>
                      {label}
                    </p>
                    <p style={{ color: "#0f172a", fontSize: 13, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <p style={{ color: "#94a3b8", fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
                Aloqa kanallari
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {selectedAmbassador.telegram && (
                  <a
                    href={`https://t.me/${selectedAmbassador.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 20px",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #0088cc15, #0088cc08)",
                      border: "1.5px solid #0088cc25",
                      textDecoration: "none",
                      color: "#0088cc",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0088cc20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Send size={16} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Telegram</p>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>@{selectedAmbassador.telegram.replace("@", "")}</p>
                    </div>
                  </a>
                )}

                {selectedAmbassador.linkedin && (
                  <a
                    href={selectedAmbassador.linkedin.startsWith("http") ? selectedAmbassador.linkedin : `https://linkedin.com/in/${selectedAmbassador.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 20px",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #0077b515, #0077b508)",
                      border: "1.5px solid #0077b525",
                      textDecoration: "none",
                      color: "#0077b5",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0077b520", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>LinkedIn</p>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>Profil ko'rish</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Ambassadors;
