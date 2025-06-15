
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
            "flex items-center justify-center gap-2 min-w-[120px] h-12 px-4 rounded-full border-2 shadow-sm text-base font-bold transition-all duration-150",
            isActive
              ? "bg-blue-500 border-blue-500 text-white shadow-blue-100"
              : "bg-white border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500"
          )}
          style={
            isActive
              ? { boxShadow: "0 4px 16px rgba(58,133,242,0.12)" }
              : {}
          }
        >
          <span
            className={cn(
              "flex items-center justify-center",
              "w-6 h-6",
              isActive ? "text-white" : "text-gray-300 group-hover:text-blue-400"
            )}
          >
            <Icon size={22} />
          </span>
          <span
            className={cn(
              "flex items-center justify-center",
              "w-16 text-base font-bold truncate"
            )}
            style={{ letterSpacing: "-0.5px" }}
          >
            {sp.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default SpeciesToggle;

