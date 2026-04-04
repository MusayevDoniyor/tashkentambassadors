import React from "react";

const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
};

const BackgroundLayer: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 min-h-full overflow-hidden">
    <div className="absolute inset-0" style={gridStyle}></div>
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle at center, #000 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        backgroundPosition: "-1px -1px",
      }}
    ></div>
    <div className="absolute top-[5%] left-[-5%] w-[50%] h-[1000px] bg-orange-200/10 rounded-full blur-[120px]"></div>
    <div className="absolute top-[25%] right-[-10%] w-[45%] h-[800px] bg-orange-100/20 rounded-full blur-[100px]"></div>
    <div className="absolute top-[55%] left-[-5%] w-[40%] h-[700px] bg-amber-50/30 rounded-full blur-[80px]"></div>
    <div
      className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      }}
    ></div>
  </div>
);

export default BackgroundLayer;
