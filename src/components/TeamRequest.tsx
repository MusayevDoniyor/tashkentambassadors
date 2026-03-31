import React, { useState, useEffect } from "react";
import SEO from "./SEO";
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
  AlertCircle,
  Image as ImageIcon,
  Loader2,
  Plus,
} from "lucide-react";
import { Variants } from "framer-motion";
import { JobListing } from "../types";
import { formatDate } from "../lib/utils";

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
  "AI Engineer",
  "Boshqa",
];

const TeamRequest: React.FC = () => {
  const [step, setStep] = useState(1);
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
    logo: null as string | null,
  });
  const [logoUploading, setLogoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    fetchJobListings();
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
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
          logo: null,
        });
      }, 10000); // 10 soniyadan keyin yo'qoladi
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `startups/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, logo: publicUrl }));
    } catch (error: any) {
      console.error("Logo upload error:", error);
      alert(`Logo yuklashda xatolik: ${error.message || "Noma'lum xatolik"}`);
    } finally {
      setLogoUploading(false);
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
          logo: formData.logo || null,
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

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1)
      return (
        formData.startup_name && formData.founder_name && formData.description
      );
    if (step === 2)
      return (
        formData.roles_needed.length > 0 &&
        (!formData.roles_needed.includes("Boshqa") || formData.other_role)
      );
    if (step === 3) return formData.phone;
    return true;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO
          title="Yuborildi | Toshkent Startup Ekotizimi"
          description="E'loningiz muvaffaqiyatli yuborildi."
        />
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            E'LON <span className="text-green-500">YUBORILDI!</span>
          </h2>
          <p className="text-gray-600 font-medium text-lg mb-4">
            Sizning e'loningiz admin tomonidan ko'rib chiqiladi.
          </p>
          <p className="text-gray-500 font-medium text-sm mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
            Tasdiqlangandan keyin e'loningiz saytda ko'rsatiladi. Savollar
            bo'lsa, admin bilan{" "}
            <a
              href="https://t.me/ambassadorsadmin"
              className="text-orange-600 font-black hover:underline"
            >
              @ambassadorsadmin
            </a>{" "}
            orqali bog'laning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
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
                  logo: null,
                });
              }}
              className="w-full sm:w-auto bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-xl shadow-orange-100"
            >
              Yana e'lon berish
            </button>
            <a
              href="/elonlar"
              className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              E'lonlarni ko'rish
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="Jamoa Kerak | Toshkent Startup Ekotizimi"
        description="Toshkent startup ekotizimida o'z loyihangiz uchun kerakli mutaxassislarni toping. Startupingizga yangi talantlarni jalb qiling."
        canonical="https://www.startuptashkent.uz/request"
      />
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-100">
          <Rocket size={14} />
          <span>Jamoa Toping</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          STARTUP UCHUN <span className="text-orange-600">JAMOA KERAK?</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Toshkent startup ekotizimida o'z loyihangiz uchun kerakli
          mutaxassislarni toping.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-3xl mx-auto mb-16 px-4">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-100 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-orange-600 transition-all duration-500 -z-10"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                step >= s
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-300 border-2 border-gray-100"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {["Startup", "Mutaxassis", "Aloqa", "Tekshirish"].map((label, i) => (
            <span
              key={i}
              className={`text-[9px] font-black uppercase tracking-widest ${
                step >= i + 1 ? "text-orange-600" : "text-gray-300"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-20 bg-white/40 backdrop-blur-xl border-2 border-orange-50 p-8 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-50/30 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div>
          {step === 1 && (
            <div className="space-y-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-3xl bg-white border-2 border-dashed border-orange-100 flex items-center justify-center text-gray-400 overflow-hidden hover:border-orange-500 transition-all shadow-sm">
                    {logoUploading ? (
                      <Loader2 className="animate-spin text-orange-600" />
                    ) : formData.logo ? (
                      <img
                        src={formData.logo}
                        className="w-full h-full object-cover"
                        alt="Startup logo"
                      />
                    ) : (
                      <ImageIcon size={32} />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleLogoUpload}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-orange-50 text-orange-600">
                    <Plus size={14} />
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase text-gray-400 mt-3 tracking-widest">
                  Startup Logosi (Ixtiyoriy)
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                    Startup Haqida
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Startup nomi *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.startup_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startup_name: e.target.value,
                        })
                      }
                      placeholder="TechVenture"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.founder_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          founder_name: e.target.value,
                        })
                      }
                      placeholder="Ismingizni kiriting"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Startup tavsifi *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Startupingiz qanday muammo hal qiladi? Qisqacha yozing..."
                    rows={4}
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                    <Users size={20} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                    Mutaxassislar
                  </h3>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Sizga kim kerak? (Bir nechta tanlash mumkin)
                </p>

                <div className="flex flex-wrap gap-3">
                  {ROLES_NEEDED.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleToggle(role)}
                      className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.roles_needed.includes(role)
                          ? "bg-orange-600 text-white shadow-lg shadow-orange-100"
                          : "bg-white text-gray-500 border-2 border-gray-50 hover:border-orange-200"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {formData.roles_needed.includes("Boshqa") && (
                  <div className="pt-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">
                      Kasb nomini yozing *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.other_role}
                      onChange={(e) =>
                        setFormData({ ...formData, other_role: e.target.value })
                      }
                      placeholder="Masalan: AI Engineer"
                      className="w-full bg-white border-2 border-orange-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                    Bog'lanish
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Telefon raqami *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+998 90 000 00 00"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Telegram (Username)
                    </label>
                    <input
                      type="text"
                      value={formData.telegram}
                      onChange={(e) =>
                        setFormData({ ...formData, telegram: e.target.value })
                      }
                      placeholder="@username"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Email (Ixtiyoriy)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Qo'shimcha xabar
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Talablar, maosh yoki boshqa tafsilotlar..."
                    rows={3}
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <div className="space-y-6 text-left">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                    <CheckCircle size={20} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                    Tekshirish
                  </h3>
                </div>

                <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">
                        Startup
                      </span>
                      <p className="text-sm font-black text-gray-900 uppercase">
                        {formData.startup_name}
                      </p>
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">
                        Asoschi
                      </span>
                      <p className="text-sm font-bold text-gray-700">
                        {formData.founder_name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">
                      Kerakli Rollar
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {formData.roles_needed.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white text-orange-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-orange-200"
                        >
                          {r === "Boshqa" ? formData.other_role : r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">
                      Aloqa
                    </span>
                    <p className="text-xs font-bold text-gray-600">
                      {formData.phone}{" "}
                      {formData.telegram && `• ${formData.telegram}`}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3">
                  <AlertCircle
                    size={18}
                    className="text-amber-600 shrink-0 mt-0.5"
                  />
                  <p className="text-[10px] text-amber-700 font-medium leading-relaxed uppercase tracking-wider italic">
                    E'lon yuborilgandan so'ng admin tomonidan tekshiriladi va 24
                    soat ichida e'lon qilinadi.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
          <button
            onClick={prevStep}
            className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              step === 1
                ? "opacity-0 pointer-events-none"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            <span>Qaytish</span>
          </button>

          <button
            disabled={!isStepValid() || isSubmitting}
            onClick={() => (step === 4 ? handleSubmit() : nextStep())}
            className={`flex items-center space-x-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              step === 4
                ? "bg-green-600 text-white shadow-green-100 hover:bg-green-700"
                : "bg-orange-600 text-white shadow-orange-100 hover:bg-orange-700"
            }`}
          >
            <span>
              {step === 4
                ? isSubmitting
                  ? "Yuborilmoqda..."
                  : "Yakunlash"
                : "Davom Etish"}
            </span>
            {step === 4 ? (
              <CheckCircle size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Active Listings Preview */}
      {!loadingListings && jobListings.length > 0 && (
        <div className="max-w-7xl mx-auto mb-20 px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                Aktiv E'lonlar
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                Startuplar hozirda qidirayotgan mutaxassislar
              </p>
            </div>
            <a
              href="/elonlar"
              className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center space-x-1"
            >
              <span>Barchasini ko'rish</span>
              <ChevronRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobListings.slice(0, 3).map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-[2.5rem] p-8 border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  {listing.logo ? (
                    <img
                      src={listing.logo}
                      alt={listing.startup_name}
                      className="w-12 h-12 rounded-2xl object-cover border border-orange-50 bg-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xl uppercase shadow-sm">
                      {listing.startup_name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">
                      {formatDate(listing.created_at)}
                    </span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">
                        Aktiv
                      </span>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                  {listing.startup_name}
                </h4>

                <div className="flex flex-wrap gap-2 mb-8">
                  {listing.roles_needed.slice(0, 3).map((role, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100"
                    >
                      {role}
                    </span>
                  ))}
                  {listing.roles_needed.length > 3 && (
                    <span className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100">
                      +{listing.roles_needed.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {listing.founder_name}
                  </span>
                  <a
                    href="/elonlar"
                    className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm shadow-orange-50"
                  >
                    <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamRequest;
