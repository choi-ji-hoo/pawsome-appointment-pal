
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Star } from "lucide-react";

// Mock 병원 정보 및 옵션
const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구",
  thumbnail:
    "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=facearea&w=480&h=300",
  rating: 5.0,
};

const OPTIONS = [
  {
    label: "스탠다드 건강검진 (기본형)",
    desc: "5대 혈관, 간기능검사와 주요 항목 검사를 포함합니다.",
    price: 245,
    checked: true,
  },
  {
    label: "프리미엄 건강검진 (고급형)",
    desc: "기본 항목 + 초음파 진단 및 심혈관 정밀 촬영이 추가됩니다.",
    price: 315,
    checked: false,
  },
  {
    label: "프리미엄플러스 건강검진 (최상위)",
    desc: "모든 고급 진단 + MRI 및 CT 특수 촬영까지 가능합니다.",
    price: 425,
    checked: false,
  },
];

const ADDITIONALS = [
  {
    label: "심장병 특화상담",
    desc: "심장병 위험군 동물에 한해 전문 수의사가 상담합니다.",
    price: 50,
  },
  {
    label: "결과 방문상담",
    desc: "검사 결과에 대한 1:1 방문상담이 추가됩니다.",
    price: 45,
  },
];

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
      "검진 전 8시간 금식이 필요합니다."
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
];

const TABS = [
  { label: "진료 정보", value: "info" },
  { label: "후기", value: "review" },
];

const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<"info" | "review">("info");
  const treatment = TREATMENTS.find(t => t.id === Number(id)) || TREATMENTS[0];

  // 메인 색상/테마
  const mainColor = "text-green-900";
  const sectionBg = "bg-gray-50";
  const optionSelected = "bg-green-800 bg-opacity-10 border-green-800";
  const optionUnselected = "bg-white";

  return (
    <div className="relative min-h-screen bg-white pb-28 max-w-md mx-auto">
      {/* Top header */}
      <div className="flex items-center p-4 gap-2">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <ArrowLeft size={22} />
        </button>
      </div>
      {/* 병원 / 썸네일 */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[156px] object-cover"
          />
          {/* 병원 카드 */}
          <div className="absolute left-3 bottom-3 bg-white/80 backdrop-blur px-4 py-2 rounded-lg flex gap-3 items-center shadow-md">
            <span className="rounded-full overflow-hidden w-8 h-8 border">
              <img
                src={MOCK_HOSPITAL.thumbnail}
                alt={MOCK_HOSPITAL.name}
                className="object-cover w-8 h-8"
              />
            </span>
            <div>
              <div className="text-sm font-semibold">{MOCK_HOSPITAL.name}</div>
              <div className="text-xs text-gray-500">{MOCK_HOSPITAL.location}</div>
            </div>
            <button className="ml-2 p-1"><ArrowLeft style={{ opacity: 0 }} /></button>
          </div>
        </div>
      </div>
      {/* 메인컨텐츠 */}
      <div className="px-4 mt-8">
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
          <>
            <div className="text-sm font-medium mb-2 mt-3">진료 상세 설명</div>
            <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
              {treatment.description.map((desc, i) => (
                <div key={i}>{desc}</div>
              ))}
            </div>
            <div className="text-base font-semibold mb-2">옵션 선택</div>
            <div className="flex flex-col gap-2">
              {OPTIONS.map((option, idx) => (
                <div
                  key={option.label}
                  className={`rounded-xl border px-4 py-3 ${
                    option.checked ? optionSelected : optionUnselected
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{idx + 1}. {option.label}</span>
                    <span className="font-semibold text-green-900">{option.price}천원</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
                </div>
              ))}
            </div>
            <div className="text-base font-semibold mt-5 mb-2">선택 옵션</div>
            <div className="flex flex-col gap-2">
              {ADDITIONALS.map((opt, idx) => (
                <div
                  className="rounded-xl border px-4 py-3 bg-white"
                  key={opt.label}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {idx + 1}. {opt.label}
                    </span>
                    <span className="font-medium text-green-900">
                      {opt.price}천원
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
                </div>
              ))}
            </div>
          </>
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
      {/* 예약 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white border-t z-10">
        <Button className="w-full h-12 text-base font-bold rounded-xl bg-gray-900 hover:bg-gray-700">
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default TreatmentDetail;
