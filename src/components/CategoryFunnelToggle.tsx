
import React from "react";
import { Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";

// 아이콘들 (직접 추가하거나 lucide-react 활용)
const FUNNEL_ICONS: Record<string, React.ReactNode> = {
  hospital: <Calendar size={32} strokeWidth={2.1} />,
  prevent: <Syringe size={32} strokeWidth={2.1} />,
  den: <HeartPulse size={32} strokeWidth={2.1} />,
  ortho: <Bone size={32} strokeWidth={2.1} />,
};

export interface FunnelCategory {
  label: string;
  value: string;
  iconKey: keyof typeof FUNNEL_ICONS;
}

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  funnelList: FunnelCategory[];
}

const CategoryFunnelToggle = ({
  selectedCategory,
  setSelectedCategory,
  funnelList,
}: CategoryFunnelToggleProps) => (
  <div className="w-full max-w-md px-4 mx-auto">
    <div className="grid grid-cols-4 gap-3">
      {funnelList.map((fun) => {
        const isActive = selectedCategory === fun.value;
        return (
          <button
            key={fun.value}
            type="button"
            onClick={() => setSelectedCategory(fun.value)}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl p-0 w-full aspect-square shadow-sm transition-all",
              isActive
                ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                : "bg-[#f9fafb] border border-[#efefef] hover:bg-gray-100"
            )}
            style={{
              boxShadow: isActive
                ? "0 4px 16px 0 rgba(43,123,255,0.10)"
                : undefined,
              fontWeight: 600,
            }}
          >
            <span
              className={cn(
                "mb-1 mt-2 transition-all",
                isActive ? "text-blue-600" : "text-[#9ca3af]"
              )}
            >
              {FUNNEL_ICONS[fun.iconKey]}
            </span>
            <span
              className={cn(
                "text-xs font-bold tracking-tight",
                isActive ? "text-blue-600" : "text-[#505969]"
              )}
              style={{
                lineHeight: "1.35",
                letterSpacing: "-0.3px",
                marginBottom: 2,
              }}
            >
              {fun.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default CategoryFunnelToggle;
