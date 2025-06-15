
import * as React from "react";
import { Dog, Cat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TabsBar from "@/components/TabsBar";

const SPECIES = [
  { label: "강아지", icon: <Dog size={20} className="text-blue-400 mr-1" /> },
  { label: "고양이", icon: <Cat size={20} className="text-amber-400 mr-1" /> },
];

const TREATMENTS = [
  {
    id: 1,
    name: "종합검진",
    species: "강아지",
    thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=160&h=160",
    items: ["내과", "혈액·소변검사", "영상의학", "기초초음파", "피부·소양증"],
    hours: "월~금 9:00 - 18:00",
  },
  {
    id: 2,
    name: "예방접종/건강상담",
    species: "강아지",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "구충", "정기상담"],
    hours: "월~토 9:30 - 18:00",
  },
  {
    id: 3,
    name: "치과진료",
    species: "강아지",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=facearea&w=160&h=160",
    items: ["스케일링", "발치", "치과상담"],
    hours: "매주 토요일 10:00 - 15:00",
  },
  {
    id: 4,
    name: "종합검진",
    species: "고양이",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=160&h=160",
    items: ["이비인후과", "피부진단", "혈액·소변검사", "영상의학"],
    hours: "월~금 10:00 - 19:00",
  },
  {
    id: 5,
    name: "예방접종/건강상담",
    species: "고양이",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "정기상담"],
    hours: "월~토 10:00 - 18:00",
  },
  {
    id: 6,
    name: "특수동물 진료",
    species: "기타",
    thumbnail: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=facearea&w=160&h=160",
    items: ["토끼", "조류", "설치류"],
    hours: "예약제 (전화 문의)",
  },
];

const Index = () => {
  const [selectedSpecies, setSelectedSpecies] = React.useState("강아지");

  // 해당 동물종에 맞는 진료만 필터
  const filteredTreatments = React.useMemo(
    () => TREATMENTS.filter((t) => t.species === selectedSpecies),
    [selectedSpecies]
  );

  return (
    <div className="bg-white min-h-screen max-w-md mx-auto flex flex-col relative pb-20">
      <header className="w-full px-4 pt-8 pb-2">
        <div className="flex justify-center gap-3">
          {SPECIES.map((sp) => (
            <Button
              key={sp.label}
              type="button"
              variant={selectedSpecies === sp.label ? "default" : "outline"}
              className={cn(
                "flex-1 font-semibold transition-all px-4 py-2 text-base",
                selectedSpecies === sp.label ? "ring-2 ring-primary" : ""
              )}
              onClick={() => setSelectedSpecies(sp.label)}
            >
              {sp.icon}
              {sp.label}
            </Button>
          ))}
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="mt-6 mx-4 mb-28">
          <ul className="flex flex-col gap-4">
            {filteredTreatments.length === 0 ? (
              <li className="text-center text-gray-400 py-8 text-base">해당 동물의 진료가 없습니다.</li>
            ) : (
              filteredTreatments.map((treat) => (
                <li
                  key={treat.id}
                  className="flex bg-white rounded-xl shadow-md items-center gap-4 p-3 border hover:scale-[1.01] transition"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={treat.thumbnail}
                      alt={treat.name}
                      className="w-16 h-16 rounded-lg object-cover border border-blue-100 bg-gray-50"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-blue-700 truncate">{treat.name}</div>
                    <div className="text-xs mt-1 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                      {treat.items.join(" · ")}
                    </div>
                    <div className="text-xs mt-1 text-blue-500 font-medium">
                      <span className="inline-flex items-center mr-1">
                        {/* Lucide-React clock icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      </span>
                      {treat.hours}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
      <TabsBar />
    </div>
  );
};

export default Index;
