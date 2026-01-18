
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Rocket, 
  MessageSquare, 
  ArrowRight, 
  ChevronRight,
  Globe,
  MapPin,
  TrendingUp,
  Award,
  Menu,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Ambassadors from './components/Ambassadors';
import Network from './components/Network';
import Events from './components/Events';
import Blog from './components/Blog';
import Footer from './components/Footer';
import AIHelper from './components/AIHelper';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white">
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
      
      {/* Floating AI Assistant */}
      <AIHelper />
    </div>
  );
};

export default App;
