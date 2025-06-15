
import * as React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useFormatPhoneNumber } from "@/hooks/useFormatPhoneNumber";
import { OPTIONS, TIMES } from "@/utils/constants";
import StepIndicator from "./reservation/StepIndicator";
import StepOptionSelector from "./reservation/StepOptionSelector";
import StepDateTimeSelector from "./reservation/StepDateTimeSelector";
import StepGuardianForm from "./reservation/StepGuardianForm";
import StepCompleteView from "./reservation/StepCompleteView";
import DrawerFooterActions from "./reservation/DrawerFooterActions";

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

  // 예약 완료 처리: 확인 누르면 예약현황 페이지로 이동
  function handleToStatus() {
    onOpenChange(false);
    setTimeout(() => {
      window.location.href = "/status";
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

  // 유효성
  const isNextDisabled =
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
    );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="!rounded-t-2xl !pb-0 p-0 max-w-md w-full mx-auto">
        <form
          onSubmit={handleNextStep}
          className="w-full max-w-md mx-auto min-h-[calc(100dvh*0.72)] h-[70dvh] flex flex-col bg-white"
        >
          {/* Step Indicator (상단) */}
          <StepIndicator step={step} labels={stepLabels} />
          <div className="flex-1 px-2 sm:px-4 py-2 overflow-auto">
            {step === 1 && (
              <StepOptionSelector
                option={option}
                setOption={setOption}
                options={OPTIONS}
              />
            )}
            {step === 2 && (
              <StepDateTimeSelector
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                TIMES={TIMES}
              />
            )}
            {step === 3 && (
              <StepGuardianForm
                guardianName={guardianName}
                setGuardianName={setGuardianName}
                guardianPhone={guardianPhone}
                setGuardianPhone={v => setGuardianPhone(formatPhoneNumber(v))}
                petName={petName}
                setPetName={setPetName}
                petWeight={petWeight}
                setPetWeight={setPetWeight}
              />
            )}
            {step === 4 && (
              <StepCompleteView handleToStatus={handleToStatus} />
            )}
          </div>
          <DrawerFooterActions
            step={step}
            setStep={setStep}
            isNextDisabled={!!isNextDisabled}
            onOpenChange={onOpenChange}
          />
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ReservationDrawer;
