export interface LogEntry {
  id: number;
  type: "received" | "sent" | "system";
  topic: string;
  payload: string;
  time: string;
}
