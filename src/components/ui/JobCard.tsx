import React from "react";
import { JobListing } from "../../types";
import { formatDate, isNewListing } from "../../lib/utils";
import {
  Clock,
  ChevronDown,
  Rocket,
  Send,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface JobCardProps {
  listing: JobListing;
  isExpanded: boolean;
  onToggle: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  listing,
  isExpanded,
  onToggle,
}) => {
  const isNew = isNewListing(listing.created_at);

  const handleContactAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (listing.telegram) {
      window.open(
        `https://t.me/${listing.telegram.replace("@", "")}`,
        "_blank",
      );
    } else if (listing.phone) {
      window.open(`tel:${listing.phone}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden group ${
        isExpanded
          ? "border-orange-200 shadow-2xl scale-[1.01]"
          : "border-gray-50 hover:border-orange-100 hover:shadow-xl shadow-sm"
      }`}
    >
      <div className="p-1">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center p-7 cursor-pointer"
          onClick={onToggle}
        >
          {/* Company Info */}
          <div className="flex items-center space-x-5 flex-1 min-w-0 mb-6 sm:mb-0">
            <div className="relative shrink-0 mt-1">
              {listing.logo ? (
                <img
                  src={listing.logo}
                  className="w-16 h-16 rounded-3xl object-cover shadow-lg shadow-orange-100 border border-orange-50 bg-white"
                  alt={listing.startup_name}
                />
              ) : (
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-3xl uppercase shadow-lg shadow-orange-100">
                  {listing.startup_name.charAt(0)}
                </div>
              )}
              {isNew && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-md">
                  Yangi
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-orange-600 transition-colors truncate mb-1">
                {listing.startup_name}
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {listing.founder_name}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                <div className="flex items-center space-x-1 text-gray-300">
                  <Clock size={12} />
                  <span className="text-[9px] font-bold">
                    {formatDate(listing.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Role Preview Tags */}
          <div className="flex flex-wrap gap-2 items-center sm:ml-4 sm:mr-8 max-w-xs justify-start sm:justify-end">
            {listing.roles_needed.slice(0, 2).map((role, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-orange-50/50 text-orange-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-orange-100 group-hover:bg-orange-50 transition-colors"
              >
                {role}
              </span>
            ))}
            {listing.roles_needed.length > 2 && (
              <span className="px-2 py-1.5 bg-gray-50 text-gray-400 rounded-xl text-[9px] font-black uppercase">
                +{listing.roles_needed.length - 2}
              </span>
            )}
            <div className="sm:hidden w-full h-px bg-gray-50 my-4"></div>
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isExpanded
                  ? "bg-orange-600 text-white rotate-180"
                  : "bg-gray-50 text-gray-300 group-hover:bg-orange-50 group-hover:text-orange-600"
              }`}
            >
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Expandable Detail Section */}
        {isExpanded && (
          <div className="overflow-hidden">
            <div className="p-8 pt-2 border-t border-gray-50 bg-gray-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        Startup haqida batafsil
                      </h4>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        Mutaxassislikka talablar
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {listing.roles_needed.map((role, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white text-orange-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-100 shadow-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {listing.message && (
                    <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Rocket size={40} />
                      </div>
                      <h4 className="text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] mb-3">
                        Asoschidan xabar
                      </h4>
                      <p className="text-gray-600 text-sm font-bold italic leading-relaxed">
                        "{listing.message}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                      Bog'lanish uchun
                    </h4>
                    <div className="space-y-4">
                      {listing.telegram && (
                        <a
                          href={`https://t.me/${listing.telegram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between group/link bg-gray-50 p-4 rounded-2xl hover:bg-orange-600 hover:text-white transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <Send
                              size={18}
                              className="text-orange-600 group-hover/link:text-white"
                            />
                            <span className="text-xs font-black uppercase tracking-widest">
                              Telegram
                            </span>
                          </div>
                          <ExternalLink
                            size={14}
                            className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                          />
                        </a>
                      )}
                      {listing.phone && (
                        <a
                          href={`tel:${listing.phone}`}
                          className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors w-full"
                        >
                          <Phone size={18} className="text-gray-400" />
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                              Telefon
                            </span>
                            <span className="text-xs font-black text-gray-900">
                              {listing.phone}
                            </span>
                          </div>
                        </a>
                      )}
                      {listing.email && (
                        <a
                          href={`mailto:${listing.email}`}
                          className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors w-full"
                        >
                          <Mail size={18} className="text-gray-400" />
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                              Email
                            </span>
                            <span className="text-xs font-black text-gray-900 truncate max-w-[150px]">
                              {listing.email}
                            </span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleContactAction}
                    className="w-full bg-orange-600 text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center justify-center space-x-3"
                  >
                    <span>Loyiha bilan tanishish</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
