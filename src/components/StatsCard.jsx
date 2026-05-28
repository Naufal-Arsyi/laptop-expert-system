import { s } from "../styles/styles";

export function StatsCard({ icon: Icon, title, description }) {
  return (
    <div style={{ ...s.card, textAlign: "center", padding: "20px 14px" }}>
      <div
        style={{
          width: 42,
          height: 42,
          background: "#FFF0E8",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <Icon size={20} color="#00a2ff" />
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#0C1528" }}>
        {title}
      </div>
      <div style={{ ...s.muted, lineHeight: 1.5 }}>{description}</div>
    </div>
  );
}
