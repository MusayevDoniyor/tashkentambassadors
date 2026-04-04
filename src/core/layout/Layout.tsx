import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUp } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackgroundLayer from "./BackgroundLayer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track when any drawer opens (body overflow hidden)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDrawerOpen(document.body.style.overflow === "hidden");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
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
    } else {
      // Logic for active tab based on scroll position could be added here if needed
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

        <main className="flex-grow pt-32">{children}</main>

        <Footer />
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-12 right-8 z-50 p-4 rounded-2xl bg-orange-600 text-white shadow-2xl transition-all duration-300 transform active:scale-95 ${
          showScrollTop && !drawerOpen
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

export default Layout;
