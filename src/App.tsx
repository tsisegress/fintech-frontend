import { useState } from "react";
import LandingPage from "./pages/LandingPageFull";
import OnboardingPage from "./pages/OnboardingPage";
import DiscoverPage from "./pages/DiscoverPage";
import DashboardPage from "./pages/Dashboardpage";

type Page = "landing" | "onboarding" | "discover" | "dashboard";

interface UserData {
  role?: string;
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  tagline?: string;
  description?: string;
  stage?: string;
  raise?: string;
  sectors?: string[];
  regions?: string[];
  firm?: string;
  thesis?: string;
  stages?: string[];
  tickets?: string[];
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [userData, setUserData] = useState<UserData>({});

  const handleNavigate = (target: string, data?: UserData) => {
    if (data) setUserData(prev => ({ ...prev, ...data }));
    setPage(target as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {page === "landing" && (
        <LandingPage onNavigate={handleNavigate} />
      )}
      {page === "onboarding" && (
        <OnboardingPage onNavigate={handleNavigate} />
      )}
      {page === "discover" && (
        <DiscoverPage onNavigate={handleNavigate} userData={userData} />
      )}
      {page === "dashboard" && (
        <DashboardPage onNavigate={handleNavigate} userData={userData} />
      )}
    </div>
  );
}