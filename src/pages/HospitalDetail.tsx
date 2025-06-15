
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TREATMENTS, INFO_IMAGES } from "@/utils/constants";

const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구 대학로 1234",
  description: "믿고 맡길 수 있는 지역 대표 동물병원입니다. 전문 의료진과 첨단 의료시설을 갖추고 반려동물의 건강을 책임집니다.",
  thumbnail: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=480&h=300"
};

const HospitalDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<"info" | "treatment" | "review">("info");
  
  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-white">
      {/* 상단 헤더 */}
      <div className="flex items-center p-3 gap-2 relative z-10">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <ArrowLeft size={22} />
        </button>
      </div>

      {/* 병원 이미지 - 전체 너비 */}
      <div className="w-full">
        <img
          src={MOCK_HOSPITAL.thumbnail}
          alt={MOCK_HOSPITAL.name}
          className="w-full h-[300px] object-cover"
        />
      </div>

      {/* 병원 정보 */}
      <div className="px-4 py-6">
        <div className="text-2xl font-bold mb-2">{MOCK_HOSPITAL.name}</div>
        <div className="text-gray-600 mb-4">{MOCK_HOSPITAL.location}</div>
      </div>

      {/* 탭 영역 */}
      <div className="px-4">
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 px-1 py-3 font-semibold text-center border-b-2 text-base ${
              activeTab === "info" 
                ? "border-gray-900 text-gray-900" 
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setActiveTab("info")}
          >
            병원 정보
          </button>
          <button 
            className={`flex-1 px-1 py-3 font-semibold text-center border-b-2 text-base ${
              activeTab === "treatment" 
                ? "border-gray-900 text-gray-900" 
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setActiveTab("treatment")}
          >
            진료
          </button>
          <button 
            className={`flex-1 px-1 py-3 font-semibold text-center border-b-2 text-base ${
              activeTab === "review" 
                ? "border-gray-900 text-gray-900" 
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setActiveTab("review")}
          >
            후기
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="px-4 py-6">
        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="text-gray-700 leading-relaxed">
              {MOCK_HOSPITAL.description}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {INFO_IMAGES.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`병원 이미지 ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "treatment" && (
          <div className="space-y-4">
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/treatment/${treatment.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{treatment.name}</h3>
                    <p className="text-xl font-bold text-gray-900">{treatment.price}</p>
                    {treatment.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {treatment.description[0]}
                      </p>
                    )}
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=80&h=80"
                    alt={treatment.name}
                    className="w-16 h-16 object-cover rounded-lg ml-4"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "review" && (
          <div className="text-center text-gray-600 py-8">
            후디 인스타에서 확인할 수 있습니다!
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDetail;
