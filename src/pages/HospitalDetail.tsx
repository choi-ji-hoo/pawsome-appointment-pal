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
          <button className="flex-1 px-1 py-3 font-semibold text-center border-b-2 border-gray-900 text-gray-900 text-base">
            병원 정보
          </button>
          <button className="flex-1 px-1 py-3 font-semibold text-center border-b-2 border-transparent text-gray-400 text-base">
            후기
          </button>
        </div>
      </div>

      {/* 진료 상품 섹션 */}
      <div className="px-4 py-6">
        <div className="text-lg font-bold mb-4">진료 상품</div>
        <div className="flex flex-col">
          {INFO_IMAGES.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt=""
              className="w-full h-auto object-cover cursor-pointer"
              style={{
                borderRadius: 0,
                marginBottom: 0,
                display: "block",
              }}
              onClick={() => navigate(`/treatment/${idx + 1}`)}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
