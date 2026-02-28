import React from "react";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Users,
  Rocket,
  Target,
  Handshake,
} from "lucide-react";

const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const offerings = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Jamoa Topish",
      description:
        "Startupingiz uchun kerakli mutaxassislarni — developer, dizayner, marketing va boshqalarni topamiz.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Startup Rivojlantirish",
      description:
        "G'oyangizni real biznesga aylantirish uchun mentorlar va venture fondlarga yo'l ochamiz.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Loyiha Validatsiyasi",
      description:
        "Biznes g'oyangizni real bozor talablariga muvofiqligini tekshirishda yordam beramiz.",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Hamkorlik Imkoniyatlari",
      description:
        "Yoshlar Ventures va Yoshlar ishlari agentligi bilan bevosita hamkorlik qilish imkoniyati.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-32">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative order-2 lg:order-1 px-4 lg:px-0"
        >
          <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] blur-3xl opacity-20 -rotate-3"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-[550px] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
              alt="Startup Jamoa"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center text-white p-6 sm:p-12">
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-4 leading-[0.9] text-white">
                Hamjamiyatimiz <br />
                Sizni Kutmoqda
              </h3>
              <p className="text-orange-100 font-bold text-sm sm:text-lg mb-6 sm:mb-10 leading-snug">
                G'oyadan biznesga bo'lgan yo'lda kerakli jamoani birgalikda
                topamiz.
              </p>

              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20">
                <p className="font-black italic text-sm sm:text-lg leading-tight text-white">
                  "Yaxshi g'oya + To'g'ri jamoa = Muvaffaqiyatli startup!" ✨
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Bizning Missiya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-6 md:mb-8 leading-[1.1] md:leading-none tracking-tighter">
            KLUBIMIZ <span className="text-orange-600">HAQIDA</span> 📢
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed font-medium">
            Startup ekotizimida jamoa topish — eng muhim qadam. Bizning club{" "}
            <strong>Yoshlar Ventures</strong> va{" "}
            <strong>Yoshlar ishlari agentligi</strong> tomonidan qo'llab
            quvvatlanib, har bir startupga kerakli jamoani topishda yordam
            beradi. ✅
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              "Jamoa tanlash va birlashtirish",
              "Venture fondlarga yo'l",
              "Mentor va ekspertlar bilan ishlash",
              "Org jamoa ko'magi",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-3 bg-white p-5 rounded-[2rem] border border-orange-50 shadow-sm hover:border-orange-200 transition-colors"
              >
                <div className="bg-orange-600 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
                <span className="text-gray-900 font-black text-xs uppercase tracking-tight">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What we offer section (merged from Nimalarni o'rgatamiz) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic">
          NIMA UCHUN <span className="text-orange-600">BIZ?</span>
        </h3>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">
          Startup ekotizimida o'sish uchun kerak bo'lgan asosiy bilim,
          tajribalar va jamoani taqdim etamiz
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {offerings.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-6 md:p-10 bg-white border border-orange-50 rounded-[2.5rem] md:rounded-[3rem] hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-100 transition-all group relative overflow-hidden flex flex-col"
          >
            <div className="bg-orange-50 text-orange-600 w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight leading-none uppercase">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium mb-6">
              {item.description}
            </p>
            <div className="mt-auto h-1 w-0 group-hover:w-full bg-orange-600 transition-all duration-300 rounded-full"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
