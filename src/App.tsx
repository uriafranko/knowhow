import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./components/AuthProvider";
import TopBar from "./components/TopBar";
import Index from "./pages/Index";
import Course from "./pages/Course";
import Class from "./pages/Class";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
          <div className="pt-16"> {/* Add padding to account for fixed TopBar */}
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/class/:id" element={<Class />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </AnimatePresence>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;