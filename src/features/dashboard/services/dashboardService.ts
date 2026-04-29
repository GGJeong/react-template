import { DashboardData } from "../types";

// 실제 프로젝트에서는 generated API로 교체
// import { Dashboard } from "../../../api/generated/Dashboard";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // 목업 데이터 (API 연동 전 개발용)
  return {
    stats: [
      { id: "1", title: "총 매출", value: "₩24,500,000", change: 12.5, icon: "💰" },
      { id: "2", title: "신규 주문", value: 142, change: 8.2, icon: "📦" },
      { id: "3", title: "신규 회원", value: 38, change: -3.1, icon: "👤" },
      { id: "4", title: "방문자 수", value: "9,821", change: 5.7, icon: "📊" },
    ],
    recentOrders: [
      { id: "ORD-001", customer: "김민준", product: "무선 이어폰", amount: 89000, status: "completed", date: "2026-04-16" },
      { id: "ORD-002", customer: "이서연", product: "스마트워치", amount: 320000, status: "pending", date: "2026-04-15" },
      { id: "ORD-003", customer: "박지호", product: "노트북 파우치", amount: 45000, status: "completed", date: "2026-04-15" },
      { id: "ORD-004", customer: "최예린", product: "기계식 키보드", amount: 156000, status: "cancelled", date: "2026-04-14" },
      { id: "ORD-005", customer: "정우성", product: "USB-C 허브", amount: 72000, status: "pending", date: "2026-04-14" },
    ],
  };
};
