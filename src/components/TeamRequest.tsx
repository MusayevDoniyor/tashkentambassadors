import React, { useState, useEffect } from "react";
import SEO from "./SEO";
import { apiClient } from "../lib/apiClient";
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
      const data = await apiClient.get<JobListing[]>("job-listings");
      if (data) {
        const approved = data.filter((l) => l.status === "APPROVED");
        setJobListings(approved);
      }
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
      const formData = new FormData();
      formData.append("file", file);

      const data = await apiClient.post<{ url: string }>("/upload", formData);
      
      const publicUrl = data.url.startsWith("http")
        ? data.url
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${data.url.startsWith("/") ? "" : "/"}${data.url}`;

      setFormData((prev) => ({ ...prev, logo: publicUrl }));
    } catch (error: any) {
      console.error("Logo upload error:", error);
      alert(`Logo yuklashda xatolik: ${error.response?.data?.message || error.message || "Noma'lum xatolik"}`);
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
      await apiClient.post("job-listings", {
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
      });

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

      <div className="max-w-3xl mx-auto mb-20 bg-white/40 backdrop-blur-xl border-2 border-orange-50 p-8 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-50/30 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-8 shadow-inner shadow-orange-200/50">
            <Send size={40} />
          </div>
          <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            BOT ORQALI <span className="text-orange-600">TOPSHIRING!</span>
          </h3>
          <p className="text-gray-600 font-medium text-lg mb-10 leading-relaxed">
            Startup topshirish va jamoa yig'ish platformasi endi to'liq 
            Telegram botimizga o'tkazildi. Hoziroq botga o'ting va loyihangizni e'lon qiling!
          </p>
          <a
            href="https://t.me/startuptashkent_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-2xl shadow-orange-200 active:scale-95"
          >
            <span>BOTGA O'TISH</span>
            <ChevronRight size={20} />
          </a>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-start space-x-3 text-left">
            <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
              Sayt orqali topshirish vaqtinchalik to'xtatildi. Barcha mavjud e'lonlar 
              quyida ko'rsatilgan va ularni bot orqali ham boshqarishingiz mumkin.
            </p>
          </div>
        </div>
      </div>

      {/* Active Listings Preview */}
      {!loadingListings && jobListings.length > 0 && (
        <div className="max-w-7xl mx-auto mb-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
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
