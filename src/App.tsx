import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TreatmentDetail from "./pages/TreatmentDetail";
import HospitalDetail from "./pages/HospitalDetail";

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    // 모바일: max-w-md의 가운데 정렬, 아주 얇은 padding만 적용
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-md bg-white flex flex-col flex-1 px-0 py-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {/* 모바일에선 TabsBar 등은 필요없음 */}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
