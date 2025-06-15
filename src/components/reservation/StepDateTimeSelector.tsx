
import React, { useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface StepDateTimeSelectorProps {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  time: string;
  setTime: (t: string) => void;
  TIMES: string[];
}

const StepDateTimeSelector: React.FC<StepDateTimeSelectorProps> = ({
  date,
  setDate,
  time,
  setTime,
  TIMES,
}) => {
  const timeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date && timeSectionRef.current) {
      setTimeout(() => {
        timeSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [date]);

  return (
    <section className="bg-gray-50 px-0 py-4 rounded-2xl shadow border mb-2 flex flex-col gap-0">
      <div className="px-5 pb-2 border-b border-gray-100">
        <div className="font-semibold text-base mb-2 text-gray-800 text-center">원하는 날짜</div>
        <div className="flex justify-center items-center">
          <div className="bg-white p-2 rounded-xl border w-full flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto pointer-events-auto"
              fromDate={new Date()}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-2">
          <span className="text-xs text-gray-500">
            원하는 날짜를 선택하세요
          </span>
        </div>
      </div>
      <div
        ref={timeSectionRef}
        className={`mt-0 px-5 py-5 transition-all duration-300 ${
          date
            ? "bg-blue-50 ring-2 ring-blue-200"
            : "bg-white"
        } rounded-b-2xl`}
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <div className="flex flex-col items-center">
          <div className={`font-semibold text-base mb-1 text-gray-800 transition-colors ${
            date ? "text-blue-700" : ""
          }`}>
            시간 선택
          </div>
          <div className="text-xs mb-3 text-gray-500">
            예약 가능한 시간을 선택해주세요
          </div>
        </div>
        <div
          className="flex flex-wrap gap-2 justify-center"
          style={{ maxHeight: "160px", overflowY: "auto" }}
        >
          {TIMES.map((t) => (
            <Button
              key={t}
              type="button"
              size="sm"
              className={
                "rounded-lg px-3 font-semibold min-w-[72px] border " +
                (time === t
                  ? "bg-gray-900 text-white border-gray-900 shadow"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400")
              }
              onClick={() => setTime(t)}
            >
              {t}
            </Button>
          ))}
        </div>
        {!date && (
          <div className="mt-2 text-xs text-gray-400 text-center">
            날짜를 먼저 선택해야 시간 선택이 가능합니다
          </div>
        )}
      </div>
    </section>
  );
};

export default StepDateTimeSelector;
