import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";
import "./index.css";

// Eager load main landing page for fast initial render
import App from "./App.tsx";

// Lazy load all other pages for code splitting
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const CurriculumPage = lazy(() => import("./pages/CurriculumPage.tsx"));
const Resources = lazy(() => import("./pages/Resources.tsx"));
const Vision = lazy(() => import("./pages/Vision.tsx"));
const Team = lazy(() => import("./pages/Team.tsx"));
const Content = lazy(() => import("./pages/Content.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/course" element={<Dashboard />} />
          <Route path="/dashboard/course/:moduleId" element={<Dashboard />} />
          <Route path="/dashboard/course/:moduleId/:chapterId" element={<Dashboard />} />
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
      </Suspense>
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
  </HelmetProvider>
);
