import React from "react";

interface Props {
  pubTopic: string;
  pubPayload: string;
  qos: 0 | 1 | 2;
  retain: boolean;
  isConnected: boolean;
  onPubTopicChange: (v: string) => void;
  onPubPayloadChange: (v: string) => void;
  onQosChange: (v: 0 | 1 | 2) => void;
  onRetainChange: (v: boolean) => void;
  onPublish: () => void;
}

const MqttPublish: React.FC<Props> = ({
  pubTopic, pubPayload, qos, retain, isConnected,
  onPubTopicChange, onPubPayloadChange, onQosChange, onRetainChange, onPublish,
}) => (
  <div className="m-panel">
    <div className="m-panel-header"><span className="icon">▶</span> 메시지 발행</div>
    <div className="m-pub-grid">
      <div className="m-field">
        <label>Topic</label>
        <input value={pubTopic} onChange={e => onPubTopicChange(e.target.value)} disabled={!isConnected} />
      </div>
      <div className="m-field">
        <label>QoS</label>
        <select value={qos} onChange={e => onQosChange(Number(e.target.value) as 0 | 1 | 2)} disabled={!isConnected}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
      <div className="m-field">
        <label>Retain</label>
        <div style={{ display: "flex", alignItems: "center", height: 36 }}>
          <input
            type="checkbox"
            id="m-retain"
            checked={retain}
            onChange={e => onRetainChange(e.target.checked)}
            disabled={!isConnected}
            style={{ width: 16, height: 16, cursor: "pointer" }}
          />
          <label htmlFor="m-retain" style={{ marginLeft: 6, fontSize: 12, cursor: "pointer" }}>ON</label>
        </div>
      </div>
    </div>
    <div className="m-pub-row">
      <div className="m-field">
        <label>Payload</label>
        <textarea
          className="m-msg-input"
          value={pubPayload}
          onChange={e => onPubPayloadChange(e.target.value)}
          disabled={!isConnected}
          placeholder='{"key":"value"}'
        />
      </div>
      <button
        className="m-btn m-btn-accent2"
        style={{ alignSelf: "flex-end", padding: "10px 24px" }}
        onClick={onPublish}
        disabled={!isConnected}
      >
        발행 ▶
      </button>
    </div>
  </div>
);

export default MqttPublish;
