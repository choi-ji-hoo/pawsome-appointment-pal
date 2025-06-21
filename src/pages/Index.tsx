
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryFunnelToggle from "@/components/CategoryFunnelToggle";
import AuthButton from "@/components/AuthButton";
import { Calendar } from "lucide-react";
import { TREATMENTS } from "@/utils/constants";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Add state for category selection
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Define funnel categories
  const funnelList = [
    { label: "전체", value: "all", iconKey: "all" as const },
    { label: "진료과목", value: "hospital", iconKey: "hospital" as const },
    { label: "예방접종", value: "prevent", iconKey: "prevent" as const },
    { label: "치과", value: "den", iconKey: "den" as const },
    { label: "정형외과", value: "ortho", iconKey: "ortho" as const },
  ];

  return (
    <div className="min-h-screen max-w-md w-full mx-auto bg-white">
      {/* Header with Auth Button */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">펫케어</h1>
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={() => navigate('/status')}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              예약현황
            </button>
          )}
          <AuthButton />
        </div>
      </div>

      {/* Banner */}
      <BannerCarousel />

      {/* Category toggle only */}
      <div className="px-4 py-2">
        <CategoryFunnelToggle 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          funnelList={funnelList}
        />
      </div>

      {/* Treatment List */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4">진료 서비스</h2>
        <div className="grid gap-4">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              onClick={() => navigate(`/treatment/${treatment.id}`)}
              className="bg-white border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={treatment.thumbnail}
                  alt={treatment.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{treatment.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{treatment.description[0]}</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">{treatment.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
