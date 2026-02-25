import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { supabase } from "../lib/supabase";

const Hero: React.FC = () => {
  const [stats, setStats] = useState({
    districts: 12,
    ambassadors: 0,
    startups: 0,
    partners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ambCount, teamReqCount, partnerCount] = await Promise.all([
          supabase
            .from("ambassadors")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("team_requests")
            .select("*", { count: "exact", head: true }),
          supabase.from("partners").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          districts: 12,
          ambassadors: ambCount.count || 0,
          startups: teamReqCount.count || 0,
          partners: partnerCount.count || 0,
        });
      } catch (err) {
        console.error("Error fetching hero stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-transparent pt-10 pb-16 md:pt-16 md:pb-32">
      {/* Background Decor - Removed local glows to show global grid */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-bold mb-6 md:mb-10 border border-orange-100"
          >
            <Sparkles size={14} className="md:w-4 md:h-4" />
            <span className="uppercase tracking-wide">
              Toshkent Startup Ambassadors
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]"
          >
            STARTUP <span className="text-orange-600">AMBASSADORS</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-amber-500 italic block sm:inline mt-2 sm:mt-0">
              {" "}
              TASHKENT
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-medium px-4"
          >
            G'oyalaringizni Venture fondlarga taqdim eting, bilimingizni
            oshiring va Toshkentning eng nufuzli startup ekotizimi a'zosiga
            aylaning.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4"
          >
            <a
              href="https://t.me/tashkent_ambassadors"
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 logo-gradient text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:brightness-110 transition-all shadow-xl shadow-orange-200 btn-3d border border-orange-600 active:scale-95"
            >
              <span>QO'SHILISH</span>
              <Send size={18} />
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("ambassadors");
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-900 border-2 border-orange-100 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:border-orange-500 transition-all shadow-sm active:scale-95"
            >
              <span>BIZNING JAMOA</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { label: "Tumanlar", val: stats.districts },
            {
              label: "Ambassadorlar",
              val: `${stats.ambassadors}${stats.ambassadors >= 24 ? "+" : ""}`,
            },
            {
              label: "Startuplar",
              val: `${stats.startups}${stats.startups >= 150 ? "+" : ""}`,
            },
            {
              label: "Hamkorlar",
              val: `${stats.partners}${stats.partners >= 10 ? "+" : ""}`,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm group"
            >
              <div className="text-2xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2 group-hover:text-orange-600 transition-colors">
                {loading ? "..." : stat.val}
              </div>
              <div className="text-[8px] md:text-[10px] text-orange-600 font-black uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
