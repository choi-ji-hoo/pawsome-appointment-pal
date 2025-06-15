
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StepOptionSelectorProps {
  option: string | null;
  setOption: (o: string) => void;
  options: string[];
}

const StepOptionSelector: React.FC<StepOptionSelectorProps> = ({
  option,
  setOption,
  options,
}) => (
  <section className="bg-gray-50 px-4 py-5 rounded-2xl shadow border mb-1">
    <div className="font-semibold text-base mb-2 text-gray-800">검진 유형</div>
    <RadioGroup
      value={option ?? undefined}
      onValueChange={setOption}
      className="flex flex-col gap-2"
    >
      {options.map(op => (
        <label
          key={op}
          className={
            "flex items-center gap-3 text-base px-4 py-3 border rounded-xl cursor-pointer transition-all font-medium " +
            (option === op
              ? "border-gray-900 bg-white shadow"
              : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100")
          }
        >
          <RadioGroupItem value={op} id={op} />
          <span>{op}</span>
          {option === op && (
            <span className="ml-auto text-blue-600 text-xs font-bold">
              선택됨
            </span>
          )}
        </label>
      ))}
    </RadioGroup>
  </section>
);

export default StepOptionSelector;
