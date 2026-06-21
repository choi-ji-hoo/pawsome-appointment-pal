import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Phone, User, Dog, Weight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Reservation {
  id: string;
  treatmentId?: number;
  treatmentName: string;
  treatmentPrice: string;
  option: string | null;
  date?: string;
  time: string;
  guardianName: string;
  guardianPhone: string;
  petName: string;
  petWeight: string;
  createdAt: string;
  userEmail: string;
}

const SAMPLE_RESERVATIONS: Reservation[] = [
  {
    id: "sample-1",
    treatmentName: "강아지 종합백신 (DHPPL)",
    treatmentPrice: "35,000원",
    option: "5종 종합백신 1차",
    date: new Date(Date.now() + 3 * 86400000).toISOString(),
    time: "오전 10:30",
    guardianName: "김보호",
    guardianPhone: "010-1234-5678",
    petName: "초코",
    petWeight: "4.2",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    userEmail: "",
  },
  {
    id: "sample-2",
    treatmentName: "고양이 건강검진 패키지",
    treatmentPrice: "120,000원",
    option: "혈액검사 + 복부초음파",
    date: new Date(Date.now() + 7 * 86400000).toISOString(),
    time: "오후 2:00",
    guardianName: "이집사",
    guardianPhone: "010-9876-5432",
    petName: "나비",
    petWeight: "3.8",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    userEmail: "",
  },
  {
    id: "sample-3",
    treatmentName: "강아지 스케일링",
    treatmentPrice: "250,000원",
    option: null,
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    time: "오전 11:00",
    guardianName: "박반려",
    guardianPhone: "010-2222-3333",
    petName: "뽀삐",
    petWeight: "6.5",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    userEmail: "",
  },
];

function loadReservations(): Reservation[] {
  try {
    const raw = JSON.parse(localStorage.getItem("reservations") || "[]");
    const stored = Array.isArray(raw) ? raw : [];
    return [...stored, ...SAMPLE_RESERVATIONS];
  } catch {
    return [...SAMPLE_RESERVATIONS];
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "미정";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "미정";
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${month}월 ${day}일 (${week})`;
}

const Reservations = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState<string>("");
  const allReservations = React.useMemo(() => loadReservations(), []);
  const reservations = React.useMemo(
    () =>
      allReservations
        .filter(r => !userEmail || r.userEmail === userEmail || !r.userEmail)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [allReservations, userEmail]
  );

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || "");
    });
  }, []);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center px-3 h-14 gap-2">
          <button
            aria-label="뒤로가기"
            onClick={() => navigate("/")}
            className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
          >
            <ChevronLeft size={22} strokeWidth={2} className="text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">예약 내역</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5">
        {reservations.length === 0 ? (
          <section className="flex flex-col items-center justify-center pt-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-300">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-700">예약 내역이 없습니다</p>
              <p className="text-sm text-gray-400 mt-1">원하는 진료를 예약해보세요</p>
            </div>
            <Button
              className="mt-2 rounded-xl bg-gray-900 text-white px-6 h-11 font-semibold"
              onClick={() => navigate("/")}
            >
              진료 둘러보기
            </Button>
          </section>
        ) : (
          <ul className="flex flex-col gap-4">
            {reservations.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                    예약완료
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                <div className="text-lg font-extrabold text-gray-900 mb-1">
                  {r.treatmentName}
                </div>
                <div className="text-sm text-gray-500 mb-4">{r.treatmentPrice}</div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{formatDate(r.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={16} className="text-blue-500" />
                    <span>{r.time || "미정"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Dog size={16} className="text-blue-500" />
                    <span>{r.petName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Weight size={16} className="text-blue-500" />
                    <span>{r.petWeight}kg</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} className="text-blue-500" />
                    <span>{r.guardianName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} className="text-blue-500" />
                    <span>{r.guardianPhone}</span>
                  </div>
                </div>

                {r.option && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">선택 옵션</div>
                    <div className="text-sm font-medium text-gray-800">{r.option}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Reservations;
