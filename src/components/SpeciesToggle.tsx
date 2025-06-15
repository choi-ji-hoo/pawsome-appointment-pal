
import React from "react";
import { Dog, Cat } from "lucide-react";
import { cn } from "@/lib/utils";

const SPECIES = [
  { label: "강아지", icon: Dog },
  { label: "고양이", icon: Cat },
];

interface SpeciesToggleProps {
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const BUTTON_WIDTH = 140; // px
const ICON_SIZE = 22;
const ICON_WRAPPER_WIDTH = 28; // px
const LABEL_WIDTH = 52; // px

const SpeciesToggle = ({
  selectedSpecies,
  setSelectedSpecies,
}: SpeciesToggleProps) => (
  <div className="flex justify-center gap-3 mt-3 mb-2 w-full">
    {SPECIES.map((sp) => {
      const isActive = selectedSpecies === sp.label;
      const Icon = sp.icon;
      return (
        <button
          key={sp.label}
          type="button"
          onClick={() => setSelectedSpecies(sp.label)}
          className={cn(
            "flex items-center justify-center",
            // 버튼 크기 절대 고정
            `w-[${BUTTON_WIDTH}px] h-12 px-0 rounded-full border-2 shadow-sm text-base font-bold transition-all duration-150 select-none`,
            isActive
              ? "bg-blue-500 border-blue-500 text-white shadow-blue-100"
              : "bg-white border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500"
          )}
          style={{
            minWidth: BUTTON_WIDTH,
            width: BUTTON_WIDTH,
            maxWidth: BUTTON_WIDTH,
            height: 48,
            boxShadow: isActive
              ? "0 4px 16px rgba(58,133,242,0.12)"
              : undefined,
            padding: 0,
          }}
        >
          {/* 아이콘: 항상 왼쪽, 크기 및 위치 고정 */}
          <span
            className={cn(
              "flex items-center justify-center transition-colors",
              isActive ? "text-white" : "text-gray-300 group-hover:text-blue-400"
            )}
            style={{
              width: ICON_WRAPPER_WIDTH,
              minWidth: ICON_WRAPPER_WIDTH,
              maxWidth: ICON_WRAPPER_WIDTH,
              marginRight: 8,
            }}
          >
            <Icon size={ICON_SIZE} />
          </span>
          {/* 라벨 */}
          <span
            className="block font-bold text-base leading-none text-center"
            style={{
              width: LABEL_WIDTH,
              minWidth: LABEL_WIDTH,
              maxWidth: LABEL_WIDTH,
              letterSpacing: "-0.5px",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {sp.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default SpeciesToggle;
