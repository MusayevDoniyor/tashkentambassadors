import React from "react";
import { TEAM_STRUCTURE } from "../data/team";
import { Ambassador } from "../types";
import {
  Send,
  Linkedin,
  Users,
  Sparkles,
  ChevronRight,
  Award,
  Rocket,
  Code,
  Camera,
  Megaphone,
} from "lucide-react";

const MemberCard: React.FC<{
  member: Ambassador;
  isLeader?: boolean;
  isOverallLeader?: boolean;
  accentColor?: string;
}> = ({ member, isLeader, isOverallLeader, accentColor = "orange" }) => {
  const colorMap: Record<string, string> = {
    orange: "from-orange-500 to-orange-600 border-orange-200 shadow-orange-100",
    blue: "from-blue-500 to-blue-600 border-blue-200 shadow-blue-100",
    purple: "from-purple-500 to-purple-600 border-purple-200 shadow-purple-100",
    emerald:
      "from-emerald-500 to-emerald-600 border-emerald-200 shadow-emerald-100",
    rose: "from-rose-500 to-rose-600 border-rose-200 shadow-rose-100",
  };

  const shadowColor: Record<string, string> = {
    orange: "group-hover:shadow-orange-200",
    blue: "group-hover:shadow-blue-200",
    purple: "group-hover:shadow-purple-200",
    emerald: "group-hover:shadow-emerald-200",
    rose: "group-hover:shadow-rose-200",
  };

  return (
    <div
      className={`
      relative group flex flex-col items-center
      ${isOverallLeader ? "scale-105 mb-10" : isLeader ? "scale-100 mb-6" : "scale-90"}
      transition-all duration-700 ease-out
    `}
    >
      {/* Decorative Outer Glow */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-br ${colorMap[accentColor]} 
        opacity-0 group-hover:opacity-20 blur-2xl rounded-full transition-opacity duration-700
      `}
      />

      <div
        className={`
        relative overflow-hidden rounded-[2.5rem] border-4 
        ${isOverallLeader ? "w-48 h-48 border-orange-500 shadow-2xl" : isLeader ? "w-40 h-40 border-white shadow-xl" : "w-28 h-28 border-white shadow-md"}
        bg-white transition-all duration-700 ${shadowColor[accentColor]}
      `}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
          <div className="flex justify-center space-x-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {member.socials.telegram && (
              <a
                href={`https://t.me/${member.socials.telegram.replace("@", "")}`}
                target="_blank"
                className="p-2 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white hover:text-black transition-all"
              >
                <Send size={16} />
              </a>
            )}
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                className="p-2 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white hover:text-black transition-all"
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {isOverallLeader && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white p-2 rounded-2xl shadow-lg border-2 border-white animate-pulse">
            <Sparkles size={14} />
          </div>
        )}
      </div>

      <div className="mt-4 text-center px-4 py-2 rounded-2xl transition-all duration-500 group-hover:bg-white group-hover:shadow-sm">
        <h3
          className={`font-black uppercase tracking-tight leading-none ${isOverallLeader ? "text-2xl text-gray-900 mb-1" : isLeader ? "text-lg text-gray-800" : "text-xs text-gray-600"}`}
        >
          {member.name}
        </h3>
        <div className="flex items-center justify-center space-x-2">
          {isLeader && (
            <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}-500`} />
          )}
          <p
            className={`font-black uppercase tracking-[0.2em] text-${accentColor}-600 ${isOverallLeader ? "text-[10px]" : "text-[8px] opacity-80"}`}
          >
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const ConnectingLines: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FED7AA" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFEDD5" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

const DepartmentIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name.includes("Website")) return <Code size={14} />;
  if (name.includes("Media")) return <Camera size={14} />;
  if (name.includes("Event")) return <Rocket size={14} />;
  if (name.includes("Marketing")) return <Megaphone size={14} />;
  if (name.includes("Presentation")) return <Award size={14} />;
  return <Users size={14} />;
};

const TeamTree: React.FC = () => {
  const accentClasses: Record<
    string,
    { bg: string; text: string; border: string; hoverBorder: string }
  > = {
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-100",
      hoverBorder: "group-hover:border-orange-400",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      hoverBorder: "group-hover:border-blue-400",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      hoverBorder: "group-hover:border-purple-400",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      hoverBorder: "group-hover:border-emerald-400",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      hoverBorder: "group-hover:border-rose-400",
    },
  };

  const getDeptColor = (name: string) => {
    if (name.includes("Website")) return "blue";
    if (name.includes("Media")) return "purple";
    if (name.includes("Event")) return "emerald";
    if (name.includes("Marketing")) return "rose";
    if (name.includes("Operations")) return "orange";
    return "orange";
  };

  return (
    <div className="py-20 px-4 w-full bg-gray-50/10 min-h-screen">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* TOP LEVEL: Overall Leader */}
        <div className="relative mb-32 flex flex-col items-center">
          <div className="absolute -top-24 text-[80px] md:text-[140px] font-black text-gray-200/30 select-none tracking-tighter uppercase whitespace-nowrap">
            PREMIUM TEAM
          </div>
          <MemberCard
            member={TEAM_STRUCTURE.overallLeader}
            isOverallLeader
            accentColor="orange"
          />

          {/* Main Stem with Pulse Effect */}
          <div className="absolute top-[200px] w-1 h-20 md:h-32 bg-gradient-to-b from-orange-400 via-orange-200 to-transparent">
            <div className="absolute inset-0 bg-orange-400 blur-md opacity-20 animate-pulse" />
          </div>
        </div>

        {/* SECOND LEVEL: Deputies */}
        <div className="relative mb-40 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-40">
          {TEAM_STRUCTURE.deputyLeaders.map((deputy, idx) => (
            <div key={idx} className="relative group">
              {/* Curved connection line logic simplified for better visuals */}
              <div
                className={`hidden md:block absolute -top-12 ${idx === 0 ? "-right-[80%]" : "-left-[80%]"} w-[100%] h-12 border-t-2 border-orange-200/50 rounded-t-[4rem]`}
              />
              <MemberCard member={deputy} isLeader accentColor="orange" />
            </div>
          ))}
        </div>

        {/* THIRD LEVEL: Departments Grid - Dynamic Layout */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-24 w-full">
          {TEAM_STRUCTURE.departments.map((dept, idx) => {
            const colorKey = getDeptColor(dept.name);
            const classes = accentClasses[colorKey];
            const hasMembers = dept.members.length > 0;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center relative transition-all duration-500 ${hasMembers ? "w-full md:w-[400px] xl:w-[450px]" : "w-full md:w-[280px]"}`}
              >
                {/* Department Header */}
                <div className="group relative">
                  <div
                    className={`
                    mb-10 px-6 py-3 bg-white rounded-[2rem] border-2 shadow-sm
                    flex items-center space-x-3 transition-all duration-500
                    ${classes.border} ${classes.hoverBorder} group-hover:-translate-y-1 group-hover:shadow-lg
                  `}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${classes.bg} ${classes.text}`}
                    >
                      <DepartmentIcon name={dept.name} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">
                      {dept.name}
                    </span>
                  </div>
                </div>

                {/* Department Leader */}
                <div className="relative mb-8">
                  <MemberCard
                    member={dept.leader}
                    isLeader
                    accentColor={colorKey}
                  />
                </div>

                {/* Vertical Divider & Members - Only if they exist */}
                {hasMembers && (
                  <>
                    <div className="w-full relative py-6 flex items-center justify-center">
                      <div className="w-px h-full bg-gradient-to-b from-gray-200 via-gray-100 to-transparent absolute" />
                      <div
                        className={`relative px-4 bg-white z-10 text-[7px] font-black uppercase tracking-widest text-gray-400`}
                      >
                        Jamoa A'zolari
                      </div>
                    </div>

                    {/* Members List */}
                    <div className="flex flex-wrap justify-center gap-6 mt-4 px-4">
                      {dept.members.map((member) => (
                        <div key={member.id} className="w-24">
                          <MemberCard member={member} accentColor={colorKey} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .tree-line {
          stroke-dasharray: 10;
          animation: flow 5s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default TeamTree;
