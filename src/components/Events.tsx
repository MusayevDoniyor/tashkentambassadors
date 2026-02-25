import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  Users,
  X,
  Check,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string | null;
  capacity: number | null;
  registered_count: number;
  registration_link: string | null;
}

const eventTypes = [
  "Barchasi",
  "Masterclass",
  "Workshop",
  "Meetup",
  "Pitch Day",
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState("Barchasi");
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Registration form state
  const [regData, setRegData] = useState({
    name: "",
    phone: "",
    district: "",
    email: "",
  });
  const [regStatus, setRegStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const isEventPast = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });
        if (error) throw error;

        const upcomingEvents = (data || []).filter(
          (event) => !isEventPast(event.date),
        );
        setEvents(upcomingEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (selectedType === "Barchasi") return events;
    return events.filter((event) => event.type === selectedType);
  }, [selectedType, events]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formatPhone = (val: string) => {
    const x = val.replace(/\D/g, "");
    let formatted = x;
    if (x.length > 0 && !x.startsWith("998")) {
      formatted = "998" + x;
    }
    formatted = formatted.substring(0, 12);
    let res = "";
    if (formatted.length > 0) res += "+" + formatted.substring(0, 3);
    if (formatted.length > 3) res += " " + formatted.substring(3, 5);
    if (formatted.length > 5) res += " " + formatted.substring(5, 8);
    if (formatted.length > 8) res += " " + formatted.substring(8, 10);
    if (formatted.length > 10) res += " " + formatted.substring(10, 12);
    return res;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (regData.phone.length < 17) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!");
      return;
    }

    setRegStatus("submitting");
    try {
      const { data: existingReg, error: checkError } = await supabase
        .from("registrations")
        .select("id")
        .eq("event_id", selectedEvent.id)
        .eq("phone", regData.phone);

      if (checkError) throw checkError;

      if (existingReg && existingReg.length > 0) {
        setRegStatus("idle");
        alert("Siz ushbu tadbir uchun allaqachon ro'yxatdan o'tgansiz!");
        return;
      }

      const { error: regError } = await supabase.from("registrations").insert([
        {
          event_id: selectedEvent.id,
          ...regData,
        },
      ]);

      if (regError) throw regError;

      setRegStatus("success");
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id
            ? { ...ev, registered_count: (ev.registered_count || 0) + 1 }
            : ev,
        ),
      );
      setTimeout(() => {
        setShowRegModal(false);
        setRegStatus("idle");
        setRegData({ name: "", phone: "", district: "", email: "" });
      }, 2000);
    } catch (error) {
      console.error(error);
      setRegStatus("error");
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center font-black text-orange-600 animate-pulse">
        YUKLANMOQDA...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            Kelayotgan <span className="text-orange-600">Tadbirlar</span> 🗓
          </h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Master-klasslar, uchrashuvlar va pitch-daylarda ishtirok etib,
            tajribangizni oshiring. Barcha e'lonlar bizning kanalda!
          </p>
        </div>
        <a
          href="https://t.me/tashkent_ambassadors"
          target="_blank"
          className="inline-flex items-center space-x-2 text-orange-600 font-black uppercase tracking-widest hover:translate-x-2 transition-transform"
        >
          <span>Barcha tadbirlar</span>
          <ArrowRight size={20} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center gap-3 mb-10"
      >
        <div className="flex items-center space-x-2 text-gray-400 mr-2">
          <Filter size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Filter:
          </span>
        </div>
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 ${
              selectedType === type
                ? "logo-gradient text-white shadow-lg shadow-orange-100 scale-105"
                : "bg-white text-gray-500 border border-orange-50 hover:border-orange-200"
            }`}
          >
            {type}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={
            filteredEvents.length > 0
              ? "grid grid-cols-1 lg:grid-cols-2 gap-10"
              : ""
          }
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isFull =
                event.capacity !== null &&
                event.registered_count >= event.capacity;

              return (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-[2.5rem] border border-orange-50 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row"
                >
                  <div className="relative md:w-2/5 overflow-hidden flex items-center justify-center bg-gray-100 min-h-[200px]">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90"></div>
                    )}
                    <div className="relative z-10 flex flex-col items-center text-white">
                      <Calendar size={48} className="mb-2 opacity-50" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {event.type}
                      </span>
                    </div>
                    {isFull && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">
                          Joy qolmadi
                        </span>
                      </div>
                    )}
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
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4 font-medium">
                      <MapPin size={16} className="text-orange-300" />
                      <span>{event.location}</span>
                    </div>

                    {event.capacity && (
                      <div className="flex items-center space-x-2 mb-6 text-gray-400">
                        <Users size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {event.registered_count} / {event.capacity} band
                        </span>
                      </div>
                    )}

                    {event.registration_link ? (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-auto flex items-center justify-center space-x-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-sm active:scale-95 ${
                          isFull
                            ? "bg-gray-100 text-gray-400 pointer-events-none"
                            : "bg-gray-50 text-gray-900 hover:bg-orange-600 hover:text-white group-hover:shadow-orange-100"
                        }`}
                      >
                        <span>
                          {isFull ? "Joy qolmadi" : "Ro'yxatdan o'tish"}
                        </span>
                        <ArrowRight size={14} />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="mt-auto block text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        Ro'yxat ochilmagan
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-orange-100 w-full col-span-2"
            >
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-200 mb-6 animate-pulse">
                <Calendar size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                Tadbirlar topilmadi
              </h3>
              <p className="text-gray-400 font-medium text-sm text-center max-w-sm px-6">
                Hozircha ushbu turdagi kelgusi tadbirlar rejalashtirilmagan.
                Yangiliklarni kuzatib boring!
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showRegModal && selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowRegModal(false)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <button
                  onClick={() => setShowRegModal(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>

                <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter leading-none">
                  Ro'yxatdan <span className="text-orange-600">o'tish</span>
                </h3>
                <p className="text-gray-500 font-bold mb-8 uppercase text-[10px] tracking-widest">
                  {selectedEvent.title}
                </p>

                {regStatus === "success" ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} />
                    </div>
                    <h4 className="text-2xl font-black mb-2">
                      Muvaffaqiyatli!
                    </h4>
                    <p className="text-gray-500">
                      Siz muvaffaqiyatli ro'yxatdan o'tdingiz.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        F.I.SH
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ismingizni kiriting"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold"
                        value={regData.name}
                        onChange={(e) =>
                          setRegData({ ...regData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Telefon raqam
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold"
                        value={regData.phone}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            phone: formatPhone(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Tuman
                      </label>
                      <select
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold appearance-none"
                        value={regData.district}
                        onChange={(e) =>
                          setRegData({ ...regData, district: e.target.value })
                        }
                      >
                        <option value="">Tumanni tanlang</option>
                        <option value="Yunusobod">Yunusobod</option>
                        <option value="Yashnobod">Yashnobod</option>
                        <option value="Yakkasaroy">Yakkasaroy</option>
                        <option value="Uchtepa">Uchtepa</option>
                        <option value="Shayxontohur">Shayxontohur</option>
                        <option value="Olmazor">Olmazor</option>
                        <option value="Mirzo Ulug'bek">Mirzo Ulug'bek</option>
                        <option value="Mirobod">Mirobod</option>
                        <option value="Chilonzor">Chilonzor</option>
                        <option value="Sergeli">Sergeli</option>
                        <option value="Bektemir">Bektemir</option>
                        <option value="Yangihayot">Yangihayot</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={regStatus === "submitting"}
                      className="w-full py-5 logo-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-100 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
                    >
                      {regStatus === "submitting"
                        ? "YUBORILMOQDA..."
                        : "YUBORISH"}
                    </button>
                    {regStatus === "error" && (
                      <p className="text-red-500 text-[10px] font-black uppercase text-center mt-2">
                        Xatolik yuz berdi. Qayta urinib ko'ring.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
