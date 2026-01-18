
import React, { useState, useMemo } from 'react';
import { EVENTS } from '../data';
import { Calendar, Clock, MapPin, ChevronRight, ArrowRight, Filter } from 'lucide-react';

const eventTypes = ['Barchasi', 'Masterclass', 'Workshop', 'Meetup', 'Pitch Day'];

const Events: React.FC = () => {
  const [selectedType, setSelectedType] = useState('Barchasi');

  const filteredEvents = useMemo(() => {
    if (selectedType === 'Barchasi') return EVENTS;
    return EVENTS.filter(event => event.type === selectedType);
  }, [selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            Kelayotgan <span className="text-orange-600">Tadbirlar</span> 🗓
          </h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Master-klasslar, uchrashuvlar va pitch-daylarda ishtirok etib, tajribangizni oshiring. Barcha e'lonlar bizning kanalda!
          </p>
        </div>
        <a 
          href="https://t.me/toshkent_startup_community" 
          target="_blank"
          className="inline-flex items-center space-x-2 text-orange-600 font-black uppercase tracking-widest hover:translate-x-2 transition-transform"
        >
          <span>Barcha tadbirlar</span>
          <ArrowRight size={20} />
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <div className="flex items-center space-x-2 text-gray-400 mr-2">
          <Filter size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
        </div>
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
              selectedType === type
                ? 'logo-gradient text-white shadow-lg shadow-orange-100 scale-105'
                : 'bg-white text-gray-500 border border-orange-50 hover:border-orange-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group bg-white rounded-[2.5rem] border border-orange-50 overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row animate-in fade-in duration-500">
            <div className="relative md:w-2/5 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-video md:aspect-auto"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-orange-600 border border-white/50 uppercase tracking-widest">
                {event.type}
              </div>
            </div>
            <div className="p-8 md:w-3/5 flex flex-col">
              <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={14} className="text-orange-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={14} className="text-orange-500" />
                  <span>{event.time}</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-8 font-medium">
                <MapPin size={16} className="text-orange-300" />
                <span>{event.location}</span>
              </div>
              <a 
                href="https://t.me/toshkent_startup_community"
                target="_blank"
                className="mt-auto block text-center bg-gray-50 text-gray-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 hover:text-white transition-all shadow-sm group-hover:shadow-orange-100"
              >
                Ro'yxatdan o'tish
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
