import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Pricing from "./pages/Pricing.tsx";
import CurriculumPage from "./pages/CurriculumPage.tsx";
import Resources from "./pages/Resources.tsx";
import Vision from "./pages/Vision.tsx";
import Team from "./pages/Team.tsx";
import Content from "./pages/Content.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />
      {/* Dashboard routes - all handled by Dashboard component */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/course" element={<Dashboard />} />
      <Route path="/dashboard/projects" element={<Dashboard />} />
      <Route path="/dashboard/resources" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Dashboard />} />
      {/* Public pages */}
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/team" element={<Team />} />
      <Route path="/content" element={<Content />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
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
