
import React from "react";
import { Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";

const FUNNELS = [
  { label: "병원 예약", icon: <Calendar />, value: "hospital" },
  { label: "예방의학", icon: <Syringe />, value: "prevent" },
  { label: "치의학", icon: <HeartPulse />, value: "den" },
  { label: "정형외과", icon: <Bone />, value: "ortho" },
];

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

const CategoryFunnelToggle = ({ selectedCategory, setSelectedCategory }: CategoryFunnelToggleProps) => (
  <div className="flex w-full justify-between gap-3 px-0 mt-5 mb-1">
    {FUNNELS.map((fun) => {
      const isActive = selectedCategory === fun.value;
      return (
        <button
          key={fun.value}
          type="button"
          onClick={() => setSelectedCategory(fun.value)}
          className={cn(
            "flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 transition-all duration-150",
            isActive
              ? "bg-blue-500 border-blue-500 text-white shadow-lg"
              : "bg-white border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500"
          )}
          style={isActive
            ? { boxShadow: "0 4px 24px rgba(58,133,242,0.10)" }
            : {}
          }
        >
          <span
            className={cn(
              "mb-1 transition-colors",
              isActive ? "text-white" : "text-gray-400"
            )}
          >
            {React.cloneElement(fun.icon, { size: 26 })}
          </span>
          <span
            className={cn(
              "text-xs font-bold transition-colors",
              isActive ? "text-white" : "text-gray-500"
            )}
          >
            {fun.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default CategoryFunnelToggle;
