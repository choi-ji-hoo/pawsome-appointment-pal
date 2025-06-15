
import React from "react";
import { Dog, Cat, Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FunnelCategory {
  label: string;
  value: string;
  iconKey: keyof typeof FUNNEL_ICONS;
}

/** 기존 아이콘 매핑 그대로 유지 - 일부 아이콘 강조 */
const FUNNEL_ICONS: Record<string, React.ReactNode> = {
  hospital: <Calendar strokeWidth={2.1} size={32} />,
  prevent: <Syringe strokeWidth={2.1} size={32} />,
  den: <HeartPulse strokeWidth={2.1} size={32} />,
  ortho: <Bone strokeWidth={2.1} size={32} />,
};

interface CategoryFunnelToggleProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  funnelList: FunnelCategory[];

  // 아래 props 추가, 홈에 종 토글도 통합 처리
  selectedSpecies: string;
  setSelectedSpecies: (val: string) => void;
}

const speciesTabs = [
  { label: "강아지", value: "강아지" },
  { label: "고양이", value: "고양이" },
];

const speciesIcons: Record<string, React.ReactNode> = {
  "강아지": <Dog size={18} className="mr-1" />,
  "고양이": <Cat size={18} className="mr-1" />,
};

const CategoryFunnelToggle = ({
  selectedCategory,
  setSelectedCategory,
  funnelList,
  selectedSpecies,
  setSelectedSpecies,
}: CategoryFunnelToggleProps) => {
  return (
    <section className="w-full max-w-md mx-auto px-2 flex flex-col">

      {/* 상단: 탭형 종 선택 */}
      <div className="flex flex-row justify-center relative border-b border-[#F2F2F6] mb-3">
        {speciesTabs.map((tab, idx) => (
          <button
            key={tab.value}
            type="button"
            className={cn(
              "flex-1 text-center px-0 py-2 transition-all font-semibold text-[17px] relative",
              selectedSpecies === tab.value ? "text-[#292D32]" : "text-[#D0D1D5]"
            )}
            style={{ fontWeight: selectedSpecies === tab.value ? 700 : 500 }}
            onClick={() => setSelectedSpecies(tab.value)}
          >
            {tab.label}
            {/* 하단 언더라인 */}
            {selectedSpecies === tab.value && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-7 h-[3px] rounded bg-[#292D32]" />
            )}
          </button>
        ))}
      </div>

      {/* 하단: 카테고리 카드(진료과목) */}
      <div className="flex flex-row gap-3 w-full px-1">
        {funnelList.map((cat, idx) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "flex flex-col items-center flex-1 min-w-0 cursor-pointer group bg-transparent"
              )}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-1 transition-all border",
                  isActive
                    ? "bg-white border-[#3E7BFA] shadow-[0_2px_10px_rgba(53,114,255,0.06)]"
                    : "bg-[#F5F6FA] border-white shadow"
                )}
                style={{
                  boxShadow: isActive ? "0 2px 10px 0 rgba(53,114,255,0.08)" : undefined,
                }}
              >
                <span
                  className={cn(
                    "transition-all",
                    isActive ? "text-[#3E7BFA]" : "text-[#B6B6C0]"
                  )}
                >
                  {FUNNEL_ICONS[cat.iconKey]}
                </span>
              </div>
              <div
                className={cn(
                  "text-xs mt-1 text-center font-semibold tracking-tight truncate",
                  isActive ? "text-[#3E7BFA]" : "text-[#545068]"
                )}
                style={{
                  letterSpacing: "-0.3px",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {cat.label}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFunnelToggle;
