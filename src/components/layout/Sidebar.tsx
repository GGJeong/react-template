import React, { useState } from "react";
import { ROUTES } from "../../constants/routes";

const navItems = [
  { label: "대시보드", icon: "📊", path: ROUTES.DASHBOARD },
  { label: "주문 관리", icon: "📦", path: ROUTES.ORDERS },
  { label: "회원 관리", icon: "👤", path: ROUTES.USERS },
  { label: "설정", icon: "⚙️", path: ROUTES.SETTINGS },
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState(ROUTES.DASHBOARD);

  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#1e1b4b",
        padding: "24px 0",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "0 20px 24px",
          borderBottom: "1px solid #312e81",
          marginBottom: "12px",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px" }}>
          ⚡ Admin
        </span>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => setActive(item.path)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: active === item.path ? "#4f46e5" : "transparent",
              color: active === item.path ? "#fff" : "#a5b4fc",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: active === item.path ? 600 : 400,
              textAlign: "left",
              borderRadius: active === item.path ? "0 8px 8px 0" : "0",
              transition: "all 0.15s",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
