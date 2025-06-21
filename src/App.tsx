
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TreatmentDetail from "./pages/TreatmentDetail";
import HospitalDetail from "./pages/HospitalDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReservationStatus from "./pages/ReservationStatus";
import ReservationDetail from "./pages/ReservationDetail";

// --- ScrollToTop 컴포넌트 추가 ---
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const MainLayout = () => {
  return (
    // 모바일: max-w-md의 가운데 정렬, 아주 얇은 padding만 적용
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-md bg-white flex flex-col flex-1 px-0 py-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/status" element={<ReservationStatus />} />
            <Route path="/reservation/:id" element={<ReservationDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {/* 모바일에선 TabsBar 등은 필요없음 */}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
