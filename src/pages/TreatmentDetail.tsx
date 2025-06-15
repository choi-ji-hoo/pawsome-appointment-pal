import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Star } from "lucide-react";

// Mock 데이터 동일
const MOCK_HOSPITAL = {
  name: "후디 동물병원",
  location: "울산 남구",
  thumbnail:
    "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=facearea&w=480&h=300",
  rating: 5.0,
};
const TREATMENTS = [
  {
    id: 1,
    name: "대형견 건강검진",
    price: "500,000원",
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
    description: [
      "고양이 전용 건강검진입니다.",
    ],
    infoTab: [
      "진료 예약은 사전 전화 문의 바랍니다.",
    ],
    reviews: [],
  },
];
const TABS = [
  { label: "진료 정보", value: "info" },
  { label: "후기", value: "review" },
];
const INFO_IMAGES = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80",
];

const placeholderAvatar =
  "https://api.dicebear.com/8.x/thumbs/svg?seed=Milo&backgroundType=gradientLinear";

const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<"info" | "review">("info");
  const treatment = TREATMENTS.find(t => t.id === Number(id)) || TREATMENTS[0];

  // 예약 Drawer 관련 상태
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);

  // 옵션 선택
  const [option, setOption] = React.useState<string | null>(null);
  // 날짜/시간 선택
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string>("");
  // 보호자 정보
  const [guardianName, setGuardianName] = React.useState("");
  const [guardianPhone, setGuardianPhone] = React.useState("");
  const [petName, setPetName] = React.useState("");
  // 반려동물 몸무게 추가
  const [petWeight, setPetWeight] = React.useState("");

  // 예시 옵션 (수의사/패키지 등 간단한 radio로)
  const OPTIONS = ["일반검진", "프리미엄검진"];

  // 시간 예시 (09:00~18:00, 30분 단위)
  const TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  // 예약 완료 처리: 확인 누르면 예약현황 페이지로 이동
  function handleToStatus() {
    setDrawerOpen(false);
    setTimeout(() => {
      navigate("/status");
    }, 350);
  }

  // Drawer에서 스텝 이동 시 서브밋 핸들러
  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    setStep(step + 1);
  }

  React.useEffect(() => {
    if (!drawerOpen) {
      // 초기화(뒤로가기/닫기 시)
      setStep(1); setOption(null); setDate(undefined); setTime(""); setGuardianName(""); setGuardianPhone(""); setPetName("");
    }
  }, [drawerOpen]);

  // 메인 색상/테마
  const mainColor = "text-green-900";

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-white pb-28">
      {/* Top Header */}
      <div className="flex items-center p-4 gap-2">
        <button
          aria-label="뒤로가기"
          onClick={() => navigate("/")}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <span className="sr-only">뒤로가기</span>
          <svg width="22" height="22" fill="none"><path d="M15 18l-6-6 6-6" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {/* 썸네일 (상단 배경) */}
      <div className="px-4">
        <div className="relative overflow-hidden mb-2">
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="w-full h-[156px] object-cover"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
      {/* 병원 정보 카드 - 카드 전체가 버튼 역할 */}
      <div
        role="button"
        tabIndex={0}
        className="flex items-center px-4 py-3 gap-3 border-b border-gray-200 cursor-pointer transition hover:bg-gray-50 active:bg-gray-100 outline-none"
        onClick={() => navigate("/hospital/1")}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            navigate("/hospital/1");
          }
        }}
        aria-label="병원 상세로 이동"
      >
        <div className="overflow-hidden w-10 h-10 border" style={{ borderRadius: 0 }}>
          <img
            src={MOCK_HOSPITAL.thumbnail}
            alt={MOCK_HOSPITAL.name}
            className="object-cover w-10 h-10"
            style={{ borderRadius: 0 }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-base font-semibold">{MOCK_HOSPITAL.name}</span>
          <span className="text-xs text-gray-500">{MOCK_HOSPITAL.location}</span>
        </div>
      </div>
      {/* 메인 내용 */}
      <div className="px-4">
        {/* 진료명 및 금액 */}
        <div className="font-bold text-xl mt-5 mb-1">{treatment.name}</div>
        <div className="text-2xl font-extrabold mb-2">{treatment.price}</div>
        <div className="flex items-center gap-1 text-yellow-500 mb-3">
          <Star fill="#FACC15" stroke="#FACC15" size={18} className="mr-0.5" />
          <span className="text-base font-semibold text-gray-700">{MOCK_HOSPITAL.rating}</span>
        </div>
        {/* 탭 UI */}
        <div className="flex border-b border-gray-200 my-2">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`flex-1 px-1 py-2 font-semibold text-center transition border-b-2 ${
                tab === t.value
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400"
              }`}
              onClick={() => setTab(t.value as "info" | "review")}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* 진료 정보 탭 */}
        {tab === "info" && (
          <div className="w-full">
            <div className="max-h-[400px] overflow-y-auto flex flex-col pt-4 pb-8">
              {INFO_IMAGES.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`진료 이미지 ${idx + 1}`}
                  className="w-full max-h-72 object-cover"
                  style={{
                    borderRadius: 0,
                    marginBottom: 0,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* 후기 탭 */}
        {tab === "review" && (
          <>
            <div className="text-sm font-medium mb-2 mt-3">후기</div>
            <ul className="flex flex-col gap-4 mt-2">
              {treatment.reviews.length === 0 && (
                <li className="text-gray-400">아직 후기가 없습니다.</li>
              )}
              {treatment.reviews.map((review, i) => (
                <li
                  key={i}
                  className="rounded-xl px-4 py-3 border flex flex-col bg-[#FCFCFC] shadow-sm"
                  style={{ borderRadius: 16, borderWidth: 1, borderColor: "#eee" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {/* 아바타 */}
                    <img
                      src={placeholderAvatar}
                      alt="avatar"
                      className="w-7 h-7 rounded-full border bg-gray-100"
                    />
                    <span className="text-sm font-semibold">{review.user}</span>
                    {/* 별점 */}
                    <span className="flex items-center text-yellow-500 text-base ml-1">
                      {Array(5)
                        .fill(0)
                        .map((_, idx) =>
                          idx < review.rate ? (
                            <Star
                              key={idx}
                              size={15}
                              fill="#FFD700"
                              stroke="#FFD700"
                            />
                          ) : (
                            <Star
                              key={idx}
                              size={15}
                              fill="none"
                              stroke="#FFD700"
                            />
                          )
                        )}
                    </span>
                    {/* more ... 아이콘 대체: > */}
                    <span className="ml-auto text-gray-400 text-lg" aria-label="More">
                      ...
                    </span>
                  </div>
                  {/* 리뷰 텍스트 */}
                  <span className="text-gray-700 text-[15px] leading-relaxed mb-2">{review.text}</span>
                  {/* 첨부 이미지들 */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex flex-row gap-1 mb-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="리뷰 이미지"
                          className="rounded-md border object-cover"
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#eee",
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {/* 진료명 배지 */}
                  <div className="mt-1 flex">
                    <span className="bg-[#F3F4F6] text-xs px-3 py-1 rounded-md font-semibold text-gray-700">
                      {treatment.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {/* 예약 버튼 (Fixed Bottom) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white border-t z-10">
        <Button className="w-full h-12 text-base font-bold rounded-xl bg-gray-900 hover:bg-gray-700"
          onClick={() => setDrawerOpen(true)}>
          예약하기
        </Button>
      </div>

      {/* 예약 Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="!rounded-t-2xl !pb-0 p-0 max-w-md w-full mx-auto">
          <form
            onSubmit={handleNextStep}
            className="w-full max-w-md mx-auto min-h-[calc(100dvh*0.72)] h-[70dvh] flex flex-col bg-white"
          >
            <DrawerHeader className="pb-2 pt-5 px-0">
              <DrawerTitle className="text-lg font-bold">
                {step === 1 && "옵션 선택"}
                {step === 2 && "날짜·시간 선택"}
                {step === 3 && "보호자 정보 입력"}
                {step === 4 && "예약 완료"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 px-4 py-2 overflow-auto">
              {/* Step 1: 옵션 선택 */}
              {step === 1 && (
                <div className="flex flex-col gap-1 mt-1">
                  <RadioGroup
                    value={option ?? undefined}
                    onValueChange={setOption}
                    className="flex flex-col gap-2"
                  >
                    {OPTIONS.map(op => (
                      <label key={op} className="flex items-center py-2 gap-3 text-base border rounded-lg px-4 cursor-pointer transition hover:bg-gray-100">
                        <RadioGroupItem value={op} id={op} />
                        <span>{op}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {/* Step 2: 날짜/시간 선택 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-base mb-2">원하는 날짜</div>
                    <div className="bg-[#F8FAFC] p-2 rounded-xl flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="mx-auto pointer-events-auto"
                        fromDate={new Date()}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-base mb-2">시간 선택</div>
                    <div className="flex flex-wrap gap-2">
                      {TIMES.map((t) => (
                        <Button
                          key={t}
                          type="button"
                          size="sm"
                          className={`rounded-lg px-3 font-semibold min-w-[72px] ${
                            time === t
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => setTime(t)}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Step 3: 보호자 정보 입력 */}
              {step === 3 && (
                <div className="space-y-5 pt-0">
                  <div>
                    <label className="text-sm font-semibold block mb-1">보호자 이름</label>
                    <Input value={guardianName}
                      onChange={e => setGuardianName(e.target.value)}
                      required minLength={2} maxLength={10}
                      placeholder="성함 입력"
                      className="rounded-lg py-3 px-4 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">보호자 전화번호</label>
                    <Input type="tel" inputMode="tel"
                      placeholder="010-0000-0000"
                      value={guardianPhone}
                      onChange={e => setGuardianPhone(e.target.value)}
                      required
                      pattern="^01[0-9]-\d{3,4}-\d{4}$"
                      className="rounded-lg py-3 px-4 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">반려동물 이름</label>
                    <Input value={petName}
                      onChange={e => setPetName(e.target.value)}
                      required minLength={1} maxLength={12}
                      placeholder="예) 초코"
                      className="rounded-lg py-3 px-4 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">반려동물 몸무게(kg)</label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      value={petWeight}
                      onChange={e => setPetWeight(e.target.value)}
                      required
                      placeholder="예) 6.8"
                      className="rounded-lg py-3 px-4 text-base"
                    />
                  </div>
                </div>
              )}
              {/* Step 4: 신청 완료 */}
              {step === 4 && (
                <div className="flex flex-col items-center justify-center h-60 gap-5">
                  <div className="text-3xl">🎉</div>
                  <div className="font-bold text-lg text-center">예약이 완료되었습니다!</div>
                  <div className="text-gray-500 text-center text-base">
                    예약 내역은 <span className="font-semibold text-blue-700">예약현황</span>에서 확인할 수 있습니다.
                  </div>
                </div>
              )}
            </div>
            <DrawerFooter className="!mt-auto !pb-5 gap-2 px-4">
              {step !== 4 && (
                <Button
                  type="submit"
                  className="w-full h-12 font-bold rounded-xl text-base"
                  disabled={
                    (step === 1 && !option) ||
                    (step === 2 && (!date || !time)) ||
                    (step === 3 &&
                      (
                        !guardianName
                        || !guardianPhone.match(/^01[0-9]-\d{3,4}-\d{4}$/)
                        || !petName
                        || !petWeight
                        || parseFloat(petWeight) <= 0
                      )
                    )
                  }
                >
                  다음
                </Button>
              )}
              {step === 4 ? (
                <Button className="w-full h-12 font-bold rounded-xl text-base" type="button" onClick={handleToStatus}>
                  예약현황으로 이동
                </Button>
              ) : (
                step > 1 && (
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-12 rounded-xl text-base"
                    onClick={() => setStep(step - 1)}
                  >
                    이전
                  </Button>
                )
              )}
              <DrawerClose asChild>
                <Button variant="ghost" type="button" className="w-full h-12 rounded-xl text-base">닫기</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TreatmentDetail;
