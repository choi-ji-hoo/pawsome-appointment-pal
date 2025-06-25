
/**
 * 공용 상수: 병원 정보, 탭, 옵션 등
 */
export const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구",
  thumbnail:
    "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=facearea&w=480&h=300",
  rating: 5.0,
};

export const TREATMENTS = [
  {
    id: 1,
    name: "대형견 건강검진",
    price: "500,000원",
    thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
    description: [
      "대형견 전용 건강검진입니다.",
      "25KG 이상일 경우 진료 진행이 가능합니다.",
    ],
    infoTab: [
      "진료 예약은 사전 전화 문의 바랍니다.",
      "검진 전 8시간 금식이 필요합니다.",
    ],
    reviews: [
      {
        user: "대형집사",
        rate: 5,
        text: "설명도 자세하고 예약부터 결과 안내까지 편리했어요.",
        images: [
          "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&q=80",
        ],
      },
      {
        user: "양이주인",
        rate: 5,
        text: "병원 시설이 최신이라서 안심하고 맡길 수 있었어요.",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&q=80",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "고양이 건강검진",
    price: "350,000원",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
    description: [
      "고양이 전용 건강검진입니다.",
    ],
    infoTab: [
      "진료 예약은 사전 전화 문의 바랍니다.",
    ],
    reviews: [],
  },
];

export const TABS = [
  { label: "진료 정보", value: "info" },
  { label: "후기", value: "review" },
];

export const INFO_IMAGES = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80",
];

export const OPTIONS = ["일반검진", "프리미엄검진"];

export const TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

export const FUNNEL_CATEGORIES = [
  { label: "전체", value: "all", iconKey: "all" as const },
  { label: "병원", value: "hospital", iconKey: "hospital" as const },
  { label: "예방", value: "prevent", iconKey: "prevent" as const },
  { label: "치과", value: "den", iconKey: "den" as const },
  { label: "정형외과", value: "ortho", iconKey: "ortho" as const },
];
