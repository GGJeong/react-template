import React from "react";
import Card from "../../../shared/components/ui/Card";
import { useDashboard } from "../hooks/useDashboard";
import { RecentOrder, StatCard } from "../types";
import { formatCurrency, formatDate } from "../../../shared/utils/formatDate";

const statusColor: Record<RecentOrder["status"], { bg: string; text: string }> = {
  completed: { bg: "#dcfce7", text: "#16a34a" },
  pending:   { bg: "#fef9c3", text: "#ca8a04" },
  cancelled: { bg: "#fee2e2", text: "#dc2626" },
};

const statusLabel: Record<RecentOrder["status"], string> = {
  completed: "완료",
  pending:   "대기",
  cancelled: "취소",
};

const StatCardItem: React.FC<{ stat: StatCard }> = ({ stat }) => {
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
      {/* 통계 카드 */}
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

      {/* 최근 주문 */}
      <Card>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>
          최근 주문
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
              {["주문번호", "고객명", "상품", "금액", "상태", "날짜"].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.recentOrders.map((order) => (
              <tr
                key={order.id}
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                <td style={{ padding: "12px", color: "#4f46e5", fontWeight: 500 }}>{order.id}</td>
                <td style={{ padding: "12px", color: "#334155" }}>{order.customer}</td>
                <td style={{ padding: "12px", color: "#334155" }}>{order.product}</td>
                <td style={{ padding: "12px", color: "#334155" }}>{formatCurrency(order.amount)}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: statusColor[order.status].bg,
                      color: statusColor[order.status].text,
                    }}
                  >
                    {statusLabel[order.status]}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "#94a3b8" }}>{formatDate(order.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DashboardPage;
