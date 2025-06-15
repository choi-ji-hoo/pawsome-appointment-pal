import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import HospitalInfoCard from "@/components/HospitalInfoCard";
import ReservationDrawer from "@/components/ReservationDrawer";
import { TREATMENTS, MOCK_HOSPITAL, TABS } from "@/utils/constants";

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
          <ArrowLeft size={22} stroke="#212121" />
        </button>
      </div>

      <div className="px-0" style={{ maxHeight: "calc(100vh - 76px)", overflowY: "auto" }}>
        {/* 상단 썸네일 */}
        <div className="flex justify-center px-4 mt-1">
          <div className="w-full">
            <img
              src={MOCK_HOSPITAL.thumbnail}
              alt={MOCK_HOSPITAL.name}
              className="w-full h-[164px] object-cover rounded-xl shadow"
              draggable={false}
              style={{ background: "#eee" }}
            />
          </div>
        </div>
        {/* 병원 정보 카드 */}
        <div className="px-4">
          <HospitalInfoCard hospital={MOCK_HOSPITAL} onClick={() => navigate("/hospital/1")} />
        </div>

        {/* 메인 내용 */}
        <div className="px-4">
          {/* 진료명/가격/평점 */}
          <div className="font-bold text-lg mt-3 mb-1">{treatment.name}</div>
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
          {/* 진료 정보(탭 컨텐츠) */}
          {tab === "info" && (
            <div className="flex flex-col pt-3 pb-8">
              {/* 기존 이미지, hooodi 로고 삭제, 진료 설명만 표시 */}
              {Array.isArray(treatment.description) &&
                treatment.description.map((line, i) => (
                  <div key={i} className="text-sm text-gray-700 mb-2">
                    {line}
                  </div>
                ))}
              {Array.isArray(treatment.infoTab) &&
                treatment.infoTab.map((info, idx) => (
                  <div key={idx} className="text-xs text-gray-400 mb-1">
                    {info}
                  </div>
                ))}
            </div>
          )}
          {/* 후기(탭 컨텐츠)는 그대로 */}
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
