import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import TashkentMap from "./components/TashkentMap";
import Events from "./components/Events";
import NotFound from "./components/NotFound";

// Shared & Core
import PageLoader from "./shared/components/PageLoader";
import Layout from "./core/layout/Layout";

// Lazy load heavy components
const TeamRequest = lazy(() => import("./components/TeamRequest"));
const JobListings = lazy(() => import("./components/JobListings"));

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
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
