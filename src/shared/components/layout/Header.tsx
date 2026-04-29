import React from "react";
import { IconBell, IconSearch } from "../../assets/icons";

const Header: React.FC = () => {
  return (
    <header
      style={{
        height: "60px",
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "6px 12px",
          width: "240px",
        }}
      >
        <IconSearch size={16} color="#94a3b8" />
        <input
          placeholder="검색..."
          style={{ border: "none", background: "transparent", outline: "none", fontSize: "14px", color: "#334155", width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", position: "relative" }}>
          <IconBell size={20} color="#64748b" />
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              background: "#ef4444",
              borderRadius: "50%",
            }}
          />
        </button>
        <div style={{ width: "1px", height: "24px", background: "#e2e8f0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#4f46e5",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            A
          </div>
          <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}>관리자</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
