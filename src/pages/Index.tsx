import * as React from "react";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryFunnelToggle, { FunnelCategory } from "@/components/CategoryFunnelToggle";
import { Input } from "@/components/ui/input";
import { Dog, Cat, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

// --- 카테고리 Funnel 정보 ---
const FUNNEL_LIST: FunnelCategory[] = [
  { label: "강아지", iconKey: "dog", value: "dog" },
  { label: "고양이", iconKey: "cat", value: "cat" },
];

// 진료(상품) 예시 데이터
const TREATMENTS = [
  {
    id: 1,
    name: "종합검진",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=160&h=160",
    items: ["내과", "혈액·소변검사", "영상의학", "기초초음파", "피부·소양증"],
    hours: "월~금 9:00 - 18:00",
  },
  {
    id: 2,
    name: "예방접종/건강상담",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "구충", "정기상담"],
    hours: "월~토 9:30 - 18:00",
  },
  {
    id: 3,
    name: "치과진료",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=facearea&w=160&h=160",
    items: ["스케일링", "발치", "치과상담"],
    hours: "매주 토요일 10:00 - 15:00",
  },
  {
    id: 4,
    name: "정형외과 진료",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=160&h=160",
    items: ["수술", "재활치료"],
    hours: "월~금 10:00 - 19:00",
  },
  {
    id: 5,
    name: "특수동물 진료",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=facearea&w=160&h=160",
    items: ["토끼", "조류", "설치류"],
    hours: "예약제 (전화 문의)",
  },
  {
    id: 6,
    name: "중성화 수술",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc96291?auto=format&fit=facearea&w=160&h=160",
    items: ["수술 전 검사", "마취", "당일 입원"],
    hours: "월~금 10:00 - 16:00",
  },
  {
    id: 7,
    name: "피부질환 진료",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=facearea&w=160&h=160",
    items: ["알레르기 검사", "진드기 검사", "약처방"],
    hours: "월~토 9:00 - 18:00",
  },
  {
    id: 8,
    name: "고양이 종합검진",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=facearea&w=160&h=160",
    items: ["혈액검사", "소변검사", "초음파", "X-ray"],
    hours: "월~금 9:00 - 18:00",
  },
  {
    id: 9,
    name: "고양이 예방접종",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=facearea&w=160&h=160",
    items: ["코로나", "백신", "심장사상충"],
    hours: "월~토 10:00 - 17:00",
  },
  {
    id: 10,
    name: "슬개골 탈구 수술",
    category: "dog",
    thumbnail: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=facearea&w=160&h=160",
    items: ["정밀검사", "수술", "재활치료"],
    hours: "수~금 10:00 - 15:00",
  },
  {
    id: 11,
    name: "고양이 중성화",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=facearea&w=160&h=160",
    items: ["수술 전 검사", "마취", "회복 관리"],
    hours: "월~금 10:00 - 16:00",
  },
  {
    id: 12,
    name: "고양이 피부질환",
    category: "cat",
    thumbnail: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=facearea&w=160&h=160",
    items: ["진균 검사", "알레르기 검사", "약처방"],
    hours: "월~토 9:00 - 18:00",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("dog");
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // 카테고리, 검색어에 따라 진료 필터링
  const filteredTreatments = React.useMemo(() => {
    let list = TREATMENTS;
    list = list.filter(t => t.category === selectedCategory);
    if (search.trim()) {
      list = list.filter(
        t =>
          t.name.includes(search) ||
          t.items.some(item => item.includes(search))
      );
    }
    return list;
  }, [selectedCategory, search]);

  return (
    <div className="bg-white min-h-screen max-w-md mx-auto flex flex-col relative pb-20 font-sans">
      <header className="w-full pt-4 pb-0 px-4 flex flex-col gap-3">
        {/* 로그인/로그아웃 버튼 */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-extrabold text-blue-900 tracking-tight">후디 동물병원</div>
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/reservations")}
                className="text-xs text-gray-600 hover:text-blue-700 truncate max-w-[120px] underline decoration-gray-300 hover:decoration-blue-700 underline-offset-2"
              >
                {user.email}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-xs text-gray-500 hover:text-red-500 px-2 h-8"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 text-sm text-[#3E7BFA] hover:text-[#2E6BEA] px-3 h-9 rounded-xl border border-[#3E7BFA]/20 hover:bg-[#3E7BFA]/5"
            >
              <User size={16} />
              로그인
            </Button>
          )}
        </div>
        <div className="relative w-full">
          <Input
            placeholder="진료명, 항목명으로 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
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
        {/* 카테고리 탭 & 진료과목 영역 */}
        <CategoryFunnelToggle
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          funnelList={FUNNEL_LIST}
        />
      </header>
      <main className="flex-1 w-full">
        <section className="mt-6 px-3 mb-28">
          <div className="mb-3 flex items-end justify-between">
            <div className="text-lg font-bold text-blue-900 tracking-tight font-sans">
              진료 상품
            </div>
            <div className="text-xs text-gray-400">{filteredTreatments.length}개</div>
          </div>
          {/* --- 카드 리스트 --- */}
          <ul className="flex flex-col gap-4">
            {filteredTreatments.length === 0 ? (
              <li className="text-center text-gray-400 py-8 text-base">
                해당 진료가 없습니다.
              </li>
            ) : (
              filteredTreatments.map(treat => (
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
