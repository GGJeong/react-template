import React from "react";

type Status = "disconnected" | "connecting" | "connected" | "error";

interface Props {
  broker: string;
  clientId: string;
  status: Status;
  onBrokerChange: (v: string) => void;
  onClientIdChange: (v: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const MqttConnection: React.FC<Props> = ({
  broker, clientId, status,
  onBrokerChange, onClientIdChange,
  onConnect, onDisconnect,
}) => {
  const isConnected = status === "connected";

  return (
    <div className="m-panel">
      <div className="m-panel-header"><span className="icon">⬡</span> 브로커 연결</div>
      <div className="m-conn-grid">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="m-field">
            <label>Broker URL (WSS)</label>
            <input
              value={broker}
              onChange={e => onBrokerChange(e.target.value)}
              disabled={isConnected}
              placeholder="wss://..."
            />
          </div>
          <div className="m-field">
            <label>Client ID</label>
            <input
              value={clientId}
              onChange={e => onClientIdChange(e.target.value)}
              disabled={isConnected}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {!isConnected
            ? <button className="m-btn m-btn-primary" onClick={onConnect} disabled={status === "connecting"}>연결</button>
            : <button className="m-btn m-btn-danger" onClick={onDisconnect}>해제</button>
          }
        </div>
      </div>
    </div>
  );
};

export default MqttConnection;
