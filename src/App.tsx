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
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Centered fixed-width layout for content */}
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-5xl flex flex-col flex-1 px-8 py-8 gap-2">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {/* TabsBar removed */}
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
