
import React from "react";
import { Button } from "@/components/ui/button";

interface StepCompleteViewProps {
  handleToStatus: () => void;
}

const StepCompleteView: React.FC<StepCompleteViewProps> = ({ handleToStatus }) => (
  <section className="flex flex-col items-center justify-center h-64 gap-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl my-6">
    <div className="text-5xl">🎉</div>
    <div className="font-bold text-2xl text-blue-700">예약이 완료되었습니다!</div>
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
);

export default StepCompleteView;
