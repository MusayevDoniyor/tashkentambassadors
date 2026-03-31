import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "./components/SEO";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TashkentMap from "./components/TashkentMap";
import Events from "./components/Events";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { ArrowUp } from "lucide-react";

// Lazy load heavy components
const TeamRequest = lazy(() => import("./components/TeamRequest"));
const JobListings = lazy(() => import("./components/JobListings"));

// Loading spinner component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center py-32 space-y-4">
    <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest animate-pulse">
      Sahifa yuklanmoqda...
    </span>
  </div>
);

const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
};

const BackgroundLayer = () => (
  <div className="absolute inset-0 pointer-events-none z-0 min-h-full overflow-hidden">
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
  </>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 300);
    }
  }, [location.pathname, location.hash]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <SEO
        title="Startup Ambassadors Tashkent | Toshkent Startup Ekotizimi"
        description="Toshkent startup ekotizimini rivojlantirish bo'yicha Yoshlar ishlari agentligi va Yoshlar Ventures tomonidan qo'llab-quvvatlanuvchi rasmiy platforma."
        canonical="https://www.startuptashkent.uz/"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Startup Ambassadors Tashkent",
              "url": "https://www.startuptashkent.uz/",
              "logo": "https://www.startuptashkent.uz/AVA.png",
              "description": "Toshkent startup ekotizimini rivojlantirish bo'yicha Yoshlar ishlari agentligi va Yoshlar Ventures tomonidan qo'llab-quvvatlanuvchi rasmiy platforma."
            }
          `}
        </script>
      </Helmet>
      <BackgroundLayer />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-grow pt-32">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/request"
              element={
                <Suspense fallback={<PageLoader />}>
                  <section className="py-16 md:py-28 relative">
                    <TeamRequest />
                  </section>
                </Suspense>
              }
            />
            <Route
              path="/elonlar"
              element={
                <Suspense fallback={<PageLoader />}>
                  <section className="py-16 md:py-28 relative">
                    <JobListings />
                  </section>
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-12 right-8 z-50 p-4 rounded-2xl bg-orange-600 text-white shadow-2xl transition-all duration-300 transform active:scale-95 ${
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
