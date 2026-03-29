// Sana(Date)ni inson o'qiy oladigan tilda qaytaradi
export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  
  // Faqat kunlar farqini hisoblash
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Bugun";
  if (diffDays === 1) return "Kecha";
  if (diffDays < 7) return `${diffDays} kun oldin`;
  
  return d.toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
  });
};

// Yangi e'lon ekanligini 48 soat ichida aniqlaydi
export const isNewListing = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffHours = (now.getTime() - d.getTime()) / 3600000;
  return diffHours < 48;
};

// Elementni smooth qilib scroll qilish uchun funksiya
export const smoothScrollTo = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};
