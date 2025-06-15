import * as React from "react";
import { Dog, Cat, Calendar, Syringe, HeartPulse, Bone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "@/components/BannerCarousel";

// 카테고리 Funnel 정보
const FUNNELS = [
  { label: "병원 예약", icon: <Calendar size={22} className="text-blue-400" />, value: "hospital" },
  { label: "예방의학", icon: <Syringe size={22} className="text-green-500" />, value: "prevent" },
  { label: "치의학", icon: <HeartPulse size={22} className="text-yellow-600" />, value: "den" },
  { label: "정형외과", icon: <Bone size={22} className="text-rose-500" />, value: "ortho" },
];

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

const FunnnelSection = () => (
  <div className="grid grid-cols-4 gap-2 mt-3 px-2">
    {FUNNELS.map((fun) => (
      <Button
        key={fun.value}
        type="button"
        variant="outline"
        className="flex flex-col items-center justify-center py-3 px-0 bg-white rounded-xl border border-gray-100 shadow-sm hover:bg-blue-50 transition-all"
        onClick={() => {}}
        style={{ minWidth: 0 }}
      >
        <div className="mb-1">{fun.icon}</div>
        <span className="text-xs text-gray-800 font-semibold whitespace-nowrap">{fun.label}</span>
      </Button>
    ))}
  </div>
);

const Index = () => {
  const [selectedSpecies, setSelectedSpecies] = React.useState("강아지");
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const filteredTreatments = React.useMemo(
    () => TREATMENTS.filter((t) => t.species === selectedSpecies),
    [selectedSpecies]
  );

  return (
    <div className="bg-white min-h-screen max-w-md mx-auto flex flex-col relative pb-20 font-sans">
      {/* 상단 패딩 및 검색창 */}
      <header className="w-full pt-6 pb-0 px-4 flex flex-col gap-4">
        <div className="relative w-full">
          <Input
            placeholder="진료명, 항목명으로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white rounded-lg border border-gray-100 shadow focus:ring-blue-300 font-sans"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="inline-block"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
        <div className="mt-0">
          <BannerCarousel />
        </div>
        <FunnnelSection />
        <div className="flex justify-center gap-3 mt-3">
          {SPECIES.map((sp) => (
            <Button
              key={sp.label}
              type="button"
              variant={selectedSpecies === sp.label ? "default" : "outline"}
              className={cn(
                "flex-1 min-w-0 flex items-center justify-center gap-1 font-bold transition-all px-4 py-2 text-base rounded-full border-2 font-sans",
                selectedSpecies === sp.label
                  ? "ring-2 ring-blue-400 bg-blue-50 border-blue-200 text-blue-700"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-500"
              )}
              onClick={() => setSelectedSpecies(sp.label)}
              style={{ flex: 1 }}
            >
              <span className="flex items-center gap-1 w-full justify-center">
                {sp.icon}
                {sp.label}
              </span>
            </Button>
          ))}
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="mt-6 px-3 mb-28">
          <div className="mb-3 flex items-end justify-between">
            <div className="text-lg font-bold text-blue-900 tracking-tight font-sans">
              {selectedSpecies} 진료 상품
            </div>
            <div className="text-xs text-gray-400">{filteredTreatments.length}개</div>
          </div>
          {/* --- 카드 리스트 --- */}
          <ul className="flex flex-col gap-4">
            {filteredTreatments.length === 0 ? (
              <li className="text-center text-gray-400 py-8 text-base">해당 동물의 진료가 없습니다.</li>
            ) : (
              filteredTreatments
                .filter(
                  (treat) =>
                    treat.name.includes(search) ||
                    treat.items.some((item) => item.includes(search))
                )
                .map((treat) => (
                  <li
                    key={treat.id}
                    className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden cursor-pointer hover:scale-[1.01] transition group"
                    style={{ maxWidth: 420, minHeight: 340, display: "flex", flexDirection: "column" }}
                    onClick={() => navigate(`/treatment/${treat.id}`)}
                  >
                    {/* 썸네일: 비율 고정 */}
                    <div
                      className="w-full aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center"
                      style={{
                        minHeight: 168,
                        maxHeight: 220,
                      }}
                    >
                      <img
                        src={treat.thumbnail}
                        alt={treat.name}
                        className="w-full h-full object-cover object-center"
                        draggable={false}
                      />
                    </div>
                    {/* 하단 내용 */}
                    <div className="flex flex-col px-5 pt-4 pb-4 bg-white" style={{ flex: 1 }}>
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=facearea&w=48&h=48"
                          alt="병원 썸네일"
                          className="w-7 h-7 rounded-full border bg-gray-100 object-cover"
                          draggable={false}
                        />
                        <span className="font-bold text-gray-900 text-sm truncate">후디 동물병원</span>
                        <span className="text-xs text-gray-400 truncate ml-1">울산 남구</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-start">
                        <div className="font-extrabold text-lg text-gray-900 leading-tight mt-1">{treat.name}</div>
                        <div className="text-xs text-gray-500 mt-1 truncate">{treat.items && treat.items.join(" · ")}</div>
                      </div>
                      {/* 진료 가격/평점 등 하단 */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-extrabold text-blue-900">500,000원</span>
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" className="mr-0.5"><polygon points="12 2 15 8.7 22 9.3 17 14.1 18.3 21 12 17.7 5.7 21 7 14.1 2 9.3 9 8.7 12 2"/></svg>
                          <span className="font-semibold text-base text-gray-700">5.0</span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Index;
