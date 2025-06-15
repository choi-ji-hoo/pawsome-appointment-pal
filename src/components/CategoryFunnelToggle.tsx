
import React from "react";
import { Dog, Cat, Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FunnelCategory {
  label: string;
  value: string;
  iconKey: keyof typeof FUNNEL_ICONS;
}

const FUNNEL_ICONS: Record<string, React.ReactNode> = {
  hospital: <Calendar strokeWidth={2.1} size={32} />,
  prevent: <Syringe strokeWidth={2.1} size={32} />,
  den: <HeartPulse strokeWidth={2.1} size={32} />,
  ortho: <Bone strokeWidth={2.1} size={32} />,
};

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  funnelList: FunnelCategory[];
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const speciesTabs = [
  { label: "강아지", value: "강아지", icon: <Dog size={34} strokeWidth={2.2} /> },
  { label: "고양이", value: "고양이", icon: <Cat size={34} strokeWidth={2.2} /> },
];

const CategoryFunnelToggle = ({
  selectedCategory,
  setSelectedCategory,
  funnelList,
  selectedSpecies,
  setSelectedSpecies,
}: CategoryFunnelToggleProps) => {
  return (
    <section className="w-full max-w-md mx-auto px-2 flex flex-col">
      {/* --- 종 토글단 (더 크고 강조) --- */}
      <div className="flex flex-row justify-center gap-6 mb-4 mt-3">
        {speciesTabs.map((tab) => {
          const isActive = selectedSpecies === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              className={cn(
                "flex flex-col items-center justify-center w-28 h-28 rounded-2xl transition-all select-none shadow border-2",
                isActive
                  ? "bg-blue-600 text-white border-blue-600 scale-105"
                  : "bg-[#F5F6FA] text-[#8a98a9] border-transparent hover:bg-[#eaf0f6] hover:border-blue-200"
              )}
              style={{
                fontWeight: isActive ? 700 : 500,
                fontSize: 16,
                transition: "all 0.15s",
              }}
              onClick={() => setSelectedSpecies(tab.value)}
            >
              <span style={{ marginBottom: 10 }}>
                {React.cloneElement(tab.icon, {
                  color: isActive ? "#fff" : "#aeb4be",
                })}
              </span>
              <span
                className={cn(
                  "font-bold",
                  isActive ? "text-white" : "text-[#7a8699]"
                )}
                style={{ letterSpacing: "-0.5px" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* --- 카테고리 카드(진료과목) --- */}
      {selectedSpecies === "" ? (
        <div className="flex flex-col items-center py-7 text-base text-gray-400">
          종(강아지/고양이)을 먼저 선택해 주세요.
        </div>
      ) : (
        <div className="flex flex-row gap-3 w-full px-1">
          {funnelList.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "flex flex-col items-center flex-1 min-w-0 cursor-pointer group bg-transparent"
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-1 transition-all border",
                    isActive
                      ? "bg-white border-[#3E7BFA] shadow-[0_2px_10px_rgba(53,114,255,0.06)]"
                      : "bg-[#F5F6FA] border-white shadow"
                  )}
                  style={{
                    boxShadow: isActive ? "0 2px 10px 0 rgba(53,114,255,0.08)" : undefined,
                  }}
                >
                  <span
                    className={cn(
                      "transition-all",
                      isActive ? "text-[#3E7BFA]" : "text-[#B6B6C0]"
                    )}
                  >
                    {FUNNEL_ICONS[cat.iconKey]}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-xs mt-1 text-center font-semibold tracking-tight truncate",
                    isActive ? "text-[#3E7BFA]" : "text-[#545068]"
                  )}
                  style={{
                    letterSpacing: "-0.3px",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {cat.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CategoryFunnelToggle;
