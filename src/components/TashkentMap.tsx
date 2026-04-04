import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { MapPin, Send, Shield, X, Phone, Linkedin } from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "../lib/scrollLock";

interface Ambassador {
  id: string;
  name: string;
  district: string;
  role: string;
  team: string;
  image: string | null;
  telegram: string | null;
  linkedin: string | null;
  phone: string | null;
  is_leader: boolean;
  is_district_ambassador?: boolean;
}

interface DistrictPath {
  id: string;
  name: string;
  path: string;
}

const DISTRICTS_DATA: DistrictPath[] = [
  {
    id: "olmazor",
    name: "Olmazor",
    path: "M155.548 4.02783L61.6073 97.8952H93.9576C96.2111 97.8952 102.408 97.0989 105.225 96.7008L127.76 107.96L124.943 119.219L164.38 147.366L170.014 138.922H186.915C189.169 138.922 202.878 116.404 209.45 105.145L206.633 99.5155L217.901 88.2566L170.014 40.406L155.548 4.02783Z",
  },
  {
    id: "yunusobod",
    name: "Yunusobod",
    path: "M155.544 4.02816L213.119 1L255.544 31.2797L310.088 37.3361L362.994 72.5796L350.292 74.1832L339.024 88.2569L327.757 85.4422L313.672 96.7011H296.771C292.814 103.818 285.521 116.135 283.327 117.133C283.96 120.124 284.915 126.367 285.503 130.478L279.869 133.293L277.052 122.034L262.968 124.849L234.799 172.699L215.081 161.44L223.531 136.107L220.715 130.478L226.348 124.849L207.34 108.719C208.097 107.442 208.804 106.241 209.444 105.145L206.627 99.5159L217.894 88.2569L170.007 40.4063L155.544 4.02816Z",
  },
  {
    id: "mirzo_ulugbek",
    name: "Mirzo Ulug'bek",
    path: "M262.96 124.848L234.791 172.699L257.338 181.143L277.056 155.811L296.774 167.07L313.675 181.143L355.544 164.51L382.817 119.091L373.725 79.7275L362.986 72.5793L350.284 74.1829L339.017 88.2566L327.749 85.4419L313.664 96.7008H296.763C292.806 103.818 285.514 116.135 283.319 117.133C283.952 120.124 284.908 126.367 285.496 130.478L279.862 133.292L277.045 122.033L262.96 124.848Z",
  },
  {
    id: "shayxontohur",
    name: "Shayxontohur",
    path: "M226.347 124.848L207.339 108.719C200.766 119.978 186.916 138.922 186.916 138.922H170.015L164.381 147.366L124.944 119.219L127.761 107.96L105.226 96.7012C102.409 97.0993 96.2121 97.8956 93.9586 97.8956H61.6083L53.6407 136.107L74.2393 133.293L77.0562 141.737L108.042 144.552L110.859 186.773H151.336L161.563 192.402L178.464 170.567H207.339L215.079 161.44L223.53 136.107L220.713 130.477L226.347 124.848Z",
  },
  {
    id: "uchtepa",
    name: "Uchtepa",
    path: "M37.3639 273.518L40.3935 300.769L116.151 251.512L110.859 186.773L108.042 144.552L77.0562 141.737L74.2393 133.293L53.6408 136.107L46.4544 170.567L1 285.629L7.06096 288.657L37.3639 273.518Z",
  },
  {
    id: "chilonzor",
    name: "Chilonzor",
    path: "M40.3926 300.77L52.5145 328.021L69.3203 347.213L139.028 279.659L175.648 206.476L207.339 170.567H178.464L161.563 192.403L151.336 186.773H110.859L116.15 251.512L40.3926 300.77Z",
  },
  {
    id: "yakkasaroy",
    name: "Yakkasaroy",
    path: "M175.647 206.476L207.339 170.567L217.901 178.329L223.535 234.623L212.267 254.326L139.028 279.659L175.647 206.476Z",
  },
  {
    id: "yashnobod",
    name: "Yashnobod",
    path: "M257.338 181.143L234.791 172.699L231.985 175.514L268.605 220.55L304.215 310.621L334.333 282.601L401 249.294L382.819 228.098L397.97 206.902L379.788 179.65L355.544 164.51L313.675 181.143L296.774 167.07L277.056 155.811L257.338 181.143Z",
  },
  {
    id: "mirobod",
    name: "Mirobod",
    path: "M234.802 172.699L215.084 161.44L207.338 170.567L217.9 178.329L223.534 234.623L212.266 254.327L262.971 265.586V293.733L304.215 310.621L268.605 220.55L231.985 175.514L234.802 172.699Z",
  },
  {
    id: "sergeli",
    name: "Sergeli",
    path: "M69.3207 347.213L139.028 279.659L212.267 254.326L262.972 265.585V293.733L304.216 310.621L246.455 364.357L209.45 383.804L178.464 379.497L130.577 341.583L69.3207 347.213Z",
  },
  {
    id: "yangihayot",
    name: "Yangihayot",
    path: "M188.875 434L246.452 364.357L209.45 383.805L178.464 379.497L130.577 341.583L69.3207 347.213L94.9368 376.469L99.5913 383.805L108.042 383.805L116.493 395.064L137.36 418.86L188.875 434Z",
  },
  {
    id: "bektemir",
    name: "Bektemir",
    path: "M334.331 282.602L400.997 249.295L398.182 262.771L341.844 316.251L246.455 364.357L334.331 282.602Z",
  },
];

const DISTRICT_ALIASES: Record<string, string[]> = {
  Olmazor: ["Olmazor"],
  Yunusobod: ["Yunusobod"],
  "Mirzo Ulug'bek": ["Mirzo Ulug'bek", "Mirzo Ulugbek"],
  Shayxontohur: ["Shayxontohur"],
  Uchtepa: ["Uchtepa"],
  Chilonzor: ["Chilonzor", "Chilanzar"],
  Yakkasaroy: ["Yakkasaroy"],
  Yashnobod: ["Yashnobod"],
  Mirobod: ["Mirobod"],
  Sergeli: ["Sergeli"],
  Yangihayot: ["Yangihayot"],
  Bektemir: ["Bektemir"],
};

const matchesDistrict = (
  ambassadorDistrict: string,
  mapDistrictName: string,
): boolean => {
  const aliases = DISTRICT_ALIASES[mapDistrictName] || [mapDistrictName];
  const normalizedAmbDistrict = ambassadorDistrict.trim().toLowerCase();
  return aliases.some((alias) => alias.toLowerCase() === normalizedAmbDistrict);
};

const TashkentMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [ambassadorCount, setAmbassadorCount] = useState(22);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("ambassadors").select("*");
      if (data) {
        setAmbassadors(data);
        if (data.length) setAmbassadorCount(data.length);
      }
    };
    fetchData();
  }, []);

  const openDrawer = (districtName: string) => {
    setSelectedDistrict(districtName);
    setTimeout(() => setDrawerVisible(true), 10);
    lockBodyScroll();
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    unlockBodyScroll();
    setTimeout(() => setSelectedDistrict(null), 350);
  };



  const getOfficialAmbassador = (districtName: string): Ambassador | null => {
    const districtAmbs = ambassadors.filter((a) =>
      matchesDistrict(a.district, districtName),
    );
    return districtAmbs.find((a) => a.is_district_ambassador) || null;
  };

  const officialAmbassador = selectedDistrict
    ? getOfficialAmbassador(selectedDistrict)
    : null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          <MapPin size={14} />
          <span>Interaktiv Xarita</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          TOSHKENT <span className="text-orange-600">HUDUDLARI</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto font-bold text-lg px-4">
          Qaysi tumanga qaysi ambassador biriktirilgan — tuman ustiga bosing
        </p>
      </div>

      {/* Map + Panel side by side on desktop */}
      <div
        className="relative flex flex-col lg:flex-row gap-8 items-start justify-center"
        ref={mapContainerRef}
      >
        {/* Map */}
        <div className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border-2 border-orange-100/50 shadow-lg overflow-hidden w-full max-w-xl lg:flex-shrink-0 transition-all hover:border-orange-200">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "35px 35px",
            }}
          ></div>
          <svg
            viewBox="0 0 402 435"
            className="w-full h-auto relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          >
            {DISTRICTS_DATA.map((district) => {
              const isSelected = selectedDistrict === district.name;
              const hasOfficialAmbassador = ambassadors.some(
                (a) =>
                  matchesDistrict(a.district, district.name) &&
                  a.is_district_ambassador,
              );
              return (
                <path
                  key={district.id}
                  d={district.path}
                  className={`transition-all duration-300 cursor-pointer stroke-white stroke-[2.5px] ${
                    isSelected
                      ? "fill-orange-600 scale-[1.02] drop-shadow-xl"
                      : hasOfficialAmbassador
                        ? "fill-orange-200/80 hover:fill-orange-400"
                        : "fill-gray-100 hover:fill-gray-200"
                  }`}
                  style={{
                    transformOrigin: "center",
                    transformBox: "fill-box",
                  }}
                  onClick={() =>
                    isSelected ? closeDrawer() : openDrawer(district.name)
                  }
                />
              );
            })}
          </svg>
        </div>

        {/* District Info Drawer */}
        {selectedDistrict && (
          <>
            {/* Backdrop */}
            <div
              onClick={closeDrawer}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
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
                width: "min(460px, 100vw)",
                zIndex: 9999,
                background: "#ffffff",
                boxShadow: "-20px 0 80px rgba(0,0,0,0.15)",
                transform: drawerVisible ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.35s cubic-bezier(0.32, 0, 0.67, 0)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              {officialAmbassador ? (
                <>
                  {/* Gradient Header */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                      padding: "48px 32px 80px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ position: "absolute", bottom: -20, left: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

                    {/* Close */}
                    <button
                      onClick={closeDrawer}
                      style={{
                        position: "absolute", top: 20, right: 20,
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)", border: "none",
                        cursor: "pointer", display: "flex", alignItems: "center",
                        justifyContent: "center", color: "#fff", transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                    >
                      <X size={20} />
                    </button>

                    {/* District badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.2)", color: "#fff",
                      borderRadius: 999, padding: "4px 14px",
                      fontSize: 10, fontWeight: 900, letterSpacing: "0.15em",
                      textTransform: "uppercase", marginBottom: 16,
                    }}>
                      <MapPin size={12} />
                      {selectedDistrict} TUMANI
                    </div>

                    <h2 style={{
                      color: "#fff", fontSize: 28, fontWeight: 900,
                      letterSpacing: "-0.03em", textTransform: "uppercase",
                      margin: 0, lineHeight: 1.1,
                    }}>
                      {officialAmbassador.name}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>
                      {officialAmbassador.role || "Rasmiy Ambassador"}
                    </p>
                  </div>

                  {/* Avatar overlapping header */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: -56, position: "relative", zIndex: 10 }}>
                    {officialAmbassador.image ? (
                      <img
                        src={officialAmbassador.image}
                        alt={officialAmbassador.name}
                        style={{
                          width: 112, height: 112, borderRadius: "50%",
                          objectFit: "cover", border: "6px solid #fff",
                          boxShadow: "0 12px 40px rgba(234,88,12,0.3)",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: 112, height: 112, borderRadius: "50%",
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        border: "6px solid #fff",
                        boxShadow: "0 12px 40px rgba(234,88,12,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 44, fontWeight: 900, color: "#fff", textTransform: "uppercase",
                      }}>
                        {officialAmbassador.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content body */}
                  <div style={{ padding: "24px 32px 40px", flex: 1 }}>
                    {/* Info chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "#fff7ed", color: "#ea580c",
                        borderRadius: 999, padding: "6px 16px",
                        fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>
                        <MapPin size={13} />
                        {selectedDistrict} tumani
                      </div>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "#f0fdf4", color: "#16a34a",
                        borderRadius: 999, padding: "6px 16px",
                        fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>
                        <Shield size={13} />
                        Rasmiy Ambassador
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #f1f5f9, transparent)", marginBottom: 24 }} />

                    {/* Contact section label */}
                    <p style={{ color: "#94a3b8", fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
                      Aloqa
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {/* Phone */}
                      {officialAmbassador.phone && (
                        <a
                          href={`tel:${officialAmbassador.phone}`}
                          style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "14px 20px", borderRadius: 16,
                            background: "linear-gradient(135deg, #ea580c15, #ea580c08)",
                            border: "1.5px solid #ea580c25",
                            textDecoration: "none", color: "#ea580c",
                            fontWeight: 800, fontSize: 13, transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #ea580c15, #ea580c08)"; e.currentTarget.style.color = "#ea580c"; }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#ea580c20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Phone size={16} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Telefon</p>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>{officialAmbassador.phone}</p>
                          </div>
                        </a>
                      )}

                      {/* Telegram */}
                      {officialAmbassador.telegram && (
                        <a
                          href={`https://t.me/${officialAmbassador.telegram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "14px 20px", borderRadius: 16,
                            background: "linear-gradient(135deg, #0088cc15, #0088cc08)",
                            border: "1.5px solid #0088cc25",
                            textDecoration: "none", color: "#0088cc",
                            fontWeight: 800, fontSize: 13, transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#0088cc"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #0088cc15, #0088cc08)"; e.currentTarget.style.color = "#0088cc"; }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0088cc20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Send size={16} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Telegram</p>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>@{officialAmbassador.telegram.replace("@", "")}</p>
                          </div>
                        </a>
                      )}

                      {/* LinkedIn */}
                      {officialAmbassador.linkedin && (
                        <a
                          href={officialAmbassador.linkedin.startsWith("http") ? officialAmbassador.linkedin : `https://linkedin.com/in/${officialAmbassador.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "14px 20px", borderRadius: 16,
                            background: "linear-gradient(135deg, #0077b515, #0077b508)",
                            border: "1.5px solid #0077b525",
                            textDecoration: "none", color: "#0077b5",
                            fontWeight: 800, fontSize: 13, transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#0077b5"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #0077b515, #0077b508)"; e.currentTarget.style.color = "#0077b5"; }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0077b520", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Linkedin size={16} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>LinkedIn</p>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>Profil ko'rish</p>
                          </div>
                        </a>
                      )}

                      {!officialAmbassador.phone && !officialAmbassador.telegram && !officialAmbassador.linkedin && (
                        <div style={{
                          padding: "20px", borderRadius: 16,
                          background: "#f8fafc", border: "1.5px dashed #e2e8f0",
                          textAlign: "center", color: "#94a3b8",
                          fontSize: 12, fontWeight: 700,
                        }}>
                          Aloqa ma'lumotlari mavjud emas
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* No ambassador */
                <>
                  {/* Minimal Header */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                      padding: "48px 32px 80px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

                    <button
                      onClick={closeDrawer}
                      style={{
                        position: "absolute", top: 20, right: 20,
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)", border: "none",
                        cursor: "pointer", display: "flex", alignItems: "center",
                        justifyContent: "center", color: "#fff", transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                    >
                      <X size={20} />
                    </button>

                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)",
                      borderRadius: 999, padding: "4px 14px",
                      fontSize: 10, fontWeight: 900, letterSpacing: "0.15em",
                      textTransform: "uppercase", marginBottom: 16,
                    }}>
                      <MapPin size={12} />
                      {selectedDistrict} TUMANI
                    </div>

                    <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", margin: 0 }}>
                      {selectedDistrict}
                    </h2>
                  </div>

                  {/* Empty state icon */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: -40, position: "relative", zIndex: 10 }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: "#fff", border: "5px solid #fff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#cbd5e1",
                    }}>
                      <MapPin size={32} />
                    </div>
                  </div>

                  <div style={{ padding: "24px 32px 40px", textAlign: "center" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "-0.03em", marginBottom: 10 }}>
                      Ambassador yo'q
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, lineHeight: 1.6, marginBottom: 32 }}>
                      Bu tumanga hozircha rasmiy ambassador biriktirilmagan.
                    </p>
                    <button
                      onClick={closeDrawer}
                      style={{
                        padding: "12px 32px",
                        background: "#0f172a",
                        color: "#fff",
                        borderRadius: 12,
                        border: "none",
                        fontWeight: 900,
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      Yopish
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* District buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
        {DISTRICTS_DATA.map((d) => {
          const hasOfficialAmbassador = ambassadors.some(
            (a) =>
              matchesDistrict(a.district, d.name) && a.is_district_ambassador,
          );
          return (
            <button
              key={d.id}
              onClick={() =>
                selectedDistrict === d.name ? closeDrawer() : openDrawer(d.name)
              }
              className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm border ${
                selectedDistrict === d.name
                  ? "bg-orange-600 text-white border-orange-600 shadow-orange-100 -translate-y-1"
                  : hasOfficialAmbassador
                    ? "bg-white text-gray-700 border-orange-100 hover:border-orange-500 hover:text-orange-600"
                    : "bg-gray-50/50 text-gray-400 border-gray-100 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Stats Strip */}
      <div className="flex flex-wrap justify-center gap-8 mt-16">
        {[
          { label: "Tumanlar", val: 12 },
          { label: "Ambassadorlar", val: `${ambassadorCount}` },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center px-12 py-8 rounded-[2.5rem] bg-white border border-gray-100 hover:border-orange-200 transition-all shadow-lg shadow-gray-100/50 group"
          >
            <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
              {stat.val}
            </div>
            <div className="text-[10px] text-orange-600 font-black uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TashkentMap;
