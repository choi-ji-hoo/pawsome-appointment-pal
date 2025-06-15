import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

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
        images: [
          "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&q=80",
        ],
      },
      {
        user: "양이주인",
        rate: 5,
        text: "병원 시설이 최신이라서 안심하고 맡길 수 있었어요.",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&q=80",
        ],
      },
    ],
  },
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
const INFO_IMAGES = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80",
];

const placeholderAvatar =
  "https://api.dicebear.com/8.x/thumbs/svg?seed=Milo&backgroundType=gradientLinear";

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
          onClick={() => navigate("/")}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <span className="sr-only">뒤로가기</span>
          <svg width="22" height="22" fill="none"><path d="M15 18l-6-6 6-6" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {/* 썸네일 (상단 배경) */}
      <div className="px-4">
        <div className="relative overflow-hidden mb-2">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[156px] object-cover"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
      {/* 병원 정보 카드 - 카드 전체가 버튼 역할 */}
      <div
        role="button"
        tabIndex={0}
        className="flex items-center px-4 py-3 gap-3 border-b border-gray-200 cursor-pointer transition hover:bg-gray-50 active:bg-gray-100 outline-none"
        onClick={() => navigate("/hospital/1")}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            navigate("/hospital/1");
          }
        }}
        aria-label="병원 상세로 이동"
      >
        <div className="overflow-hidden w-10 h-10 border" style={{ borderRadius: 0 }}>
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="object-cover w-10 h-10"
            style={{ borderRadius: 0 }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-base font-semibold">{MOCK_HOSPITAL.name}</span>
          <span className="text-xs text-gray-500">{MOCK_HOSPITAL.location}</span>
        </div>
      </div>
      {/* 메인 내용 */}
      <div className="px-4">
        {/* 진료명 및 금액 */}
        <div className="font-bold text-xl mt-5 mb-1">{treatment.name}</div>
        <div className="text-2xl font-extrabold mb-2">{treatment.price}</div>
        <div className="flex items-center gap-1 text-yellow-500 mb-3">
          <Star fill="#FACC15" stroke="#FACC15" size={18} className="mr-0.5" />
          <span className="text-base font-semibold text-gray-700">{MOCK_HOSPITAL.rating}</span>
        </div>
        {/* 탭 UI */}
        <div className="flex border-b border-gray-200 my-2">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`flex-1 px-1 py-2 font-semibold text-center transition border-b-2 ${
                tab === t.value
                  ? "border-gray-900 text-gray-900"
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
            <div className="max-h-[400px] overflow-y-auto flex flex-col pt-4 pb-8">
              {INFO_IMAGES.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`진료 이미지 ${idx + 1}`}
                  className="w-full max-h-72 object-cover"
                  style={{
                    borderRadius: 0,
                    marginBottom: 0,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* 후기 탭 */}
        {tab === "review" && (
          <>
            <div className="text-sm font-medium mb-2 mt-3">후기</div>
            <ul className="flex flex-col gap-4 mt-2">
              {treatment.reviews.length === 0 && (
                <li className="text-gray-400">아직 후기가 없습니다.</li>
              )}
              {treatment.reviews.map((review, i) => (
                <li
                  key={i}
                  className="rounded-xl px-4 py-3 border flex flex-col bg-[#FCFCFC] shadow-sm"
                  style={{ borderRadius: 16, borderWidth: 1, borderColor: "#eee" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {/* 아바타 */}
                    <img
                      src={placeholderAvatar}
                      alt="avatar"
                      className="w-7 h-7 rounded-full border bg-gray-100"
                    />
                    <span className="text-sm font-semibold">{review.user}</span>
                    {/* 별점 */}
                    <span className="flex items-center text-yellow-500 text-base ml-1">
                      {Array(5)
                        .fill(0)
                        .map((_, idx) =>
                          idx < review.rate ? (
                            <Star
                              key={idx}
                              size={15}
                              fill="#FFD700"
                              stroke="#FFD700"
                            />
                          ) : (
                            <Star
                              key={idx}
                              size={15}
                              fill="none"
                              stroke="#FFD700"
                            />
                          )
                        )}
                    </span>
                    {/* more ... 아이콘 대체: > */}
                    <span className="ml-auto text-gray-400 text-lg" aria-label="More">
                      ...
                    </span>
                  </div>
                  {/* 리뷰 텍스트 */}
                  <span className="text-gray-700 text-[15px] leading-relaxed mb-2">{review.text}</span>
                  {/* 첨부 이미지들 */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex flex-row gap-1 mb-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="리뷰 이미지"
                          className="rounded-md border object-cover"
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#eee",
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {/* 진료명 배지 */}
                  <div className="mt-1 flex">
                    <span className="bg-[#F3F4F6] text-xs px-3 py-1 rounded-md font-semibold text-gray-700">
                      {treatment.name}
                    </span>
                  </div>
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
