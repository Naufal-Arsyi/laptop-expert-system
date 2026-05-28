import { s } from "../styles/styles";
import { getStatusColor } from "../utils/statusStyles";

export function CaseCard({ caseData, onStatusChange, onNotify }) {
  const statusColor = getStatusColor(caseData.status);
  
  return (
    <div
      style={{
        ...s.card,
        borderLeft: `4px solid ${statusColor}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>{caseData.customer}</div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>#{caseData.id} • {caseData.date}</div>
        </div>
        <div style={{ ...s.badge("#F3F4F6", statusColor), textTransform: "capitalize" }}>
          {caseData.status.replace("_", " ")}
        </div>
      </div>
      
      <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
        <span style={{ fontWeight: 600 }}>{caseData.diagnosis}</span> • {caseData.biaya}
      </div>
      
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {caseData.symptoms.map((symId) => (
          <span key={symId} style={{ ...s.badge("#EFF6FF", "#3B82F6"), fontSize: 11 }}>
            {symId}
          </span>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: 8 }}>
        {caseData.status === "pending" && (
          <button
            onClick={() => onStatusChange(caseData.id, "in_progress")}
            style={{ flex: 1, ...s.btnPrimary, justifyContent: "center", fontSize: 13 }}
          >
            Mulai Perbaikan
          </button>
        )}
        {caseData.status === "in_progress" && (
          <button
            onClick={() => onStatusChange(caseData.id, "done")}
            style={{ flex: 1, ...s.btnGreen, fontSize: 13 }}
          >
            Selesaikan
          </button>
        )}
        {caseData.status === "done" && (
          <button
            onClick={() => onNotify(caseData)}
            style={{ flex: 1, ...s.btnPrimary, justifyContent: "center", background: "#25D366", fontSize: 13 }}
          >
            Kirim Notif
          </button>
        )}
      </div>
    </div>
  );
}
