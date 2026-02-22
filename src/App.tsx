import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TashkentMap from "./components/TashkentMap";
import Ambassadors from "./components/Ambassadors";
import Events from "./components/Events";
import Blog from "./components/Blog";
import TeamRequest from "./components/TeamRequest";
import Footer from "./components/Footer";
import { ArrowUp } from "lucide-react";

const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
};

const BackgroundLayer = () => (
  <div className="absolute inset-0 pointer-events-none z-0 min-h-full">
    <div className="absolute inset-0" style={gridStyle}></div>
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle at center, #000 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        backgroundPosition: "-1px -1px",
      }}
    ></div>
    <div className="absolute top-[5%] left-[-5%] w-[50%] h-[1000px] bg-orange-200/10 rounded-full blur-[120px]"></div>
    <div className="absolute top-[25%] right-[-10%] w-[45%] h-[800px] bg-orange-100/20 rounded-full blur-[100px]"></div>
    <div className="absolute top-[55%] left-[-5%] w-[40%] h-[700px] bg-amber-50/30 rounded-full blur-[80px]"></div>
    <div
      className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      }}
    ></div>
  </div>
);

const HomePage: React.FC = () => (
  <>
    <section id="home" className="relative">
      <Hero />
    </section>

    <section
      id="about"
      className="py-16 md:py-28 relative border-t border-gray-100/50 bg-white/40 backdrop-blur-[2px]"
    >
      <About />
    </section>

    <section
      id="ambassadors"
      className="py-16 md:py-20 relative border-t border-gray-100/50"
    >
      <TashkentMap />
    </section>

    <section
      id="events"
      className="py-16 md:py-28 relative border-t border-gray-100/50"
    >
      <Events />
    </section>

    <section
      id="blog"
      className="py-16 md:py-28 relative border-t border-gray-100/50 bg-white/40 backdrop-blur-[2px]"
    >
      <Blog />
    </section>
  </>
);

const RequestPage: React.FC = () => (
  <section className="py-16 md:py-28 relative">
    <TeamRequest />
  </section>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <BackgroundLayer />

      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="overflow-x-hidden pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/request" element={<RequestPage />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-orange-600 text-white shadow-2xl transition-all duration-300 transform active:scale-95 ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none"
        } hover:bg-orange-700 hover:-translate-y-1`}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;
