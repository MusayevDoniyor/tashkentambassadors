import React from "react";
import {
  CheckCircle,
  Sparkles,
  Users,
  Rocket,
  Target,
  Handshake,
  Megaphone,
} from "lucide-react";

const About: React.FC = () => {
  const offerings = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Jamoa Topish",
      description:
        "Har bir startup uchun kerakli mutaxassislarni — developer, dizayner va marketologlarni topishda yordam beramiz.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Venture Fondlar",
      description:
        "Startup g'oyalaringizni rivojlantirib, ularni Yoshlar Ventures va boshqa venture fondlarga taqdim etish imkoniyati.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Noldan O'rganish",
      description:
        "Agar startup nimaligini bilmasangiz xavotir olmang, biz sizga buni bosqichma-bosqich o'rgatamiz.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Amaliy Ko'nikma",
      description:
        "Nazariy bilim va amaliy ko'nikmalarni oshirish, jamoa bilan ishlash va loyiha validatsiyasi.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-32">
        {/* Image side — clean, no overlay text */}
        <div className="relative order-2 lg:order-1 px-4 lg:px-0">
          <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] blur-3xl opacity-20 -rotate-3"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-[550px]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
              alt="Tashkent Startup Ambassadors jamoasi hamkorlikda ishlamoqda"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            {/* Minimal floating badge */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-6 sm:right-auto bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 p-2 rounded-xl text-white flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-tight">
                    Tashkent Ambassadors
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    G'oyadan biznesga — birgalikda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Bizning Missiya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-6 md:mb-8 leading-[1.1] md:leading-none tracking-tighter flex items-center flex-wrap gap-3">
            KLUBIMIZ <span className="text-orange-600">HAQIDA</span>
            <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-orange-500 -rotate-12" />
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed font-bold">
            Klubimiz Toshkent shahrida startap g‘oyalarni shakllantirish,
            rivojlantirish va ularni <strong>Yoshlar Ventures</strong>’ga taqdim
            etish yo‘nalishida faoliyat yuritadi.
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed font-bold">
            Bizning club <strong>Yoshlar ishlari agentligi</strong> hamda{" "}
            <strong>Yoshlar Ventures</strong> tomonidan qo'llab-quvvatlanib, har
            bir startupga kerakli jamoani topishda yaqindan ko'maklashadi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              "Har bir startupga jamoa topish",
              "Venture fondlarga taqdimot",
              "Noldan startup o'rganish",
              "Professional mentorlik",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 bg-white p-5 rounded-[2rem] border border-orange-50 shadow-sm hover:border-orange-200 transition-colors"
              >
                <div className="bg-orange-600 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
                <span className="text-gray-900 font-black text-xs uppercase tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What we offer section */}
      <div className="text-center mb-20">
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic">
          NIMA UCHUN <span className="text-orange-600">BIZ?</span>
        </h3>
        <p className="text-gray-600 font-bold max-w-xl mx-auto">
          Startup ekotizimida o'sish uchun kerak bo'lgan asosiy bilim, tajriba
          va yuqori darajadagi jamoani taqdim etamiz
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {offerings.map((item, idx) => (
          <div
            key={idx}
            className="p-6 md:p-10 bg-white border border-orange-50 rounded-[2.5rem] md:rounded-[3rem] hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-100 transition-all group relative overflow-hidden flex flex-col"
          >
            <div className="bg-orange-50 text-orange-600 w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight leading-none uppercase">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-bold mb-6">
              {item.description}
            </p>
            <div className="mt-auto h-1 w-0 group-hover:w-full bg-orange-600 transition-all duration-300 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
