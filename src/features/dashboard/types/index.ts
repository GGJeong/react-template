export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number; // 전월 대비 변화율 (%)
  icon: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

export interface DashboardData {
  stats: StatCard[];
  recentOrders: RecentOrder[];
}
