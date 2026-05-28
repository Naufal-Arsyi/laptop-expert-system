import { s } from "../styles/styles";

export function ResultCard({ result, index }) {
  return (
    <div
      style={{
        ...s.card,
        borderLeft: `4px solid ${index === 0 ? "#00a2ff" : "#D1D5DB"}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>
          {index + 1}. {result.nama}
        </div>
        <div
          style={{
            background: index === 0 ? "#00a2ff" : "#F3F4F6",
            color: index === 0 ? "#fff" : "#6B7280",
            padding: "4px 12px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {(result.cf * 100).toFixed(1)}%
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>
        Estimasi Biaya: {result.biaya}
      </div>
      <div style={{ width: "100%", height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            width: `${result.cf * 100}%`,
            height: "100%",
            background: index === 0 ? "#00a2ff" : "#94A3B8",
          }}
        ></div>
      </div>
    </div>
  );
}
