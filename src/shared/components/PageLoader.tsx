import React from "react";

const PageLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-32 space-y-4">
    <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest animate-pulse">
      Sahifa yuklanmoqda...
    </span>
  </div>
);

export default PageLoader;
