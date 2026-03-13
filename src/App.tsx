import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DustidProvider } from "@/context/DustidContext";
import DustidBanner from "@/components/DustidBanner";
import AuthModal from "@/components/AuthModal";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

const App = () => (
  <DustidProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DustidBanner />
        <Navbar />
        <AuthModal />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </DustidProvider>
);

export default App;
