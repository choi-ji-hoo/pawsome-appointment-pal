
import React from "react";
import { Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";

// 아이콘 매핑
const ICONS: Record<string, React.ReactNode> = {
  hospital: <Calendar size={26} />,
  prevent: <Syringe size={26} />,
  den: <HeartPulse size={26} />,
  ortho: <Bone size={26} />,
};

export interface FunnelCategory {
  label: string;
  value: string;
  iconKey: keyof typeof ICONS;
}

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  funnelList: FunnelCategory[];
}

const CategoryFunnelToggle = ({ selectedCategory, setSelectedCategory, funnelList }: CategoryFunnelToggleProps) => (
  <div className="flex w-full justify-between gap-2 px-0 mt-5 mb-2">
    {funnelList.map((fun) => {
      const isActive = selectedCategory === fun.value;
      return (
        <button
          key={fun.value}
          type="button"
          onClick={() => setSelectedCategory(fun.value)}
          className={cn(
            "flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all duration-150 group shadow-none max-w-[90px]",
            isActive
              ? "bg-black border-black text-white shadow-lg"
              : "bg-white border-gray-200 text-gray-400 hover:border-neutral-700 hover:text-neutral-900"
          )}
          style={isActive ? { boxShadow: "0 4px 18px rgba(40,40,40,0.17)" } : {}}
        >
          <span
            className={cn(
              "mb-1 transition-colors",
              isActive ? "text-white" : "text-gray-400 group-hover:text-black"
            )}
          >
            {ICONS[fun.iconKey]}
          </span>
          <span
            className={cn(
              "text-xs font-bold tracking-tight transition-colors text-center",
              isActive ? "text-white" : "text-gray-600 group-hover:text-black"
            )}
            style={{lineHeight: "1.25", letterSpacing: "-0.3px"}}
          >
            {fun.label}
          </span>
        </button>
      )
    })}
  </div>
);

export default CategoryFunnelToggle;
