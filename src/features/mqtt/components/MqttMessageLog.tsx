import React, { useEffect, useRef, useState } from "react";
import { LogEntry } from "../types";

interface Props {
  logs: LogEntry[];
  onClearLogs: () => void;
}

const MqttMessageLog: React.FC<Props> = ({ logs, onClearLogs }) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, autoScroll]);

  return (
    <div className="m-panel">
      <div className="m-panel-header"><span className="icon">≡</span> 메시지 로그</div>
      <div className="m-log-container">
        {logs.length === 0
          ? (
            <div className="m-empty-log">
              <div className="icon">◈</div>
              메시지를 기다리는 중…<br />브로커에 연결 후 토픽을 구독하세요.
            </div>
          )
          : logs.map(l => (
            <div key={l.id} className={`m-log-item ${l.type}`}>
              <div className="m-log-meta">
                <span className="m-log-type">{l.type === "received" ? "RX" : l.type === "sent" ? "TX" : "SYS"}</span>
                <span className="m-log-topic">{l.topic}</span>
                <span className="m-log-time">{l.time}</span>
              </div>
              <span className="m-log-payload">{l.payload}</span>
            </div>
          ))
        }
        <div ref={logEndRef} />
      </div>
      <div className="m-log-controls">
        <button
          className="m-btn m-btn-ghost"
          style={{ fontSize: 11, padding: "5px 12px" }}
          onClick={() => setAutoScroll(v => !v)}
        >
          {autoScroll ? "⏸ 자동스크롤 ON" : "▶ 자동스크롤 OFF"}
        </button>
        <button
          className="m-btn m-btn-ghost"
          style={{ fontSize: 11, padding: "5px 12px" }}
          onClick={onClearLogs}
        >
          ✕ 로그 초기화
        </button>
        <span className="m-log-count">{logs.length} / 200 msgs</span>
      </div>
    </div>
  );
};

export default MqttMessageLog;
