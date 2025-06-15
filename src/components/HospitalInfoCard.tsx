
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
    className="flex items-center px-4 py-3 gap-3 border-b border-gray-200 cursor-pointer transition hover:bg-gray-50 active:bg-gray-100 outline-none"
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
    aria-label="병원 상세로 이동"
  >
    <div className="overflow-hidden w-10 h-10 border" style={{ borderRadius: 0 }}>
      <img
        src={hospital.thumbnail}
        alt={hospital.name}
        className="object-cover w-10 h-10"
        style={{ borderRadius: 0 }}
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-base font-semibold">{hospital.name}</span>
      <span className="text-xs text-gray-500">{hospital.location}</span>
    </div>
  </div>
);

export default HospitalInfoCard;
