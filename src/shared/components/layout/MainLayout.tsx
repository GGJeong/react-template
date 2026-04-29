import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ROUTES } from "../../constants/routes";

type Route = typeof ROUTES[keyof typeof ROUTES];

interface MainLayoutProps {
  children: React.ReactNode;
  active: Route;
  onNavigate: (path: Route) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, active, onNavigate }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar active={active} onNavigate={onNavigate} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header />
        <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
