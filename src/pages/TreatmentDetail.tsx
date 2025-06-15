
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import HospitalInfoCard from "@/components/HospitalInfoCard";
import ReviewList from "@/components/ReviewList";
import ReservationDrawer from "@/components/ReservationDrawer";
import { TREATMENTS, MOCK_HOSPITAL, TABS, INFO_IMAGES } from "@/utils/constants";

// TreatmentDetail 메인 컴포넌트
const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<"info" | "review">("info");
  const treatment = TREATMENTS.find(t => t.id === Number(id)) || TREATMENTS[0];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen max-w-md w-full mx-auto bg-white pb-28">
      {/* Top Header */}
      <div className="flex items-center p-3 gap-2">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate("/")}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <span className="sr-only">뒤로가기</span>
          <svg width="22" height="22" fill="none"><path d="M15 18l-6-6 6-6" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="px-0" style={{ maxHeight: "calc(100vh - 76px)", overflowY: "auto" }}>
        {/* 썸네일 */}
        <div className="relative overflow-hidden mb-2">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[164px] object-cover"
            style={{ borderRadius: 0 }}
          />
        </div>
        {/* 병원 정보 카드 */}
        <HospitalInfoCard hospital={MOCK_HOSPITAL} onClick={() => navigate("/hospital/1")} />

        {/* 메인 내용 */}
        <div className="px-4">
          <div className="font-bold text-lg mt-4 mb-1">{treatment.name}</div>
          <div className="text-xl font-extrabold mb-2">{treatment.price}</div>
          {/* 별점(평점) 영역 제거 */}
          {/* 탭 UI */}
          <div className="flex border-b border-gray-200 my-2">
            {TABS.map(t => (
              <button
                key={t.value}
                className={`flex-1 px-1 py-2 font-semibold text-center transition border-b-2 ${
                  tab === t.value
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400"
                } text-sm`}
                onClick={() => setTab(t.value as "info" | "review")}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tab === "info" && (
            <div className="space-y-4">
              {treatment.description && (
                <div>
                  <h3 className="font-semibold mb-2">진료 설명</h3>
                  <div className="space-y-2">
                    {treatment.description.map((desc, index) => (
                      <p key={index} className="text-gray-700">{desc}</p>
                    ))}
                  </div>
                </div>
              )}
              {treatment.infoTab && (
                <div>
                  <h3 className="font-semibold mb-2">진료 안내</h3>
                  <div className="space-y-2">
                    {treatment.infoTab.map((info, index) => (
                      <p key={index} className="text-gray-700">• {info}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {INFO_IMAGES.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`진료 이미지 ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          {tab === "review" && (
            <div className="text-center text-gray-600 py-8">
              후디 인스타에서 확인할 수 있습니다!
            </div>
          )}
        </div>
      </div>

      {/* 예약 버튼 (Fixed Bottom) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-3 bg-white border-t z-10">
        <button
          className="w-full h-12 text-base font-bold rounded-xl bg-gray-900 hover:bg-gray-700 text-white"
          onClick={() => setDrawerOpen(true)}
        >
          예약하기
        </button>
      </div>
      {/* 예약 Drawer */}
      <ReservationDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        treatment={treatment}
      />
    </div>
  );
};

export default TreatmentDetail;
