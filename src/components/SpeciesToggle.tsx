
import React from "react";
import { cn } from "@/lib/utils";

const SPECIES = [
  { label: "강아지" },
  { label: "고양이" },
];

interface SpeciesToggleProps {
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const SpeciesToggle = ({
  selectedSpecies,
  setSelectedSpecies,
}: SpeciesToggleProps) => (
  <div className="flex justify-center mt-3 mb-2 w-full">
    <div className="flex w-full max-w-[380px] bg-[#f7f8fa] rounded-[28px] py-2 px-2 gap-2">
      {SPECIES.map((sp) => {
        const isActive = selectedSpecies === sp.label;
        return (
          <button
            key={sp.label}
            type="button"
            onClick={() => setSelectedSpecies(sp.label)}
            className={cn(
              "flex-1 rounded-[24px] px-0 py-3 text-base font-bold transition-all text-center",
              isActive
                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                : "bg-transparent text-gray-400"
            )}
            style={{
              minWidth: 0,
              boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.04)" : undefined,
            }}
          >
            {sp.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default SpeciesToggle;

