import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import HospitalInfoCard from "@/components/HospitalInfoCard";
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
          <div className="flex items-center gap-1 text-yellow-500 mb-3">
            <Star fill="#FACC15" stroke="#FACC15" size={16} className="mr-0.5" />
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
                } text-sm`}
                onClick={() => setTab(t.value as "info" | "review")}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* 탭 컨텐츠 */}
          {tab === "info" && (
            <div className="flex flex-col pt-3 pb-8">
              {INFO_IMAGES.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt=""
                  className="w-full h-auto object-cover"
                  style={{
                    borderRadius: 0,
                    marginBottom: 0,
                    display: "block",
                  }}
                  draggable={false}
                />
              ))}
              {/* 기존 첨부 이미지(hoodi 로고) 유지 */}
              <div className="flex justify-center my-6">
                <img 
                  src="/lovable-uploads/9904435b-9a23-4fd8-8d9e-62805c113e40.png"
                  alt="hoodi 로고"
                  className="w-40 h-40 object-contain rounded-xl shadow bg-white"
                  style={{ borderRadius: 16, background: "#fff" }}
                  draggable={false}
                />
              </div>
            </div>
          )}
          {tab === "review" && (
            <div className="flex flex-col items-center py-8">
              <img
                src="/lovable-uploads/9904435b-9a23-4fd8-8d9e-62805c113e40.png"
                alt="후기 대표 이미지"
                className="w-48 h-48 object-contain rounded-2xl shadow bg-white"
                style={{ borderRadius: 24, background: "#fff" }}
                draggable={false}
              />
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
