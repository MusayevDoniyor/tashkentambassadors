import React, { useState } from "react";
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
} from "lucide-react";

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
      const { error } = await supabase.from("team_requests").insert([
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

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            SO'ROV <span className="text-green-500">YUBORILDI!</span>
          </h2>
          <p className="text-gray-600 font-medium text-lg mb-8">
            Sizning so'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz!
          </p>
          <button
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
            Yana so'rov yuborish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <Rocket size={14} />
          <span>Jamoa Toping</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          STARTUP UCHUN <span className="text-orange-600">JAMOA KERAK?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg px-4">
          Startupingiz uchun kerakli mutaxassis va jamoani biz topib beramiz.
          Formani to'ldiring va biz siz bilan bog'lanamiz!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        {/* Startup Info */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6">
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
        </div>

        {/* Contact Info */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6">
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
        </div>

        {/* Roles Needed */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center space-x-2">
            <Users size={20} className="text-orange-600" />
            <span>Qanday mutaxassis kerak? *</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            Kerakli mutaxassis turlarini belgilang (bir nechta tanlash mumkin)
          </p>

          <div className="flex flex-wrap gap-3">
            {ROLES_NEEDED.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleToggle(role)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  formData.roles_needed.includes(role)
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {formData.roles_needed.includes("Boshqa") && (
            <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
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
            </div>
          )}
        </div>

        {/* Additional Message */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-orange-100/50 shadow-lg space-y-6">
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
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || formData.roles_needed.length === 0}
            className={`inline-flex items-center space-x-3 bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-orange-700 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting ? "animate-pulse" : ""
            }`}
          >
            <span>{isSubmitting ? "Yuborilmoqda..." : "So'rov Yuborish"}</span>
            <Send size={18} />
          </button>
          {formData.roles_needed.length === 0 && (
            <p className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Kamida bitta mutaxassis turini tanlang
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeamRequest;
