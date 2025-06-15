
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Status from "./pages/Status";
import My from "./pages/My";
import TreatmentDetail from "./pages/TreatmentDetail";
import HospitalDetail from "./pages/HospitalDetail";
import TabsBar from "@/components/TabsBar";

const queryClient = new QueryClient();

const MainLayout = () => {
  const location = useLocation();
  // 탭바를 표시할 경로 목록
  const showTabsBar = ["/", "/status", "/my"].includes(location.pathname);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Centered fixed-width layout for content */}
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-5xl flex flex-col flex-1 px-8 py-8 gap-2">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="/status" element={<Status />} />
            <Route path="/my" element={<My />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {/* 상단 가로 TabsBar로 위치/스타일 변경 */}
      {showTabsBar && <TabsBar />}
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
