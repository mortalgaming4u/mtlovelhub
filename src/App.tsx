import React from "react"; // ✅ Required for JSX
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NovelList from "./pages/NovelList";
import Search from "./pages/Search";
import Ranking from "./pages/Ranking";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import RequestPage from "./pages/request"; // ✅ NEW IMPORT

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/novel-list" element={<NovelList />} />
              <Route path="/search" element={<Search />} />
              <Route path="/ranking/:type" element={<Ranking />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/random" element={<Home />} />
              <Route path="/recommendations" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/*" element={<Profile />} />
              {/* ✅ NEW ROUTE */}
              <Route path="/request" element={<RequestPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
