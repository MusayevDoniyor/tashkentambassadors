import React from "react";
import { TRAINING_PROGRAMS } from "../data";
// Added ArrowRight to imports
import {
  Lightbulb,
  Presentation,
  PieChart,
  Users,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Rocket,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Presentation: <Presentation className="w-8 h-8" />,
  PieChart: <PieChart className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
};

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
        <div className="relative order-2 lg:order-1 px-4 lg:px-0">
          <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] blur-3xl opacity-20 -rotate-3"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group aspect-[4/5] lg:aspect-auto lg:h-[550px] flex items-center justify-center">
            {/* Real Image Integration */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
              alt="Modern Office"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center text-white p-12">
              <Rocket
                size={80}
                className="mb-8 text-orange-400 animate-bounce"
              />
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
                Hamjamiyatimiz <br />
                Sizni Kutmoqda
              </h3>
              <p className="text-orange-100 font-bold text-lg mb-10 leading-snug">
                G'oyadan biznesga bo'lgan yo'lda barcha imkoniyatlarni
                birlashtiramiz.
              </p>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <p className="font-black italic text-lg leading-tight text-white">
                  "Start up haqida bilmasangiz biz sizga buni o'rgatamiz!" ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Bizning Missiya</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-none tracking-tighter">
            KLUBIMIZ <span className="text-orange-600">HAQIDA</span> 📢
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
            Bizning klub asoschilari ya'ni Ambassadorlar{" "}
            <strong>Yoshlar ishlari agentligi</strong> va{" "}
            <strong>Yoshlar Ventures</strong> tomonidan saralab olingan.
            Toshkent shahridagi eng istiqbolli g'oyalarni haqiqiy biznesga
            aylantiramiz ✅
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Loyiha validatsiyasi",
              "Venture fondlarga yo'l",
              "Bilim oshirish",
              "Org jamoa ko'magi",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 bg-white p-5 rounded-[2rem] border border-orange-50 shadow-sm hover:border-orange-200 transition-colors"
              >
                <div className="bg-orange-600 rounded-full p-1">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
                <span className="text-gray-900 font-black text-xs uppercase tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://t.me/startup_community_rules"
            target="_blank"
            className="mt-12 inline-flex items-center justify-center space-x-3 logo-gradient text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-100 hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto"
          >
            <span>Klub qoidalari</span>
            {/* ArrowRight is now available from the imports */}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="text-center mb-20">
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic">
          NIMALARNI <span className="text-orange-600">O'RGATAMIZ?</span>
        </h3>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">
          Startup ekotizimida o'sish uchun kerak bo'lgan asosiy bilim va
          tajribalarni taqdim etamiz
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {TRAINING_PROGRAMS.map((program) => (
          <div
            key={program.id}
            className="p-10 bg-white border border-orange-50 rounded-[3rem] hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-100 transition-all group relative overflow-hidden flex flex-col"
          >
            <div className="bg-orange-50 text-orange-600 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
              {iconMap[program.icon]}
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-none uppercase">
              {program.title}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6">
              {program.description}
            </p>
            <div className="mt-auto h-1 w-0 group-hover:w-full bg-orange-600 transition-all duration-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
