import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { SearchBar } from "../components/SearchBar";
import { SymptomCard } from "../components/SymptomCard";
import { s, FONTS } from "../styles/styles";

export function SymptomsPage({ gejala, cf_levels, selected, onToggle, onConfidenceChange, search, onSearch, onAnalyze, onBack }) {
  const filtered = useMemo(
    () => gejala.filter((g) => g.nama.toLowerCase().includes(search.toLowerCase())),
    [gejala, search]
  );

  return (
    <div style={s.page}>
      <style>{FONTS}</style>
      
      <Topbar
        title="LapDoc"
        action={onBack}
        actionLabel="Kembali"
      />

      <div style={{ ...s.center, padding: "40px 16px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Pilih Gejala Laptop</h2>
        <p style={{ color: "#6B7280", marginBottom: 20 }}>
          Centang gejala yang Anda alami, lalu sesuaikan tingkat keyakinan Anda
        </p>

        <div style={{ marginBottom: 24 }}>
          <SearchBar
            value={search}
            onChange={onSearch}
            placeholder="Cari gejala..."
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 24,
        }}>
          {filtered.map((g) => (
            <SymptomCard
              key={g.id}
              symptom={g}
              isSelected={g.id in selected}
              onToggle={onToggle}
              confidence={selected[g.id]}
              onConfidenceChange={onConfidenceChange}
              cfLevels={cf_levels}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onBack} style={{ flex: 1, ...s.btnGhost }}>
            Batalkan
          </button>
          <button
            disabled={Object.keys(selected).length === 0}
            onClick={onAnalyze}
            style={{
              flex: 1,
              ...s.btnPrimary,
              justifyContent: "center",
              opacity: Object.keys(selected).length === 0 ? 0.5 : 1,
              cursor: Object.keys(selected).length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Analisis
          </button>
        </div>
      </div>
    </div>
  );
}
