
import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useFormatPhoneNumber } from "@/hooks/useFormatPhoneNumber";
import { OPTIONS, TIMES } from "@/utils/constants";
import { format } from "date-fns";

interface ReservationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatment: {
    name: string;
    price: string;
  };
}

const stepLabels = ["옵션", "날짜·시간", "보호자정보", "완료"];

const ReservationDrawer: React.FC<ReservationDrawerProps> = ({
  open,
  onOpenChange,
  treatment,
}) => {
  const [step, setStep] = React.useState(1);
  const [option, setOption] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("");
  const [guardianName, setGuardianName] = React.useState("");
  const [guardianPhone, setGuardianPhone] = React.useState("");
  const [petName, setPetName] = React.useState("");
  const [petWeight, setPetWeight] = React.useState("");
  const formatPhoneNumber = useFormatPhoneNumber();
  const timeSectionRef = React.useRef<HTMLDivElement>(null);

  // 예약 완료 처리: 확인 누르면 예약현황 페이지로 이동
  function handleToStatus() {
    onOpenChange(false);
    setTimeout(() => {
      window.location.href = "/status"; // navigate가 부모에서만 가능
    }, 350);
  }

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    setStep(s => s + 1);
  }

  React.useEffect(() => {
    if (!open) {
      setStep(1);
      setOption(null);
      setDate(undefined);
      setTime("");
      setGuardianName("");
      setGuardianPhone("");
      setPetName("");
      setPetWeight("");
    }
  }, [open]);

  React.useEffect(() => {
    if (step === 2 && date && timeSectionRef.current) {
      setTimeout(() => {
        timeSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [date, step]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="!rounded-t-2xl !pb-0 p-0 max-w-md w-full mx-auto">
        <form
          onSubmit={handleNextStep}
          className="w-full max-w-md mx-auto min-h-[calc(100dvh*0.72)] h-[70dvh] flex flex-col bg-white"
        >
          {/* Step Indicator (상단) */}
          <div className="flex items-center justify-center pt-5 pb-2 gap-2">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center flex-1 relative">
                <div
                  className={
                    "w-6 h-6 flex items-center justify-center rounded-full font-semibold border-2 " +
                    (step === i + 1
                      ? "bg-gray-900 text-white border-gray-900 scale-110 shadow"
                      : step > i + 1
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-100 text-gray-400 border-gray-200")
                  }
                  style={{ fontSize: 14, transition: "all 0.2s" }}
                >
                  {i + 1}
                </div>
                <span
                  className={
                    "text-xs mt-1 " +
                    (step === i + 1
                      ? "text-gray-900 font-bold"
                      : "text-gray-400")
                  }
                >
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <div
                    className={
                      "absolute left-full top-1/2 w-full h-1 -translate-y-1/2 " +
                      (step > i + 1
                        ? "bg-green-500"
                        : "bg-gray-200")
                    }
                    style={{ zIndex: 0, height: 2, width: "28px" }}
                  />
                )}
              </div>
            ))}
          </div>
          <DrawerHeader className="pb-1 pt-0 px-0">
            <DrawerTitle className="text-base font-bold text-center">
              {stepLabels[step - 1]}
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 px-2 sm:px-4 py-2 overflow-auto">
            {/* Step 1: 옵션 선택 */}
            {step === 1 && (
              <section className="bg-gray-50 px-4 py-5 rounded-2xl shadow border mb-1">
                <div className="font-semibold text-base mb-2 text-gray-800">검진 유형</div>
                <RadioGroup
                  value={option ?? undefined}
                  onValueChange={setOption}
                  className="flex flex-col gap-2"
                >
                  {OPTIONS.map(op => (
                    <label
                      key={op}
                      className={
                        "flex items-center gap-3 text-base px-4 py-3 border rounded-xl cursor-pointer transition-all font-medium " +
                        (option === op
                          ? "border-gray-900 bg-white shadow"
                          : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100")
                      }
                    >
                      <RadioGroupItem value={op} id={op} />
                      <span>{op}</span>
                      {option === op && (
                        <span className="ml-auto text-green-600 text-xs font-bold">
                          선택됨
                        </span>
                      )}
                    </label>
                  ))}
                </RadioGroup>
              </section>
            )}
            {/* Step 2: 날짜/시간 선택 */}
            {step === 2 && (
              <section className="bg-gray-50 px-0 py-4 rounded-2xl shadow border mb-2 flex flex-col gap-0">
                <div className="px-5 pb-2 border-b border-gray-100">
                  <div className="font-semibold text-base mb-2 text-gray-800 text-center">원하는 날짜</div>
                  <div className="flex justify-center items-center">
                    <div className="bg-white p-2 rounded-xl border w-full flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="mx-auto pointer-events-auto"
                        fromDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-2">
                    <span className="text-xs text-gray-500">
                      원하는 날짜를 선택하세요
                    </span>
                  </div>
                </div>
                <div
                  ref={timeSectionRef}
                  className={`mt-0 px-5 py-5 transition-all duration-300 ${
                    date
                      ? "bg-green-50 ring-2 ring-green-200"
                      : "bg-white"
                  } rounded-b-2xl`}
                  style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`font-semibold text-base mb-1 text-gray-800 transition-colors ${
                      date ? "text-green-700" : ""
                    }`}>
                      시간 선택
                    </div>
                    <div className="text-xs mb-3 text-gray-500">
                      예약 가능한 시간을 선택해주세요
                    </div>
                  </div>
                  <div
                    className="flex flex-wrap gap-2 justify-center"
                    style={{ maxHeight: "160px", overflowY: "auto" }}
                  >
                    {TIMES.map((t) => (
                      <Button
                        key={t}
                        type="button"
                        size="sm"
                        className={
                          "rounded-lg px-3 font-semibold min-w-[72px] border " +
                          (time === t
                            ? "bg-gray-900 text-white border-gray-900 shadow"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400")
                        }
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                  {!date && (
                    <div className="mt-2 text-xs text-gray-400 text-center">
                      날짜를 먼저 선택해야 시간 선택이 가능합니다
                    </div>
                  )}
                </div>
              </section>
            )}
            {/* Step 3: 보호자 정보 입력 */}
            {step === 3 && (
              <section className="bg-gray-50 px-4 py-5 rounded-2xl shadow border mb-2">
                <div className="font-semibold text-base mb-4 text-gray-800">보호자 정보 입력</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold block mb-1 text-gray-700">보호자 이름</label>
                    <Input value={guardianName}
                      onChange={e => setGuardianName(e.target.value)}
                      required minLength={2} maxLength={10}
                      placeholder="성함 입력"
                      className="rounded-lg py-3 px-4 text-base border-gray-200 focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1 text-gray-700">보호자 전화번호</label>
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="010-0000-0000"
                      value={guardianPhone}
                      onChange={e => {
                        setGuardianPhone(formatPhoneNumber(e.target.value));
                      }}
                      required
                      pattern="^01[0-9]-\d{3,4}-\d{4}$"
                      className="rounded-lg py-3 px-4 text-base border-gray-200 focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1 text-gray-700">반려동물 이름</label>
                    <Input value={petName}
                      onChange={e => setPetName(e.target.value)}
                      required minLength={1} maxLength={12}
                      placeholder="예) 초코"
                      className="rounded-lg py-3 px-4 text-base border-gray-200 focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1 text-gray-700">반려동물 몸무게 (kg)</label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      value={petWeight}
                      onChange={e => setPetWeight(e.target.value)}
                      required
                      placeholder="예) 6.8"
                      className="rounded-lg py-3 px-4 text-base border-gray-200 focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </section>
            )}
            {/* Step 4: 신청 완료 */}
            {step === 4 && (
              <section className="flex flex-col items-center justify-center h-64 gap-6 bg-gradient-to-b from-green-50 to-white rounded-2xl my-6">
                <div className="text-5xl">🎉</div>
                <div className="font-bold text-2xl text-green-700">예약이 완료되었습니다!</div>
                <div className="text-gray-500 text-base text-center">
                  예약 내역은 <span className="font-semibold text-blue-700">예약현황</span>에서 확인할 수 있습니다.
                </div>
                <div>
                  <Button size="lg" className="rounded-xl bg-gray-900 text-white px-10"
                    type="button" onClick={handleToStatus}>
                    예약현황 바로가기
                  </Button>
                </div>
              </section>
            )}
          </div>
          {/* 하단 버튼영역 */}
          <DrawerFooter className="!mt-auto !pb-5 !pt-0 gap-2 px-4 bg-white">
            {step !== 4 && (
              <Button
                type="submit"
                className="w-full h-12 font-bold rounded-xl text-base bg-gray-900 text-white hover:bg-gray-700"
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
            {step !== 1 && step !== 4 && (
              <Button
                variant="outline"
                type="button"
                className="w-full h-12 rounded-xl text-base border-gray-300"
                onClick={() => setStep(step - 1)}
              >
                이전
              </Button>
            )}
            {step === 4 && (
              <Button variant="ghost" type="button" className="w-full h-12 rounded-xl text-base text-gray-500" onClick={() => onOpenChange(false)}>
                닫기
              </Button>
            )}
            {step !== 4 && (
              <DrawerClose asChild>
                <Button variant="ghost" type="button" className="w-full h-12 rounded-xl text-base text-gray-500">취소</Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ReservationDrawer;
