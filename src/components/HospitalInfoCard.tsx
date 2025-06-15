
import React from "react";

type Hospital = {
  name: string;
  location: string;
  thumbnail: string;
  rating: number;
};

interface HospitalInfoCardProps {
  hospital: Hospital;
  onClick: () => void;
}

const HospitalInfoCard: React.FC<HospitalInfoCardProps> = ({ hospital, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    className="flex items-center px-3 py-3 gap-3 bg-gray-100/50 mx-4 rounded-xl cursor-pointer transition hover:bg-gray-100 active:bg-gray-200 outline-none"
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
    aria-label="병원 상세로 이동"
  >
    <div className="overflow-hidden w-11 h-11 rounded-full border border-gray-200/60 bg-white">
      <img
        src={hospital.thumbnail}
        alt={hospital.name}
        className="object-cover w-11 h-11"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-[15px] font-medium text-gray-900">{hospital.name}</span>
      <span className="text-[13px] text-gray-500 mt-0.5">{hospital.location}</span>
    </div>
    <div className="text-gray-300">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  </div>
);

export default HospitalInfoCard;
