
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
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="ambassadors" className="py-20 bg-gray-50">
          <Ambassadors />
        </section>

        <section id="network" className="py-20">
          <Network />
        </section>

        <section id="events" className="py-20 bg-gray-50">
          <Events />
        </section>

        <section id="blog" className="py-20">
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
