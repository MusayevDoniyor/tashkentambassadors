import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Rocket,
  Send,
  CheckCircle,
  Users,
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ChevronRight,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const ROLES_NEEDED = [
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Marketing Specialist",
  "Content Writer",
  "Video Editor",
  "Project Manager",
  "Data Analyst",
  "DevOps Engineer",
  "Boshqa",
];

interface JobListing {
  id: string;
  startup_name: string;
  founder_name: string;
  phone: string;
  telegram: string | null;
  email: string | null;
  description: string;
  roles_needed: string[];
  message: string | null;
  status: string;
  created_at: string;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const TeamRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    startup_name: "",
    founder_name: "",
    phone: "",
    email: "",
    telegram: "",
    description: "",
    roles_needed: [] as string[],
    other_role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const { data } = await supabase
        .from("job_listings")
        .select("*")
        .eq("status", "APPROVED")
        .order("created_at", { ascending: false });
      if (data) setJobListings(data);
    } catch (err) {
      console.error("Error fetching job listings:", err);
    } finally {
      setLoadingListings(false);
    }
  };

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles_needed: prev.roles_needed.includes(role)
        ? prev.roles_needed.filter((r) => r !== role)
        : [...prev.roles_needed, role],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalRoles = formData.roles_needed.map((role) =>
      role === "Boshqa" && formData.other_role
        ? `Boshqa: ${formData.other_role}`
        : role,
    );

    try {
      const { error } = await supabase.from("job_listings").insert([
        {
          startup_name: formData.startup_name,
          founder_name: formData.founder_name,
          phone: formData.phone,
          email: formData.email || null,
          telegram: formData.telegram || null,
          description: formData.description,
          roles_needed: finalRoles,
          message: formData.message || null,
          status: "PENDING",
        },
      ]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center py-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            E'LON <span className="text-green-500">YUBORILDI!</span>
          </h2>
          <p className="text-gray-600 font-medium text-lg mb-4">
            Sizning e'loningiz admin tomonidan ko'rib chiqiladi.
          </p>
          <p className="text-gray-500 font-medium text-sm mb-8">
            Tasdiqlangandan keyin e'loningiz saytda ko'rsatiladi. Admin bilan{" "}
            <a
              href="https://t.me/tashkent_ambassadors"
              className="text-orange-600 hover:underline"
            >
              Telegram
            </a>{" "}
            orqali bog'laning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                startup_name: "",
                founder_name: "",
                phone: "",
                email: "",
                telegram: "",
                description: "",
                roles_needed: [],
                other_role: "",
                message: "",
              });
            }}
            className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-colors"
          >
            Yana e'lon berish
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <Rocket size={14} />
          <span>Jamoa Toping</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          STARTUP UCHUN <span className="text-orange-600">JAMOA KERAK?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg px-4">
          Aktiv e'lonlarni ko'ring yoki startupingiz uchun yangi e'lon bering.
        </p>
      </motion.div>

      {/* Active Job Listings */}
      {!loadingListings && jobListings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">
              Aktiv E'lonlar
            </h3>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
              {jobListings.length} ta
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] border-2 border-orange-50 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-orange-600 transition-colors">
                      {listing.startup_name}
                    </h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {listing.founder_name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300">
                    <Clock size={12} />
                    <span className="text-[9px] font-bold">
                      {formatDate(listing.created_at)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.roles_needed.slice(0, 4).map((role, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100"
                    >
                      {role}
                    </span>
                  ))}
                  {listing.roles_needed.length > 4 && (
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      +{listing.roles_needed.length - 4} ta
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-50">
                  {listing.telegram && (
                    <a
                      href={`https://t.me/${listing.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors font-bold text-xs"
                    >
                      <Send size={14} />
                      <span>
                        {listing.telegram.startsWith("@")
                          ? listing.telegram
                          : `@${listing.telegram}`}
                      </span>
                    </a>
                  )}
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors font-bold text-xs"
                    >
                      <Phone size={14} />
                      <span>{listing.phone}</span>
                    </a>
                  )}
                  <ChevronRight
                    size={16}
                    className="ml-auto text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {loadingListings && (
        <div className="text-center py-8 mb-12">
          <div className="inline-block w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="h-px flex-1 bg-gray-100"></div>
        <div className="mx-6 px-4 py-2 bg-orange-50 rounded-full text-orange-600 text-[10px] font-black uppercase tracking-widest">
          E'lon Berish
        </div>
        <div className="h-px flex-1 bg-gray-100"></div>
      </div>

      <p className="text-center text-gray-500 font-medium text-sm mb-10 max-w-xl mx-auto">
        Startupingiz uchun kerakli mutaxassis toping. E'loningiz admin tomonidan
        tasdiqlanganidan keyin saytda ko'rinadi.
      </p>

      <motion.form
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Startup Info */}
        <motion.div
          variants={sectionVariants}
          className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6"
        >
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center space-x-2">
            <Briefcase size={20} className="text-orange-600" />
            <span>Startup haqida</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                Startup nomi *
              </label>
              <input
                type="text"
                required
                value={formData.startup_name}
                onChange={(e) =>
                  setFormData({ ...formData, startup_name: e.target.value })
                }
                placeholder="Masalan: TechVenture"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                Asoschining ismi *
              </label>
              <input
                type="text"
                required
                value={formData.founder_name}
                onChange={(e) =>
                  setFormData({ ...formData, founder_name: e.target.value })
                }
                placeholder="Ismingiz"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
              Startup tavsifi *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Startupingiz nima qiladi? Qanday muammo hal qiladi?"
              rows={3}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all resize-none"
            />
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={sectionVariants}
          className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6"
        >
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center space-x-2">
            <Mail size={20} className="text-orange-600" />
            <span>Aloqa ma'lumotlari</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                <Phone size={12} className="inline mr-1" /> Telefon *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+998 90 123 45 67"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                <Send size={12} className="inline mr-1" /> Telegram
              </label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) =>
                  setFormData({ ...formData, telegram: e.target.value })
                }
                placeholder="@username"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                <Mail size={12} className="inline mr-1" /> Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Roles Needed */}
        <motion.div
          variants={sectionVariants}
          className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6"
        >
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center space-x-2">
            <Users size={20} className="text-orange-600" />
            <span>Qanday mutaxassis kerak? *</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            Kerakli mutaxassis turlarini belgilang (bir nechta tanlash mumkin)
          </p>

          <div className="flex flex-wrap gap-3">
            {ROLES_NEEDED.map((role) => (
              <motion.button
                key={role}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleToggle(role)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  formData.roles_needed.includes(role)
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {role}
              </motion.button>
            ))}
          </div>

          {formData.roles_needed.includes("Boshqa") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                Qanday mutaxassis kerakligini yozing *
              </label>
              <input
                type="text"
                required
                value={formData.other_role}
                onChange={(e) =>
                  setFormData({ ...formData, other_role: e.target.value })
                }
                placeholder="Masalan: AI Engineer, Blockchain Expert"
                className="w-full bg-gray-50 border-2 border-orange-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-inner"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Additional Message */}
        <motion.div
          variants={sectionVariants}
          className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6"
        >
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center space-x-2">
            <MessageSquare size={20} className="text-orange-600" />
            <span>Qo'shimcha xabar</span>
          </h3>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Qanday tajribali odam kerak? Qo'shimcha talablaringiz bormi?"
            rows={4}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all resize-none"
          />
        </motion.div>

        {/* Submit */}
        <motion.div variants={sectionVariants} className="text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting || formData.roles_needed.length === 0}
            whileHover={{
              y: -2,
              boxShadow: "0 20px 40px rgba(234, 88, 12, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center space-x-3 bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting ? "animate-pulse" : ""
            }`}
          >
            <span>{isSubmitting ? "Yuborilmoqda..." : "E'lon Berish"}</span>
            <Send size={18} />
          </motion.button>
          {formData.roles_needed.length === 0 && (
            <p className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Kamida bitta mutaxassis turini tanlang
            </p>
          )}
        </motion.div>
      </motion.form>
    </div>
  );
};

export default TeamRequest;
