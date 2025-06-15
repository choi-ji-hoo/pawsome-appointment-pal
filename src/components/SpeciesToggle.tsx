
import React from "react";
import { Dog, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SPECIES = [
  { label: "강아지", icon: <Dog />, value: "dog" },
  { label: "고양이", icon: <Cat />, value: "cat" },
];

interface SpeciesToggleProps {
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const SpeciesToggle = ({ selectedSpecies, setSelectedSpecies }: SpeciesToggleProps) => (
  <div className="flex justify-center gap-3 mt-3 mb-2 w-full">
    {SPECIES.map((sp) => {
      const isActive = selectedSpecies === sp.label;
      return (
        <button
          key={sp.label}
          type="button"
          onClick={() => setSelectedSpecies(sp.label)}
          className={cn(
            "flex items-center gap-2 px-7 py-2 rounded-full border-2 shadow-sm text-base font-bold transition-all duration-150",
            isActive
              ? "bg-blue-500 border-blue-500 text-white shadow-blue-100"
              : "bg-white border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500"
          )}
          style={isActive 
            ? { boxShadow: "0 4px 16px rgba(58,133,242,0.12)" }
            : {}
          }
        >
          <span 
            className={cn(
              "transition-colors", 
              isActive ? "text-white" : "text-gray-300 group-hover:text-blue-400"
            )}
          >
            {React.cloneElement(sp.icon, { size: 22 })}
          </span>
          {sp.label}
        </button>
      );
    })}
  </div>
);

export default SpeciesToggle;
