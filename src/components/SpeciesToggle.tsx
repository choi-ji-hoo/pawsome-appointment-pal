
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
    <div className="flex w-full max-w-[380px] bg-[#f4f7fa] rounded-full py-1 px-2 gap-2 shadow-none">
      {SPECIES.map((sp) => {
        const isActive = selectedSpecies === sp.label;
        return (
          <button
            key={sp.label}
            type="button"
            onClick={() => setSelectedSpecies(sp.label)}
            className={cn(
              "flex-1 rounded-full px-0 py-3 text-base font-bold text-center transition-all duration-200",
              isActive
                ? "bg-blue-600 text-white shadow-none"
                : "bg-[#eaeaea] text-[#9a9a9a] hover:text-blue-600"
            )}
            style={{
              minWidth: 0,
              height: 44,
              boxShadow: "none",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              fontSize: 18,
              border: "none",
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

