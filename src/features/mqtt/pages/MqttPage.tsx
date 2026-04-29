import { useState, useEffect, useRef, useCallback } from "react";
import { LogEntry } from "../types";
import MqttStats from "../components/MqttStats";
import MqttConnection from "../components/MqttConnection";
import MqttSubscribe from "../components/MqttSubscribe";
import MqttPublish from "../components/MqttPublish";
import MqttMessageLog from "../components/MqttMessageLog";

declare global {
  interface Window {
    mqtt: any;
  }
}

const MQTT_CDN = "https://cdnjs.cloudflare.com/ajax/libs/mqtt/5.10.1/mqtt.min.js";
const DEFAULT_BROKER = "wss://broker.hivemq.com:8884/mqtt";
const DEFAULT_TOPIC = "claude/mqtt/demo";
const CLIENT_ID = `claude-client-${Math.random().toString(16).slice(2, 8)}`;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

  .mqtt-wrap { --bg:#0a0c0f;--surface:#111417;--panel:#161a1e;--border:#252930;--border-hi:#353d47;--accent:#00d4aa;--accent2:#ff6b35;--accent3:#7c6cf8;--text:#e2e8f0;--muted:#6b7a8d;--danger:#ff4757;--success:#00d4aa;--warn:#ffc107;--mono:'IBM Plex Mono',monospace;--sans:'Space Grotesk',sans-serif; background:var(--bg);color:var(--text);font-family:var(--mono);border-radius:12px;overflow:hidden; }

  .mqtt-wrap .m-app { max-width:1060px;margin:0 auto;padding:24px 16px 48px;display:flex;flex-direction:column;gap:16px; }

  .mqtt-wrap .m-header { display:flex;align-items:center;gap:14px;padding:20px 0 12px;border-bottom:1px solid var(--border); }
  .mqtt-wrap .m-logo { width:40px;height:40px;border:2px solid var(--accent);border-radius:8px;display:grid;place-items:center;font-size:18px;color:var(--accent);flex-shrink:0;box-shadow:0 0 16px rgba(0,212,170,.3);animation:mqttPulse 3s ease-in-out infinite; }
  @keyframes mqttPulse { 0%,100%{box-shadow:0 0 16px rgba(0,212,170,.3);}50%{box-shadow:0 0 28px rgba(0,212,170,.6);} }
  .mqtt-wrap .m-header-title h1 { font-family:var(--sans);font-size:22px;font-weight:700;letter-spacing:-.5px; }
  .mqtt-wrap .m-header-title p { font-size:11px;color:var(--muted);margin-top:2px; }
  .mqtt-wrap .m-status-badge { margin-left:auto;display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;border:1px solid var(--border);font-size:11px;font-weight:500;transition:all .3s; }
  .mqtt-wrap .m-status-badge.connected{border-color:var(--success);color:var(--success);}
  .mqtt-wrap .m-status-badge.disconnected{border-color:var(--muted);color:var(--muted);}
  .mqtt-wrap .m-status-badge.connecting{border-color:var(--warn);color:var(--warn);}
  .mqtt-wrap .m-status-badge.error{border-color:var(--danger);color:var(--danger);}
  .mqtt-wrap .m-dot{width:7px;height:7px;border-radius:50%;background:currentColor;}
  .mqtt-wrap .m-dot.blink{animation:mqttBlink .9s step-start infinite;}
  @keyframes mqttBlink{50%{opacity:0;}}

  .mqtt-wrap .m-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden;}
  .mqtt-wrap .m-stat{background:var(--surface);padding:14px 16px;text-align:center;}
  .mqtt-wrap .m-stat-val{font-family:var(--sans);font-size:26px;font-weight:700;line-height:1;color:var(--accent);}
  .mqtt-wrap .m-stat-val.orange{color:var(--accent2);}
  .mqtt-wrap .m-stat-val.purple{color:var(--accent3);}
  .mqtt-wrap .m-stat-val.red{color:var(--danger);}
  .mqtt-wrap .m-stat-label{font-size:10px;color:var(--muted);margin-top:4px;letter-spacing:.08em;text-transform:uppercase;}

  .mqtt-wrap .m-panel{background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;}
  .mqtt-wrap .m-panel-header{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);background:var(--panel);font-size:11px;font-weight:600;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;}
  .mqtt-wrap .m-panel-header .icon{color:var(--accent);font-size:14px;}

  .mqtt-wrap .m-field{display:flex;flex-direction:column;gap:6px;}
  .mqtt-wrap .m-field label{font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;}
  .mqtt-wrap .m-field input,.mqtt-wrap .m-field select{background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:9px 12px;color:var(--text);font-family:var(--mono);font-size:12px;outline:none;transition:border-color .2s;width:100%;}
  .mqtt-wrap .m-field input:focus{border-color:var(--accent);}
  .mqtt-wrap .m-field input:disabled,.mqtt-wrap .m-field select:disabled{opacity:.4;cursor:not-allowed;}

  .mqtt-wrap .m-btn{padding:9px 18px;border-radius:6px;border:none;cursor:pointer;font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:.04em;transition:all .15s;white-space:nowrap;}
  .mqtt-wrap .m-btn:disabled{opacity:.4;cursor:not-allowed;}
  .mqtt-wrap .m-btn-primary{background:var(--accent);color:#000;}
  .mqtt-wrap .m-btn-primary:hover:not(:disabled){filter:brightness(1.15);}
  .mqtt-wrap .m-btn-danger{background:transparent;border:1px solid var(--danger);color:var(--danger);}
  .mqtt-wrap .m-btn-danger:hover:not(:disabled){background:rgba(255,71,87,.15);}
  .mqtt-wrap .m-btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text);}
  .mqtt-wrap .m-btn-ghost:hover:not(:disabled){border-color:var(--border-hi);background:var(--panel);}
  .mqtt-wrap .m-btn-accent2{background:var(--accent2);color:#fff;}
  .mqtt-wrap .m-btn-accent2:hover:not(:disabled){filter:brightness(1.1);}

  .mqtt-wrap .m-conn-grid{display:grid;grid-template-columns:1fr auto;gap:12px;padding:16px;align-items:end;}
  .mqtt-wrap .m-sub-row{display:flex;gap:10px;padding:0 16px 16px;align-items:flex-end;flex-wrap:wrap;}
  .mqtt-wrap .m-sub-row .m-field{flex:1;min-width:180px;}
  .mqtt-wrap .m-tag-list{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 16px;}
  .mqtt-wrap .m-tag{display:flex;align-items:center;gap:6px;padding:4px 10px 4px 12px;border-radius:100px;background:rgba(0,212,170,.08);border:1px solid rgba(0,212,170,.25);font-size:11px;color:var(--accent);}
  .mqtt-wrap .m-tag button{background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px;line-height:1;padding:0;}
  .mqtt-wrap .m-tag button:hover{color:var(--danger);}

  .mqtt-wrap .m-pub-grid{display:grid;grid-template-columns:1fr 80px 80px;gap:12px;padding:0 16px 12px;align-items:end;}
  .mqtt-wrap .m-pub-row{display:flex;gap:10px;padding:0 16px 16px;align-items:flex-end;}
  .mqtt-wrap .m-pub-row .m-field{flex:1;}
  .mqtt-wrap .m-msg-input{background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;color:var(--text);font-family:var(--mono);font-size:12px;outline:none;resize:vertical;width:100%;min-height:72px;transition:border-color .2s;}
  .mqtt-wrap .m-msg-input:focus{border-color:var(--accent2);}

  .mqtt-wrap .m-log-container{height:340px;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth;}
  .mqtt-wrap .m-log-container::-webkit-scrollbar{width:4px;}
  .mqtt-wrap .m-log-container::-webkit-scrollbar-thumb{background:var(--border-hi);border-radius:4px;}
  .mqtt-wrap .m-log-item{display:grid;grid-template-columns:auto 1fr;gap:0 12px;padding:10px 12px;border-radius:8px;border:1px solid var(--border);background:var(--panel);animation:mqttSlideIn .2s ease;position:relative;overflow:hidden;}
  @keyframes mqttSlideIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .mqtt-wrap .m-log-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;}
  .mqtt-wrap .m-log-item.received::before{background:var(--accent);}
  .mqtt-wrap .m-log-item.sent::before{background:var(--accent2);}
  .mqtt-wrap .m-log-item.system::before{background:var(--accent3);}
  .mqtt-wrap .m-log-meta{grid-column:1/-1;display:flex;align-items:center;gap:10px;margin-bottom:4px;}
  .mqtt-wrap .m-log-type{font-size:9px;font-weight:700;letter-spacing:.12em;padding:2px 7px;border-radius:4px;text-transform:uppercase;}
  .mqtt-wrap .m-log-item.received .m-log-type{background:rgba(0,212,170,.15);color:var(--accent);}
  .mqtt-wrap .m-log-item.sent .m-log-type{background:rgba(255,107,53,.15);color:var(--accent2);}
  .mqtt-wrap .m-log-item.system .m-log-type{background:rgba(124,108,248,.15);color:var(--accent3);}
  .mqtt-wrap .m-log-topic{font-size:11px;color:var(--muted);flex:1;}
  .mqtt-wrap .m-log-time{font-size:10px;color:var(--muted);opacity:.7;}
  .mqtt-wrap .m-log-payload{grid-column:1/-1;font-size:12px;word-break:break-all;white-space:pre-wrap;color:var(--text);}
  .mqtt-wrap .m-empty-log{text-align:center;padding:60px 20px;color:var(--muted);font-size:12px;}
  .mqtt-wrap .m-empty-log .icon{font-size:32px;margin-bottom:12px;opacity:.3;}
  .mqtt-wrap .m-log-controls{display:flex;align-items:center;gap:10px;padding:10px 16px;border-top:1px solid var(--border);background:var(--panel);}
  .mqtt-wrap .m-log-count{font-size:11px;color:var(--muted);margin-left:auto;}

  @media(max-width:640px){
    .mqtt-wrap .m-conn-grid{grid-template-columns:1fr;}
    .mqtt-wrap .m-pub-grid{grid-template-columns:1fr 1fr;}
    .mqtt-wrap .m-stats{grid-template-columns:repeat(2,1fr);}
  }
`;

function timestamp() {
  return new Date().toLocaleTimeString("ko-KR", { hour12: false });
}

function loadMqttScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.mqtt) return resolve();
    const s = document.createElement("script");
    s.src = MQTT_CDN;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function MqttPage() {
  const [broker,     setBroker]     = useState(DEFAULT_BROKER);
  const [clientId,   setClientId]   = useState(CLIENT_ID);
  const [status,     setStatus]     = useState<"disconnected"|"connecting"|"connected"|"error">("disconnected");
  const [logs,       setLogs]       = useState<LogEntry[]>([]);
  const [subTopic,   setSubTopic]   = useState(DEFAULT_TOPIC);
  const [subs,       setSubs]       = useState<string[]>([]);
  const [pubTopic,   setPubTopic]   = useState(DEFAULT_TOPIC);
  const [pubPayload, setPubPayload] = useState('{"hello":"world","ts":0}');
  const [qos,        setQos]        = useState<0|1|2>(0);
  const [retain,     setRetain]     = useState(false);
  const [stats,      setStats]      = useState({ recv: 0, sent: 0, errors: 0, subs: 0 });

  const clientRef = useRef<any>(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  const addLog = useCallback((type: LogEntry["type"], topic: string, payload: string) => {
    setLogs(prev => [...prev.slice(-199), { id: Date.now() + Math.random(), type, topic, payload, time: timestamp() }]);
  }, []);

  const connect = async () => {
    setStatus("connecting");
    try {
      await loadMqttScript();
      const client = window.mqtt.connect(broker, { clientId, clean: true, reconnectPeriod: 0 });
      clientRef.current = client;
      client.on("connect", () => { setStatus("connected"); addLog("system", "—", `브로커 연결됨: ${broker}`); });
      client.on("message", (topic: string, message: Buffer) => {
        addLog("received", topic, message.toString());
        setStats(s => ({ ...s, recv: s.recv + 1 }));
      });
      client.on("error", (err: Error) => {
        setStatus("error");
        addLog("system", "—", `오류: ${err.message}`);
        setStats(s => ({ ...s, errors: s.errors + 1 }));
      });
      client.on("close", () => { setStatus("disconnected"); addLog("system", "—", "연결 해제됨"); });
    } catch (e: any) {
      setStatus("error");
      addLog("system", "—", `MQTT 라이브러리 로드 실패: ${e.message}`);
    }
  };

  const disconnect = () => {
    clientRef.current?.end(true);
    clientRef.current = null;
    setSubs([]);
    setStats(s => ({ ...s, subs: 0 }));
  };

  const subscribe = () => {
    const t = subTopic.trim();
    if (!t || !clientRef.current || subs.includes(t)) return;
    clientRef.current.subscribe(t, { qos }, (err: Error) => {
      if (err) {
        addLog("system", t, `구독 실패: ${err.message}`);
      } else {
        setSubs(prev => [...prev, t]);
        setStats(s => ({ ...s, subs: s.subs + 1 }));
        addLog("system", t, `구독 시작 (QoS ${qos})`);
      }
    });
  };

  const unsubscribe = (t: string) => {
    clientRef.current?.unsubscribe(t, () => {
      setSubs(prev => prev.filter(s => s !== t));
      setStats(s => ({ ...s, subs: Math.max(0, s.subs - 1) }));
      addLog("system", t, "구독 해제됨");
    });
  };

  const publish = () => {
    const t = pubTopic.trim();
    if (!t || !clientRef.current) return;
    let payload = pubPayload;
    try { const obj = JSON.parse(payload); obj.ts = Date.now(); payload = JSON.stringify(obj); } catch (_) {}
    clientRef.current.publish(t, payload, { qos, retain }, (err: Error) => {
      if (err) {
        addLog("system", t, `발행 실패: ${err.message}`);
        setStats(s => ({ ...s, errors: s.errors + 1 }));
      } else {
        addLog("sent", t, payload);
        setStats(s => ({ ...s, sent: s.sent + 1 }));
      }
    });
  };

  const statusLabel = { connected: "CONNECTED", disconnected: "DISCONNECTED", connecting: "CONNECTING…", error: "ERROR" }[status];

  return (
    <div className="mqtt-wrap">
      <div className="m-app">
        <div className="m-header">
          <div className="m-logo">◈</div>
          <div className="m-header-title">
            <h1>MQTT Client</h1>
            <p>WebSocket · MQTT over WSS · Real-time messaging</p>
          </div>
          <div className={`m-status-badge ${status}`}>
            <div className={`m-dot ${status === "connecting" ? "blink" : ""}`} />
            {statusLabel}
          </div>
        </div>

        <MqttStats {...stats} />

        <MqttConnection
          broker={broker}
          clientId={clientId}
          status={status}
          onBrokerChange={setBroker}
          onClientIdChange={setClientId}
          onConnect={connect}
          onDisconnect={disconnect}
        />

        <MqttSubscribe
          subTopic={subTopic}
          subs={subs}
          qos={qos}
          isConnected={status === "connected"}
          onSubTopicChange={setSubTopic}
          onQosChange={setQos}
          onSubscribe={subscribe}
          onUnsubscribe={unsubscribe}
        />

        <MqttPublish
          pubTopic={pubTopic}
          pubPayload={pubPayload}
          qos={qos}
          retain={retain}
          isConnected={status === "connected"}
          onPubTopicChange={setPubTopic}
          onPubPayloadChange={setPubPayload}
          onQosChange={setQos}
          onRetainChange={setRetain}
          onPublish={publish}
        />

        <MqttMessageLog
          logs={logs}
          onClearLogs={() => setLogs([])}
        />
      </div>
    </div>
  );
}
