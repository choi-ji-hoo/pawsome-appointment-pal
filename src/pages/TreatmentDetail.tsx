
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 진료 항목 예시 데이터
const TREATMENTS = [
  {
    id: 1,
    name: "종합검진",
    species: "강아지",
    price: "120,000원",
    thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=160&h=160",
    items: ["내과", "혈액·소변검사", "영상의학", "기초초음파", "피부·소양증"],
    hours: "월~금 9:00 - 18:00",
    reviews: [
      { user: "강아지집사", text: "진료가 꼼꼼하고 친절해요!", rate: 5 },
      { user: "삼색이", text: "검진비가 합리적이고 설명을 잘 해줍니다.", rate: 4 }
    ]
  },
  {
    id: 2,
    name: "예방접종/건강상담",
    species: "강아지",
    price: "30,000원~",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "구충", "정기상담"],
    hours: "월~토 9:30 - 18:00",
    reviews: [
      { user: "댕댕댕", text: "정기 건강상담이 정말 좋아요.", rate: 5 }
    ]
  },
  {
    id: 3,
    name: "치과진료",
    species: "강아지",
    price: "80,000원~",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=facearea&w=160&h=160",
    items: ["스케일링", "발치", "치과상담"],
    hours: "매주 토요일 10:00 - 15:00",
    reviews: [
      { user: "샤샤", text: "치과 시술 후 친절한 조치!", rate: 5 }
    ]
  },
  {
    id: 4,
    name: "종합검진",
    species: "고양이",
    price: "130,000원",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=160&h=160",
    items: ["이비인후과", "피부진단", "혈액·소변검사", "영상의학"],
    hours: "월~금 10:00 - 19:00",
    reviews: [
      { user: "냥집사", text: "정밀 진료에 만족합니다.", rate: 5 }
    ]
  },
  {
    id: 5,
    name: "예방접종/건강상담",
    species: "고양이",
    price: "35,000원~",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "정기상담"],
    hours: "월~토 10:00 - 18:00",
    reviews: [
      { user: "고미", text: "비용 부담 적고 꼼꼼해요.", rate: 4 }
    ]
  },
  {
    id: 6,
    name: "특수동물 진료",
    species: "기타",
    price: "상담 후 안내",
    thumbnail: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=facearea&w=160&h=160",
    items: ["토끼", "조류", "설치류"],
    hours: "예약제 (전화 문의)",
    reviews: [
      { user: "토끼주인", text: "희귀동물도 잘 봐주심", rate: 5 }
    ]
  }
];

const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const treatment = TREATMENTS.find(t => t.id === Number(id));

  if (!treatment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg font-bold text-blue-700">진료 정보를 찾을 수 없습니다.</div>
        <Button className="mt-8" variant="outline" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-md mx-auto pb-20">
      <header className="flex items-center px-4 pt-8 gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Button>
        <h1 className="text-lg font-bold text-blue-800">{treatment.name}</h1>
      </header>
      <main className="pt-6 px-4 max-w-md mx-auto">
        <Card>
          <CardHeader className="items-center">
            <img
              src={treatment.thumbnail}
              alt={treatment.name}
              className="w-24 h-24 rounded-xl object-cover border bg-gray-50"
            />
            <CardTitle className="mt-2 text-blue-700 text-xl">{treatment.name}</CardTitle>
            <div className="text-base text-blue-600 font-semibold">{treatment.price}</div>
            <div className="text-sm mt-2 text-gray-500">{treatment.hours}</div>
          </CardHeader>
          <CardContent>
            <ul className="mb-4 flex flex-wrap gap-2">
              {treatment.items.map((item, i) => (
                <li key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <div className="font-bold text-blue-800 mb-2">병원 후기</div>
              <ul className="flex flex-col gap-2">
                {treatment.reviews.map((review, rIdx) => (
                  <li key={rIdx} className="bg-gray-50 p-3 rounded-md border flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold text-blue-600">{review.user}</span>
                      <span className="text-yellow-500">{'★'.repeat(review.rate)}{'☆'.repeat(5-review.rate)}</span>
                    </div>
                    <span className="text-sm text-gray-800 mt-1">{review.text}</span>
                  </li>
                ))}
                {treatment.reviews.length === 0 && (
                  <li className="text-gray-400">아직 후기가 없습니다.</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TreatmentDetail;
