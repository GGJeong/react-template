import React from "react";

interface Props {
  recv: number;
  sent: number;
  subs: number;
  errors: number;
}

const MqttStats: React.FC<Props> = ({ recv, sent, subs, errors }) => (
  <div className="m-stats">
    <div className="m-stat">
      <div className="m-stat-val">{recv}</div>
      <div className="m-stat-label">수신</div>
    </div>
    <div className="m-stat">
      <div className="m-stat-val orange">{sent}</div>
      <div className="m-stat-label">발행</div>
    </div>
    <div className="m-stat">
      <div className="m-stat-val purple">{subs}</div>
      <div className="m-stat-label">구독</div>
    </div>
    <div className="m-stat">
      <div className="m-stat-val red">{errors}</div>
      <div className="m-stat-label">오류</div>
    </div>
  </div>
);

export default MqttStats;
