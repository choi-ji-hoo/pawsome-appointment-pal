
import React from "react";
import { Dog, Cat } from "lucide-react";
import { cn } from "@/lib/utils";

const SPECIES = [
  {
    label: "강아지",
    icon: <Dog size={34} strokeWidth={2.2} />,
    value: "강아지",
  },
  {
    label: "고양이",
    icon: <Cat size={34} strokeWidth={2.2} />,
    value: "고양이",
  },
];

interface SpeciesToggleProps {
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const SpeciesToggle = ({
  selectedSpecies,
  setSelectedSpecies,
}: SpeciesToggleProps) => (
  <div className="flex justify-center mt-4 mb-3 w-full">
    <div className="flex gap-4">
      {SPECIES.map((sp) => {
        const isActive = selectedSpecies === sp.value;
        return (
          <button
            key={sp.value}
            type="button"
            onClick={() => setSelectedSpecies(sp.value)}
            className={cn(
              "flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all duration-150 select-none",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-[#f6f7fa] text-[#8a98a9] hover:bg-[#eaf0f6] hover:text-blue-600"
            )}
            style={{
              border: isActive ? "2px solid #0073FF" : "2px solid transparent",
              fontWeight: isActive ? 700 : 500,
              fontSize: 15,
            }}
          >
            <span className="mb-1">
              {React.cloneElement(sp.icon, {
                color: isActive ? "#fff" : "#aeb4be",
                style: { transition: "color 0.2s" },
              })}
            </span>
            <span
              className={cn(
                "font-bold",
                isActive ? "text-white" : "text-[#7a8699]"
              )}
              style={{ letterSpacing: "-0.5px" }}
            >
              {sp.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default SpeciesToggle;
