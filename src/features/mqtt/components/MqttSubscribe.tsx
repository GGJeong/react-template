import React from "react";

interface Props {
  subTopic: string;
  subs: string[];
  qos: 0 | 1 | 2;
  isConnected: boolean;
  onSubTopicChange: (v: string) => void;
  onQosChange: (v: 0 | 1 | 2) => void;
  onSubscribe: () => void;
  onUnsubscribe: (topic: string) => void;
}

const MqttSubscribe: React.FC<Props> = ({
  subTopic, subs, qos, isConnected,
  onSubTopicChange, onQosChange, onSubscribe, onUnsubscribe,
}) => (
  <div className="m-panel">
    <div className="m-panel-header"><span className="icon">◎</span> 토픽 구독</div>
    <div className="m-sub-row">
      <div className="m-field">
        <label>Topic (# 와일드카드 지원)</label>
        <input
          value={subTopic}
          onChange={e => onSubTopicChange(e.target.value)}
          disabled={!isConnected}
          onKeyDown={e => e.key === "Enter" && onSubscribe()}
          placeholder="topic/# or topic/sub"
        />
      </div>
      <div className="m-field" style={{ width: 90 }}>
        <label>QoS</label>
        <select value={qos} onChange={e => onQosChange(Number(e.target.value) as 0 | 1 | 2)} disabled={!isConnected}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
      <button className="m-btn m-btn-ghost" onClick={onSubscribe} disabled={!isConnected}>구독</button>
    </div>
    {subs.length > 0 && (
      <div className="m-tag-list">
        {subs.map(t => (
          <div key={t} className="m-tag">
            {t}
            <button onClick={() => onUnsubscribe(t)}>✕</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default MqttSubscribe;
