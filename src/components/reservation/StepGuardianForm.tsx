
import React from "react";
import { Input } from "@/components/ui/input";

interface StepGuardianFormProps {
  guardianName: string;
  setGuardianName: (v: string) => void;
  guardianPhone: string;
  setGuardianPhone: (v: string) => void;
  petName: string;
  setPetName: (v: string) => void;
  petWeight: string;
  setPetWeight: (v: string) => void;
}

const StepGuardianForm: React.FC<StepGuardianFormProps> = ({
  guardianName,
  setGuardianName,
  guardianPhone,
  setGuardianPhone,
  petName,
  setPetName,
  petWeight,
  setPetWeight,
}) => (
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
          onChange={e => setGuardianPhone(e.target.value)}
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
);

export default StepGuardianForm;
