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

const Banner = () => (
  <div className="relative w-full h-40 mt-5 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
    <img
      src="/lovable-uploads/e954edd0-5224-4456-b97e-6955b372e775.png"
      alt="베너"
      className="w-full h-full object-cover"
      draggable={false}
    />
    {/* 할인 뱃지 및 텍스트 오버레이 */}
    <div className="absolute top-4 left-4 text-left z-10">
      <div className="inline-block bg-[#ff6633] text-white rounded-full px-3 py-1 text-xs font-bold shadow">최대 12%</div>
      <div className="mt-2 text-white text-lg font-extrabold drop-shadow tracking-tight">
        우리집 반려동물<br />간식 기획전
      </div>
      <div className="mt-1 text-sm text-white/80">최대 12% 할인</div>
    </div>
    {/* 페이지 넘버 표시 */}
    <div className="absolute right-4 bottom-4 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-bold">01/35</div>
    {/* 어두운 배경 오버레이 */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
  </div>
);

const FunnnelSection = () => (
  <div className="flex justify-between gap-2 mt-5 mb-2 px-1">
    {FUNNELS.map((fun) => (
      <Button
        key={fun.value}
        type="button"
        variant="outline"
        className="flex-1 flex flex-col items-center py-4 bg-white rounded-xl shadow group hover:bg-blue-50 transition-all border border-gray-100"
        onClick={() => {}} // TODO: 연결된 기능이 있다면 여기서 처리
      >
        <div className="mb-1 group-hover:scale-110 transition-transform">{fun.icon}</div>
        <span className="text-xs text-gray-700 font-semibold">{fun.label}</span>
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
    <div className="bg-white min-h-screen max-w-2xl mx-auto flex flex-col relative pb-20">
      <header className="w-full px-4 pt-8 pb-2">
        {/* 검색창 */}
        <div className="relative">
          <Input
            placeholder="진료명, 항목명으로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
        {/* 베너 (자동 슬라이드 캐러셀) */}
        <BannerCarousel />
        {/* 퍼널 카테고리 */}
        <FunnnelSection />
        {/* 강아지/고양이 토글 */}
        <div className="flex justify-center gap-3 mt-4">
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
              filteredTreatments
                .filter(
                  (treat) =>
                    treat.name.includes(search) ||
                    treat.items.some((item) => item.includes(search))
                )
                .map((treat) => (
                  <li
                    key={treat.id}
                    className="flex bg-white rounded-xl shadow-md items-center gap-4 p-3 border hover:scale-[1.01] transition cursor-pointer"
                    onClick={() => navigate(`/treatment/${treat.id}`)}
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
    </div>
  );
};

export default Index;
