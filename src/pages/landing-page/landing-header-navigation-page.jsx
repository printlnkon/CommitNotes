import { Outlet } from "react-router-dom";
import LandingHeaderNavigation from "@/components/layout/landing-header-navigation";

export default function LandingHeaderNavigationPage() {
  return (
    <>
      <LandingHeaderNavigation />
      <Outlet />
    </>
  );
}
