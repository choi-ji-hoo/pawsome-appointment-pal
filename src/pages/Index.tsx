import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, PawPrint, User, Phone, Dog, Cat, ClipboardList } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import TabsBar from "@/components/TabsBar";

const AppointmentSchema = z.object({
  ownerName: z.string().min(2, "이름을 입력해주세요."),
  phone: z.string().min(9, "연락처를 입력해주세요."),
  petName: z.string().min(1, "반려동물 이름을 입력해주세요."),
  species: z.string().min(1, "동물 종류를 선택해주세요."),
  date: z.date({ required_error: "예약 날짜를 선택해주세요." }),
  note: z.string().optional(),
});

type Appointment = z.infer<typeof AppointmentSchema>;

const dummyData: Appointment[] = [
  {
    ownerName: "홍길동",
    phone: "010-1234-5678",
    petName: "초코",
    species: "강아지",
    date: new Date(),
    note: "종합검진",
  },
  {
    ownerName: "김민수",
    phone: "010-5555-8888",
    petName: "나비",
    species: "고양이",
    date: new Date(Date.now() + 86400000),
    note: "예방접종",
  },
];

const speciesList = [
  { label: "강아지", icon: <Dog size={18} className="text-blue-400 inline mr-1" /> },
  { label: "고양이", icon: <Cat size={18} className="text-amber-400 inline mr-1" /> },
  { label: "기타", icon: <PawPrint size={18} className="text-primary inline mr-1" /> },
];

const TREATMENTS = [
  {
    id: 1,
    name: "종합검진",
    thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=160&h=160",
    items: ["내과", "혈액·소변검사", "영상의학", "기초초음파", "피부·소양증"],
    hours: "월~금 9:00 - 18:00",
  },
  {
    id: 2,
    name: "예방접종/건강상담",
    thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=160&h=160",
    items: ["백신접종", "구충", "정기상담"],
    hours: "월~토 9:30 - 18:00",
  },
  {
    id: 3,
    name: "치과진료",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=facearea&w=160&h=160",
    items: ["스케일링", "발치", "치과상담"],
    hours: "매주 토요일 10:00 - 15:00",
  },
  {
    id: 4,
    name: "특수동물 진료",
    thumbnail: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=facearea&w=160&h=160",
    items: ["토끼", "조류", "설치류"],
    hours: "예약제 (전화 문의)",
  },
];

const Index = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>(dummyData);

  const form = useForm<Appointment>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      ownerName: "",
      phone: "",
      petName: "",
      species: "",
      date: undefined,
      note: "",
    },
  });

  const onSubmit = (data: Appointment) => {
    setAppointments([{ ...data }, ...appointments]);
    form.reset();
    toast({ title: "예약이 완료되었습니다!", description: `예약일: ${format(data.date, "PPP")}` });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 min-h-screen w-full max-w-md mx-auto flex flex-col pb-20">
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 px-4">
          <div className="flex items-center gap-3">
            <PawPrint size={42} className="text-blue-400 drop-shadow-lg" />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-cyan-400 text-transparent bg-clip-text drop-shadow-none">
              동물병원 예약
            </h1>
          </div>
          <span className="inline-flex items-center px-4 py-1 bg-white/80 shadow rounded-full gap-2 text-sm font-medium text-blue-700">
            <Calendar size={18} className="inline" />
            오늘: {format(new Date(), "yyyy-MM-dd EEEE")}
          </span>
        </header>
        {/* Reservation Form */}
        <section className="mx-4 bg-white rounded-2xl shadow-xl p-8 mb-10 animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <User className="inline w-5 h-5 mb-1 text-blue-300" /> 보호자명
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Phone className="inline w-5 h-5 mb-1 text-emerald-400" /> 연락처
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="010-1234-5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="petName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <PawPrint className="inline w-5 h-5 mb-1 text-pink-400" /> 반려동물 이름
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="초코" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>동물 종류</FormLabel>
                        <div className="flex gap-2 mt-1">
                          {speciesList.map((s) => (
                            <Button
                              key={s.label}
                              type="button"
                              variant={field.value === s.label ? "default" : "outline"}
                              className={cn(
                                "flex-1 font-semibold transition-all",
                                field.value === s.label ? "shadow-md ring-2 ring-primary" : "hover:scale-105"
                              )}
                              onClick={() => field.onChange(s.label)}
                            >
                              {s.icon}
                              {s.label}
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Calendar className="inline w-5 h-5 mb-1 text-cyan-400" /> 예약일
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>날짜 선택</span>}
                                <Calendar size={16} className="ml-2 opacity-60" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <ShadcnCalendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <ClipboardList className="inline w-5 h-5 mb-1 text-amber-400" /> 요청사항 (선택)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="요청사항을 입력하세요 (예: 종합검진)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full md:w-48 mt-2 animate-scale-in">
                  예약하기
                </Button>
              </form>
            </Form>
          </div>
          {/* 귀여운 동물 이미지 (포토플레이스홀더) */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=420&h=420"
              alt="귀여운 고양이와 강아지"
              className="rounded-2xl shadow-lg w-[260px] h-[260px] object-cover border-4 border-blue-100"
              style={{ background: "#fcfdff" }}
            />
          </div>
        </section>
        {/* 예약 내역 */}
        <section className="mx-4 bg-white/80 rounded-2xl shadow-md px-4 py-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Calendar size={20} className="inline text-blue-500" />
            최근 예약 내역
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-blue-900">예약일</th>
                  <th className="py-2 px-4">보호자</th>
                  <th className="py-2 px-4">연락처</th>
                  <th className="py-2 px-4">반려동물</th>
                  <th className="py-2 px-4">종</th>
                  <th className="py-2 px-4">요청사항</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-muted-foreground">
                      예약 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  appointments.map((app, idx) => (
                    <tr key={idx} className="rounded-md bg-blue-50 hover:shadow animate-fade-in">
                      <td className="py-2 px-4 font-medium">
                        {format(app.date, "yyyy-MM-dd (EEE)")}
                      </td>
                      <td className="py-2 px-4">{app.ownerName}</td>
                      <td className="py-2 px-4">{app.phone}</td>
                      <td className="py-2 px-4">{app.petName}</td>
                      <td className="py-2 px-4">{app.species}</td>
                      <td className="py-2 px-4">{app.note ?? "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* 진료 리스트 */}
        <section className="mt-8 mx-4 mb-28">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-blue-100">
              {/* Lucide-React list icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
            </span>
            진료 리스트
          </h2>
          <ul className="flex flex-col gap-4">
            {TREATMENTS.map((treat) => (
              <li
                key={treat.id}
                className="flex bg-white rounded-xl shadow-md items-center gap-4 p-3 border hover:scale-[1.01] transition"
              >
                <div className="flex-shrink-0">
                  <img
                    src={treat.thumbnail}
                    alt={treat.name}
                    className="w-16 h-16 rounded-lg object-cover border border-blue-100 bg-gray-50"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-blue-700 truncate">{treat.name}</div>
                  <div className="text-xs mt-1 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                    {treat.items.join(" · ")}
                  </div>
                  <div className="text-xs mt-1 text-blue-500 font-medium">
                    <span className="inline-flex items-center mr-1">
                      {/* Lucide-React clock icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </span>
                    {treat.hours}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <TabsBar />
    </div>
  );
};

export default Index;
