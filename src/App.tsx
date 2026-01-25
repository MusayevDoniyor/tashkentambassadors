import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Ambassadors from "./components/Ambassadors";
import Network from "./components/Network";
import Events from "./components/Events";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import { ArrowUp } from "lucide-react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-16 md:pt-18 overflow-x-hidden">
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-12 md:py-20 bg-white">
          <About />
        </section>

        <section id="ambassadors" className="py-12 md:py-20 bg-gray-50">
          <Ambassadors />
        </section>

        <section id="network" className="py-12 md:py-20 bg-white">
          <Network />
        </section>

        <section id="events" className="py-12 md:py-20 bg-gray-50">
          <Events />
        </section>

        <section id="blog" className="py-12 md:py-20 bg-white">
          <Blog />
        </section>
      </main>

      <Footer />

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
        <ArrowUp size={24} className="animate-bounce" />
      </button>
    </div>
  );
};

export default App;
