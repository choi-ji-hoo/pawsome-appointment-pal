
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

  // 탭바를 표시할 경로 목록 (필요에 따라 추가)
  const showTabsBar = ["/", "/status", "/my"].includes(location.pathname);

  return (
    <div className="bg-white min-h-screen w-full max-w-md mx-auto shadow-lg relative">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/treatment/:id" element={<TreatmentDetail />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/status" element={<Status />} />
        <Route path="/my" element={<My />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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

