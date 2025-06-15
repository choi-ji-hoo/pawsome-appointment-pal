
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
    title: "건강하게! 우리집 반려동물 기획전",
    subtitle: "최대 12% 할인",
    badge: "최대 12%",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    title: "신규가입 이벤트",
    subtitle: "첫 예약 할인",
    badge: "New!",
  },
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    title: "진료 상품 모음전",
    subtitle: "다양한 진료 한눈에",
    badge: "추천",
  },
];

const BannerCarousel = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-0 sm:px-0 md:px-0 max-w-full">
      {/* 모바일: 4:3에 가깝고, 태블릿 이상은 16:9 */}
      <div className="w-full mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mt-5 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
        <AspectRatio ratio={16 / 9} className="relative sm:ratio-16/9 ratio-4/3 w-full">
          <img
            src={IMAGES[index].url}
            alt={IMAGES[index].title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            style={{ minHeight: 160, maxHeight: 280 }}
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-left z-10">
            <div className="inline-block bg-[#ff6633] text-white rounded-full px-3 py-1 text-xs font-bold shadow">{IMAGES[index].badge}</div>
            <div className="mt-2 text-white text-base sm:text-lg font-extrabold drop-shadow tracking-tight">
              {IMAGES[index].title}
            </div>
            <div className="mt-1 text-xs sm:text-sm text-white/80">{IMAGES[index].subtitle}</div>
          </div>
          <div className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-bold">
            {(index + 1).toString().padStart(2, "0")}/{IMAGES.length.toString().padStart(2, "0")}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          {/* 점 네비게이션 */}
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {IMAGES.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === i ? "bg-white/90" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default BannerCarousel;

