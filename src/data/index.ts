import {
  Ambassador,
  Event,
  BlogPost,
  TrainingProgram,
  VentureFund,
  Mentor,
} from "../types";

// Helper to get coordinates for districts
const getDistrictCoords = (district: string): [number, number] => {
  const districts: Record<string, [number, number]> = {
    Yunusobod: [41.3646, 69.2878],
    Yashnobod: [41.2934, 69.34],
    Yakkasaroy: [41.282, 69.2559],
    Uchtepa: [41.2933, 69.1764],
    Shayxontohur: [41.3214, 69.223],
    Olmazor: [41.3533, 69.2155],
    "Mirzo Ulugbek": [41.3346, 69.3468],
    "Mirzo Ulug'bek": [41.3346, 69.3468],
    Mirobod: [41.2882, 69.2889],
    Chilonzor: [41.2721, 69.2045],
    Sergeli: [41.2263, 69.2198],
    Bektemir: [41.2368, 69.3664],
    Yangihayot: [41.202, 69.202],
  };
  return districts[district] || [41.2995, 69.2401];
};

export const AMBASSADORS: Ambassador[] = [
  {
    id: 1,
    name: "Oloviddin",
    district: "Uchtepa",
    coordinates: getDistrictCoords("Uchtepa"),
    role: "Team Leader",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "https://t.me/oloviddin_blog" },
  },
  {
    id: 2,
    name: "Bobur",
    district: "Shayxontohur",
    coordinates: getDistrictCoords("Shayxontohur"),
    role: "Web Team Leader",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "https://t.me/senpaisenpai" },
  },
  {
    id: 3,
    name: "Muhammadamin",
    district: "Mirzo Ulugbek",
    coordinates: getDistrictCoords("Mirzo Ulugbek"),
    role: "Media Team Leader",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "https://t.me/abdolimoff" },
  },
  {
    id: 4,
    name: "Ibratilla",
    district: "Yunusobod",
    coordinates: getDistrictCoords("Yunusobod"),
    role: "Event Team Leader",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "https://t.me/Ibrat_z1yodullayev" },
  },
];

export const VENTURE_FUNDS: VentureFund[] = [
  {
    id: 1,
    name: "AloqaVentures",
    logo: "https://aloqaventures.uz/img/logo-dark.svg",
    description:
      "O'zbekistondagi eng yirik korporativ venchur fondi. Aloqabank qoshida tashkil etilgan bo'lib, innovatsion startuplarni moliyalashtiradi.",
    website: "https://aloqaventures.uz",
  },
  {
    id: 2,
    name: "Yoshlar Ventures",
    logo: "https://yoshlarventures.uz/images/logo.png",
    description:
      "Yoshlar ishlari agentligi qoshidagi investitsiya fondi. Yoshlar tomonidan ilgari surilgan istiqbolli loyihalarni qo'llab-quvvatlaydi.",
    website: "https://yoshlarventures.uz",
  },
  {
    id: 3,
    name: "UzVC",
    logo: "https://uzvc.uz/static/media/logo.6450c059.png",
    description:
      "O'zbekiston Milliy venchur fondi. Global bozorlarga chiqish niyatida bo'lgan yuqori texnologiyali loyihalarga investitsiya kiritadi.",
    website: "https://uzvc.uz",
  },
];

export const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Farhod Tillaev",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    role: "Investment Director",
    expertise: "Venture Capital & Finance",
    socials: { linkedin: "https://linkedin.com", telegram: "@farhod_t" },
  },
  {
    id: 2,
    name: "Dilshod Zufarov",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    role: "Venture Builder",
    expertise: "Business Operations & Strategy",
    socials: { linkedin: "https://linkedin.com", telegram: "@zufarov" },
  },
  {
    id: 3,
    name: "Sarvar Ruzmatov",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    role: "Tech Advisor",
    expertise: "Software Engineering & Scaling",
    socials: { linkedin: "https://linkedin.com", telegram: "@sarvar_r" },
  },
];

export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Startup Pitch Day #1",
    date: "25-Mart, 2024",
    time: "15:00",
    location: "AloqaVentures Hub",
    type: "Pitch Day",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Mentorship Session with Experts",
    date: "30-Mart, 2024",
    time: "11:00",
    location: "Yoshlar Markazi",
    type: "Workshop",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Venchur fond nima va u startuplarga nega kerak?",
    excerpt:
      "Investitsiya jalb qilishning asosiy qoidalari va fondlar bilan ishlash sirlari.",
    date: "12-Mart, 2024",
    category: "Investitsiya",
    image:
      "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800",
    author: "Hamjamiyat Jamoasi",
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 1,
    title: "Ideation & Validation",
    description:
      "G'oyangizni real bozor talablariga muvofiqligini tekshirish jarayoni.",
    icon: "Lightbulb",
  },
  {
    id: 2,
    title: "Fundraising Strategy",
    description:
      "Investorlar bilan uchrashuvga tayyorgarlik va moliyaviy modellarni tuzish.",
    icon: "PieChart",
  },
];
