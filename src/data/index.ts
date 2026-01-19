import {
  Ambassador,
  Event,
  BlogPost,
  TrainingProgram,
  VentureFund,
  Mentor,
} from "../types";

export const AMBASSADORS: Ambassador[] = [
  {
    id: 1,
    name: "Bobur",
    district: "Toshkent",
    role: "Marketing & Web Support",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@boburjon_m" },
  },
  {
    id: 2,
    name: "Husnida",
    district: "Toshkent",
    role: "Deputy Leader",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@husnida_a" },
  },
  {
    id: 3,
    name: "Iroda",
    district: "Toshkent",
    role: "Presentation & Event Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@iroda_p" },
  },
  {
    id: 4,
    name: "Muhammadmin",
    district: "Toshkent",
    role: "Media Manager & Event Team",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@muhammadmin_m" },
  },
  {
    id: 5,
    name: "Doniyor",
    district: "Toshkent",
    role: "Web & Event Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@doniyor_dev" },
  },
  {
    id: 6,
    name: "Jahongir",
    district: "Toshkent",
    role: "Web & Event Manager",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@jahongir_j" },
  },
  {
    id: 7,
    name: "Bexruz",
    district: "Toshkent",
    role: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@bexruz_dev" },
  },
  {
    id: 8,
    name: "Ibrat",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@ibrat_e" },
  },
  {
    id: 9,
    name: "Yulduz",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@yulduz_e" },
  },
  {
    id: 10,
    name: "Feruzbek",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@feruzbek_e" },
  },
  {
    id: 11,
    name: "Shaxruza",
    district: "Toshkent",
    role: "Media Team",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@shaxruza_m" },
  },
  {
    id: 12,
    name: "Munisa",
    district: "Toshkent",
    role: "Media Team & Deputy",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@munisa_m" },
  },
  {
    id: 13,
    name: "Afruza",
    district: "Toshkent",
    role: "Media Team",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@afruza_m" },
  },
  {
    id: 14,
    name: "Sardor",
    district: "Toshkent",
    role: "Media Team",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@sardor_media" },
  },
  {
    id: 15,
    name: "Oloviddin",
    district: "Toshkent",
    role: "Team Leader",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@oloviddin_tl" },
  },
  {
    id: 16,
    name: "Ruxshona",
    district: "Toshkent",
    role: "Marketing Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@ruxshona_m" },
  },
  {
    id: 17,
    name: "S. Muhammadmin",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@muhammadmin_s" },
  },
  {
    id: 18,
    name: "Rasul",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@rasul_e" },
  },
  {
    id: 19,
    name: "Zeboxon",
    district: "Toshkent",
    role: "Event Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@zeboxon_e" },
  },
  {
    id: 20,
    name: "Gulzoda",
    district: "Toshkent",
    role: "Deputy & Event Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@gulzoda_e" },
  },
  {
    id: 21,
    name: "Mavluda",
    district: "Toshkent",
    role: "Media Team",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@mavluda_m" },
  },
  {
    id: 22,
    name: "Xanifa",
    district: "Toshkent",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@xanifa_o" },
  },
  {
    id: 23,
    name: "Sardorbek",
    district: "Toshkent",
    role: "Operations Specialist",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@sardorbek_o" },
  },
  {
    id: 24,
    name: "Muhammadamin Abdolimov",
    district: "Toshkent",
    role: "Media Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { telegram: "@m_abdolimov" },
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
