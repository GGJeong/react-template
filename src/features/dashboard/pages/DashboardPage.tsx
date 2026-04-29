import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import StatCardItem from "../components/StatCardItem";
import RecentOrdersTable from "../components/RecentOrdersTable";

const DashboardPage: React.FC = () => {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px", color: "#64748b" }}>
        불러오는 중...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px", color: "#ef4444" }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {data.stats.map((stat) => (
          <StatCardItem key={stat.id} stat={stat} />
        ))}
      </div>
      <RecentOrdersTable orders={data.recentOrders} />
    </div>
  );
};

export default DashboardPage;
