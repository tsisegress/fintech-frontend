import { useState } from "react";
import LandingPage from "./pages/LandingPageFull";
import OnboardingPage from "./pages/OnboardingPage";
import DiscoverPage from "./pages/DiscoverPage";
import DashboardPage from "./pages/Dashboardpage";
import AuthPage from "./pages/AuthPage";
import InvestorDashboardPage from "./pages/InvestorDashboardPage";

type Page = "auth" | "landing" | "onboarding" | "discover" | "dashboard" | "investorDashboard";
type Role = "startup" | "investor";

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
  const [page, setPage] = useState<Page>("auth");
  const [userData, setUserData] = useState<UserData>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (target: string, data?: UserData) => {
    if (data) setUserData(prev => ({ ...prev, ...data }));

    if (!isAuthenticated && target !== "auth") {
      setPage("auth");
      return;
    }

    if (target === "dashboard") {
      const role = (data?.role || userData.role) as Role | undefined;
      setPage(role === "investor" ? "investorDashboard" : "dashboard");
    } else {
      setPage(target as Page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (authData: { role: Role; name: string; email: string }) => {
    setIsAuthenticated(true);
    setUserData(prev => ({
      ...prev,
      role: authData.role,
      name: authData.name,
      email: authData.email,
    }));
    setPage("onboarding");
  };

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {page === "auth" && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
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
      {page === "investorDashboard" && (
        <InvestorDashboardPage onNavigate={handleNavigate} userData={userData} />
      )}
    </div>
  );
}
