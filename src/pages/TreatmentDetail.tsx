
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";

// Mock 데이터 동일
const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구",
  thumbnail:
    "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=facearea&w=480&h=300",
  rating: 5.0,
};
const TREATMENTS = [
  {
    id: 1,
    name: "대형견 건강검진",
    price: "500,000원",
    description: [
      "대형견 전용 건강검진입니다.",
      "25KG 이상일 경우 진료 진행이 가능합니다.",
    ],
    infoTab: [
      "진료 예약은 사전 전화 문의 바랍니다.",
      "검진 전 8시간 금식이 필요합니다.",
    ],
    reviews: [
      {
        user: "대형집사",
        rate: 5,
        text: "설명도 자세하고 예약부터 결과 안내까지 편리했어요.",
      },
      {
        user: "양이주인",
        rate: 5,
        text: "병원 시설이 최신이라서 안심하고 맡길 수 있었어요.",
      },
    ],
  },
  // ...추가 진료 mock
  {
    id: 2,
    name: "고양이 건강검진",
    price: "350,000원",
    description: [
      "고양이 전용 건강검진입니다.",
    ],
    infoTab: [
      "진료 예약은 사전 전화 문의 바랍니다.",
    ],
    reviews: [],
  },
];
const TABS = [
  { label: "진료 정보", value: "info" },
  { label: "후기", value: "review" },
];
// 진료 이미지 (하단에 상세 이미지로 노출)
const INFO_IMAGES = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80",
];

const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<"info" | "review">("info");
  const treatment = TREATMENTS.find(t => t.id === Number(id)) || TREATMENTS[0];

  // 메인 색상/테마
  const mainColor = "text-green-900";

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-white pb-28">
      {/* Top Header */}
      <div className="flex items-center p-4 gap-2">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <ArrowLeft size={22} />
        </button>
      </div>
      {/* 썸네일 (상단 배경) */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[156px] object-cover"
          />
        </div>
      </div>
      {/* 메인 내용 */}
      <div className="px-4">
        <div className="flex items-center gap-1">
          <div className={`font-bold text-xl ${mainColor}`}>{treatment.name}</div>
        </div>
        <div className="text-lg font-semibold mt-2 mb-2">{treatment.price}</div>
        <div className="flex items-center gap-1 text-yellow-500 mb-4">
          <Star fill="#FACC15" stroke="#FACC15" size={18} className="mr-0.5" />
          <span className="text-base font-semibold">{MOCK_HOSPITAL.rating}</span>
        </div>
        {/* 탭 UI */}
        <div className="flex border-b border-gray-200 my-4">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`flex-1 px-1 py-2 font-semibold text-center transition border-b-2 ${
                tab === t.value
                  ? "border-green-900 text-green-900"
                  : "border-transparent text-gray-400"
              }`}
              onClick={() => setTab(t.value as "info" | "review")}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* 진료 정보 탭 */}
        {tab === "info" && (
          <div className="w-full">
            {/* 세로 스크롤될 진료 이미지 영역 */}
            <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 py-2 hide-scrollbar">
              {/* 진료 상세 이미지 영역 (여러 이미지 등록 가능) */}
              {INFO_IMAGES.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`진료 이미지 ${idx + 1}`}
                  className="rounded-xl w-full max-h-72 object-cover border"
                />
              ))}
              {/*--- 병원 카드 위치(이미지/텍스트 사이) ---*/}
              <div className="sticky top-0 left-0 z-10 bg-white/90 backdrop-blur rounded-lg shadow-md px-4 py-2 flex gap-3 items-center border mx-1 mt-1 mb-4">
                <span className="rounded-full overflow-hidden w-9 h-9 border">
                  <img
                    src={MOCK_HOSPITAL.thumbnail}
                    alt={MOCK_HOSPITAL.name}
                    className="object-cover w-9 h-9"
                  />
                </span>
                <div>
                  <div className="text-sm font-semibold">{MOCK_HOSPITAL.name}</div>
                  <div className="text-xs text-gray-500">{MOCK_HOSPITAL.location}</div>
                </div>
              </div>
              {/* 진료명 */}
              <div className="font-semibold text-lg mt-2 mb-1">{treatment.name}</div>
              {/* 진료 설명 */}
              <ul className="list-disc list-inside text-gray-700 text-sm mb-2 px-1">
                {treatment.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* 후기 탭 */}
        {tab === "review" && (
          <>
            <div className="text-sm font-medium mb-2 mt-3">후기</div>
            <ul className="flex flex-col gap-3 mt-2">
              {treatment.reviews.length === 0 && (
                <li className="text-gray-400">아직 후기가 없습니다.</li>
              )}
              {treatment.reviews.map((review, i) => (
                <li key={i} className="bg-gray-50 rounded-lg px-4 py-3 border flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold">{review.user}</span>
                    <span className="text-yellow-500 text-sm">
                      {"★".repeat(review.rate)}
                      {"☆".repeat(5 - review.rate)}
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm">{review.text}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {/* 예약 버튼 (Fixed Bottom) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white border-t z-10">
        <Button className="w-full h-12 text-base font-bold rounded-xl bg-gray-900 hover:bg-gray-700">
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default TreatmentDetail;

