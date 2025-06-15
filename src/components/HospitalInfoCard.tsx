
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
    className="flex items-center px-4 py-4 gap-3 bg-gray-50 mx-4 rounded-2xl cursor-pointer transition hover:bg-gray-100 active:bg-gray-200 outline-none shadow-sm"
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
    aria-label="병원 상세로 이동"
  >
    <div className="overflow-hidden w-12 h-12 rounded-full border border-gray-200">
      <img
        src={hospital.thumbnail}
        alt={hospital.name}
        className="object-cover w-12 h-12"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-base font-semibold text-gray-900">{hospital.name}</span>
      <span className="text-sm text-gray-500">{hospital.location}</span>
    </div>
    <div className="text-gray-400">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  </div>
);

export default HospitalInfoCard;
