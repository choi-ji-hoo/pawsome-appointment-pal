
import React from "react";
import { Calendar, Syringe, HeartPulse, Bone, List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FunnelCategory {
  label: string;
  value: string;
  iconKey: keyof typeof FUNNEL_ICONS;
}

const FUNNEL_ICONS: Record<string, React.ReactNode> = {
  all: <List strokeWidth={2.1} size={32} />,
  hospital: <Calendar strokeWidth={2.1} size={32} />,
  prevent: <Syringe strokeWidth={2.1} size={32} />,
  den: <HeartPulse strokeWidth={2.1} size={32} />,
  ortho: <Bone strokeWidth={2.1} size={32} />,
};

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  funnelList: FunnelCategory[];
}

const CategoryFunnelToggle = ({
  selectedCategory,
  setSelectedCategory,
  funnelList,
}: CategoryFunnelToggleProps) => {
  return (
    <section className="w-full max-w-md mx-auto px-2 flex flex-col">
      {/* --- 카테고리 카드(진료과목) --- */}
      <div className="flex flex-row gap-3 w-full px-1 justify-center">
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
    </section>
  );
};

export default CategoryFunnelToggle;
