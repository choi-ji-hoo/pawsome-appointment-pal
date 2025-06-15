
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
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
  const [selected, setSelected] = React.useState(0);
  const carouselApiRef = React.useRef<any>(null);

  // 자동 넘김 타이머
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % IMAGES.length);
      carouselApiRef.current?.scrollTo((selected + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [selected]);

  // 스와이프 할 때 인덱스 동기화
  React.useEffect(() => {
    const api = carouselApiRef.current;
    if (!api) return;
    const onSelect = () => {
      const i = api.selectedScrollSnap();
      setSelected(i);
    };
    api.on?.("select", onSelect);
    return () => {
      api?.off?.("select", onSelect);
    };
  }, [carouselApiRef.current]);

  return (
    <div className="w-full px-0 max-w-full">
      <div className="w-full mx-auto max-w-xl mt-5 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
        <Carousel
          setApi={(api) => { carouselApiRef.current = api; }}
          opts={{ loop: true, align: "start" }}
          className="relative"
        >
          <CarouselContent>
            {IMAGES.map((img, idx) => (
              <CarouselItem key={idx}>
                <AspectRatio ratio={16 / 9} className="relative w-full">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    style={{ minHeight: 160, maxHeight: 280 }}
                  />
                  <div className="absolute top-3 left-3 text-left z-10">
                    <div className="inline-block bg-[#ff6633] text-white rounded-full px-3 py-1 text-xs font-bold shadow">{img.badge}</div>
                    <div className="mt-2 text-white text-base font-extrabold drop-shadow tracking-tight">
                      {img.title}
                    </div>
                    <div className="mt-1 text-xs text-white/80">{img.subtitle}</div>
                  </div>
                  <div className="absolute right-3 bottom-3 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-bold">
                    {(idx + 1).toString().padStart(2, "0")}/{IMAGES.length.toString().padStart(2, "0")}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* 점 네비게이션 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 pointer-events-none">
            {IMAGES.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  selected === i ? "bg-white/90" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BannerCarousel;
