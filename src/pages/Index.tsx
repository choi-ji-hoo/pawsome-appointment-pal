
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryFunnelToggle from "@/components/CategoryFunnelToggle";
import SpeciesToggle from "@/components/SpeciesToggle";
import AuthButton from "@/components/AuthButton";
import { Calendar } from "lucide-react";
import { TREATMENTS, FUNNEL_CATEGORIES } from "@/utils/constants";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState("강아지");

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

      {/* Category and Species toggles */}
      <div className="px-4 py-2">
        <CategoryFunnelToggle 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          funnelList={FUNNEL_CATEGORIES}
        />
        <SpeciesToggle 
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
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
