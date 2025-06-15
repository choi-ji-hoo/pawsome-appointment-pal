
import React from "react";

interface StepIndicatorProps {
  step: number;
  labels: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, labels }) => (
  <div className="flex items-center justify-center pt-5 pb-2 gap-2">
    {labels.map((label, i) => (
      <div key={i} className="flex flex-col items-center flex-1 relative">
        <div
          className={
            "w-6 h-6 flex items-center justify-center rounded-full font-semibold border-2 " +
            (step === i + 1
              ? "bg-gray-900 text-white border-gray-900 scale-110 shadow"
              : step > i + 1
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-400 border-gray-200")
          }
          style={{ fontSize: 14, transition: "all 0.2s" }}
        >
          {i + 1}
        </div>
        <span
          className={
            "text-xs mt-1 " +
            (step === i + 1
              ? "text-gray-900 font-bold"
              : "text-gray-400")
          }
        >
          {label}
        </span>
        {i < labels.length - 1 && (
          <div
            className={
              "absolute left-full top-1/2 w-full h-1 -translate-y-1/2 " +
              (step > i + 1
                ? "bg-blue-500"
                : "bg-gray-200")
            }
            style={{ zIndex: 0, height: 2, width: "28px" }}
          />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
