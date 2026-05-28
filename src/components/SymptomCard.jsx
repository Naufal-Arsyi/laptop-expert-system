import { s } from "../styles/styles";

export function SymptomCard({ symptom, isSelected, onToggle, confidence, onConfidenceChange, cfLevels }) {
  const Icon = symptom.Icon;
  
  return (
    <div
      key={symptom.id}
      style={{
        ...s.card,
        cursor: "pointer",
        border: isSelected ? "2px solid #002fff" : "0.5px solid #E5E7EB",
        background: isSelected ? "#FFF5F0" : "#fff",
      }}
      onClick={() => onToggle(symptom.id)}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: isSelected ? 12 : 0 }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(symptom.id)}
          style={{ marginTop: 3, cursor: "pointer" }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            {Icon && <Icon size={16} color="#00a2ff" />}
            <span style={{ fontWeight: 600, fontSize: 14 }}>{symptom.nama}</span>
          </div>
        </div>
      </div>
      
      {isSelected && cfLevels && (
        <div style={{ paddingLeft: 26 }}>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>Tingkat Keyakinan:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {cfLevels.map((lv) => (
              <button
                key={lv}
                onClick={(e) => {
                  e.stopPropagation();
                  onConfidenceChange(symptom.id, lv);
                }}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 500,
                  border: confidence === lv ? "2px solid #002fff" : "1px solid #D1D5DB",
                  background: confidence === lv ? "#00a2ff" : "#fff",
                  color: confidence === lv ? "#fff" : "#374151",
                  cursor: "pointer",
                }}
              >
                {(lv * 100) | 0}%
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
