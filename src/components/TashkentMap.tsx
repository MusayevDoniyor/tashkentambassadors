import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin } from "lucide-react";

interface Ambassador {
  id: string;
  name: string;
  district: string;
  role: string;
  team: string;
  image: string | null;
  telegram: string | null;
  linkedin: string | null;
  is_leader: boolean;
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
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchAmbassadors = async () => {
      const { data } = await supabase.from("ambassadors").select("*");
      if (data) setAmbassadors(data);
    };
    fetchAmbassadors();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const districtAmbassadors = hoveredDistrict
    ? ambassadors.filter((a) => matchesDistrict(a.district, hoveredDistrict))
    : [];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.05,
      },
    },
  };

  const pathVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
        >
          <MapPin size={14} />
          <span>Interaktiv Xarita</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          TOSHKENT <span className="text-orange-600">HUDUDLARI</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg px-4">
          Qaysi tumanga qaysi ambassador qaraydi — tuman ustiga mishkani olib
          boring
        </p>
      </div>

      <div className="relative group/map max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border-2 border-orange-100/50 shadow-lg overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <svg
            viewBox="0 0 402 435"
            className="w-full h-auto relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            onMouseMove={handleMouseMove}
          >
            {DISTRICTS_DATA.map((district) => {
              const isHovered = hoveredDistrict === district.name;
              const hasAmbassador = ambassadors.some((a) =>
                matchesDistrict(a.district, district.name),
              );

              return (
                <motion.path
                  key={district.id}
                  variants={pathVariants}
                  d={district.path}
                  className={`transition-all duration-300 cursor-pointer stroke-white stroke-[2.5px] ${
                    isHovered
                      ? "fill-orange-600 scale-[1.02] drop-shadow-xl"
                      : hasAmbassador
                        ? "fill-orange-200/80 hover:fill-orange-400"
                        : "fill-gray-100 hover:fill-gray-200"
                  }`}
                  style={{
                    transformOrigin: "center",
                    transformBox: "fill-box",
                  }}
                  onMouseEnter={() => setHoveredDistrict(district.name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                />
              );
            })}
          </svg>
        </motion.div>

        <AnimatePresence>
          {hoveredDistrict && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="fixed z-[100] pointer-events-none"
              style={{
                left: tooltipPos.x + 20,
                top: tooltipPos.y + 20,
              }}
            >
              <div className="bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-orange-100/50 min-w-[280px] max-w-[340px] backdrop-blur-md">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">
                      {hoveredDistrict}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {districtAmbassadors.length} ta a'zo
                    </p>
                  </div>
                </div>

                {districtAmbassadors.length > 0 ? (
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                    {districtAmbassadors.slice(0, 4).map((amb) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={amb.id}
                        className="flex items-center space-x-3 p-2 rounded-xl bg-gray-50/80"
                      >
                        {amb.image ? (
                          <img
                            src={amb.image}
                            alt={amb.name}
                            className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-sm uppercase shadow-sm">
                            {amb.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight truncate">
                            {amb.name}
                          </h4>
                          <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest truncate">
                            {amb.role}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {districtAmbassadors.length > 4 && (
                      <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest pt-1">
                        +{districtAmbassadors.length - 4} yana
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                      Hozircha a'zo biriktirilmagan
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto"
      >
        {DISTRICTS_DATA.map((d) => {
          const hasAmbassador = ambassadors.some((a) =>
            matchesDistrict(a.district, d.name),
          );
          return (
            <button
              key={d.id}
              onMouseEnter={() => setHoveredDistrict(d.name)}
              onMouseLeave={() => setHoveredDistrict(null)}
              className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                hoveredDistrict === d.name
                  ? "bg-orange-600 text-white shadow-lg -translate-y-0.5"
                  : hasAmbassador
                    ? "bg-white text-gray-700 border border-orange-100 hover:border-orange-500 hover:text-orange-600 shadow-sm"
                    : "bg-gray-50 text-gray-400 border border-gray-100 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default TashkentMap;
