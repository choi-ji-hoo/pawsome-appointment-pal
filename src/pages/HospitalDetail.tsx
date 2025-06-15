
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구",
  description: "믿고 맡길 수 있는 지역 대표 동물병원입니다. 전문 의료진과 첨단 의료시설을 갖추고 반려동물의 건강을 책임집니다.",
  thumbnail: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=facearea&w=480&h=300"
};

const HospitalDetail = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-white pb-28">
      {/* 상단 헤더 */}
      <div className="flex items-center p-4 gap-2">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="font-semibold text-lg">병원 상세</span>
      </div>
      {/* 썸네일 */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[156px] object-cover"
          />
        </div>
      </div>
      {/* 병원 정보 */}
      <div className="px-4">
        <div className="text-2xl font-bold mb-1">{MOCK_HOSPITAL.name}</div>
        <div className="text-gray-600 mb-2">{MOCK_HOSPITAL.location}</div>
        <div className="text-gray-700 leading-relaxed">{MOCK_HOSPITAL.description}</div>
      </div>
    </div>
  );
};

export default HospitalDetail;
