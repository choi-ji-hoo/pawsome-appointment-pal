
import React from "react";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface DrawerFooterActionsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isNextDisabled: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerFooterActions: React.FC<DrawerFooterActionsProps> = ({
  step,
  setStep,
  isNextDisabled,
  onOpenChange
}) => (
  <DrawerFooter className="!mt-auto !pb-5 !pt-0 gap-2 px-4 bg-white">
    {step !== 4 && (
      <Button
        type="submit"
        className="w-full h-12 font-bold rounded-xl text-base bg-gray-900 text-white hover:bg-gray-700"
        disabled={isNextDisabled}
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
);

export default DrawerFooterActions;
