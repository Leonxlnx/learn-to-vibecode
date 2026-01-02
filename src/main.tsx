import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import EarlyAccess from "./pages/EarlyAccess.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/early-access" element={<EarlyAccess />} />
    </Routes>
    <Toaster 
      position="top-center" 
      toastOptions={{
        style: {
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
        },
      }}
    />
  </BrowserRouter>
);
