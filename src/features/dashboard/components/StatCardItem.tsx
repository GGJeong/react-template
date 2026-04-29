import React from "react";
import Card from "../../../shared/components/ui/Card";
import { StatCard } from "../types";

interface Props {
  stat: StatCard;
}

const StatCardItem: React.FC<Props> = ({ stat }) => {
  const isPositive = stat.change >= 0;
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
            {stat.title}
          </p>
          <p style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>
            {stat.value}
          </p>
        </div>
        <span style={{ fontSize: "28px" }}>{stat.icon}</span>
      </div>
      <p style={{ margin: "12px 0 0", fontSize: "13px", color: isPositive ? "#16a34a" : "#dc2626" }}>
        {isPositive ? "▲" : "▼"} {Math.abs(stat.change)}%{" "}
        <span style={{ color: "#94a3b8" }}>전월 대비</span>
      </p>
    </Card>
  );
};

export default StatCardItem;
