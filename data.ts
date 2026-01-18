
import { Ambassador, Event, BlogPost, TrainingProgram, VentureFund, Mentor } from './types';

export const AMBASSADORS: Ambassador[] = [
  {
    id: 1,
    name: "Azizbek Rahmonov",
    district: "Chilonzor",
    role: "Lead Ambassador",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@azizbek_dev", linkedin: "#" }
  },
  {
    id: 11,
    name: "Sardor Ikromov",
    district: "Chilonzor",
    role: "Org Team",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@sardor_i" }
  },
  {
    id: 2,
    name: "Malika Karimova",
    district: "Yunusobod",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@malika_k", instagram: "#" }
  },
  {
    id: 3,
    name: "Jasur Islomov",
    district: "Mirobod",
    role: "Venture Liaison",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@jasur_startup" }
  },
  {
    id: 4,
    name: "Shahlo Mirzaeva",
    district: "Mirzo Ulug'bek",
    role: "Education Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    socials: { linkedin: "#" }
  },
  {
    id: 5,
    name: "Doston Olimov",
    district: "Shayxontohur",
    role: "Tech Advisor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@doston_tech" }
  },
  {
    id: 55,
    name: "Bekzod Aliev",
    district: "Shayxontohur",
    role: "Ambassador",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@bekzod_a" }
  },
  {
    id: 6,
    name: "Sitora Ahmedova",
    district: "Uchtepa",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    socials: { instagram: "#" }
  }
];

export const VENTURE_FUNDS: VentureFund[] = [
  {
    id: 1,
    name: "AloqaVentures",
    logo: "https://raw.githubusercontent.com/aloqaventures/brand-assets/main/logo_dark.png",
    description: "O'zbekistondagi yetakchi korporativ venchur fondi. Texnologik va innovatsion loyihalarni qo'llab-quvvatlaydi.",
    website: "https://aloqaventures.uz"
  },
  {
    id: 2,
    name: "Yoshlar Ventures",
    logo: "https://yoshlarventures.uz/images/logo.png",
    description: "Yoshlar tadbirkorligini va innovatsion g'oyalarini moliyalashtiruvchi davlat investitsiya fondi.",
    website: "https://yoshlarventures.uz"
  },
  {
    id: 3,
    name: "UzVC",
    logo: "https://uzvc.uz/static/media/logo.6450c059.png",
    description: "O'zbekiston Milliy venchur fondi. Yuqori texnologiyali startuplarga investitsiya kiritadi.",
    website: "https://uzvc.uz"
  }
];

export const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Farhod Tillaev",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    role: "Investment Partner",
    expertise: "Venture Capital & Business Development",
    socials: { linkedin: "https://linkedin.com/in/farhod-tillaev", telegram: "@farhod_t" }
  },
  {
    id: 2,
    name: "Alisher Umarov",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    role: "Product Strategy Advisor",
    expertise: "FinTech & Product Management",
    socials: { linkedin: "https://linkedin.com/in/alisher-u", telegram: "@alisher_u" }
  },
  {
    id: 3,
    name: "Dilshod Zufarov",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    role: "Legal & Operations",
    expertise: "Startup Law & Operational Excellence",
    socials: { linkedin: "https://linkedin.com/in/zufarov", telegram: "@dzufarov" }
  }
];

export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Startup Idea Generation Workshop",
    date: "15-Mart, 2024",
    time: "14:00",
    location: "IT Park, Tashkent",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Venture Capital Networking Night",
    date: "22-Mart, 2024",
    time: "18:30",
    location: "Yoshlar Ventures Hub",
    type: "Meetup",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Startupni qanday boshlash kerak?",
    excerpt: "G'oyadan tortib birinchi investitsiyagacha bo'lgan bosqichlar haqida to'liq qo'llanma.",
    date: "1-Mart, 2024",
    category: "Ta'lim",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    author: "Azizbek Rahmonov"
  },
  {
    id: 2,
    title: "O'zbekistondagi Venture Fondlar",
    excerpt: "Loyiha uchun investitsiya qayerdan olish mumkin? Eng faol fondlar sharhi.",
    date: "5-Mart, 2024",
    category: "Investitsiya",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: "Jasur Islomov"
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 1,
    title: "G'oya Validatsiyasi",
    description: "Sizning g'oyangiz bozorda ishlaydimi? Buni tekshirish usullarini o'rgatamiz.",
    icon: "Lightbulb"
  },
  {
    id: 2,
    title: "Pitch Deck Tayyorlash",
    description: "Investorlar ko'zini quvontiradigan va ishonch uyg'otadigan prezentatsiya sirlari.",
    icon: "Presentation"
  },
  {
    id: 3,
    title: "Biznes Modellashtirish",
    description: "Loyihangiz qanday qilib pul ishlashini aniq hisob-kitoblar bilan ko'rsatish.",
    icon: "PieChart"
  },
  {
    id: 4,
    title: "Network & Connection",
    description: "Toshkentdagi eng kuchli mentorlar va fondlar bilan to'g'ridan-to'g'ri bog'lanish.",
    icon: "Users"
  }
];
