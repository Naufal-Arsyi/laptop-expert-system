import { useMemo } from "react";
import { AlertCircle, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { ResultCard } from "../components/ResultCard";
import { CustomerForm } from "../components/CustomerForm";
import { Modal } from "../components/Modal";
import { s, FONTS } from "../styles/styles";
import { GEJALA } from "../data/gejala";

export function ResultsPage({
  results,
  selected,
  customer,
  onCustomerChange,
  onBack,
  onAnalyzeAgain,
  onSendWA,
  showWAModal,
  onCloseWAModal,
  waSent,
  waProgress,
}) {
  const waText = useMemo(() => {
    if (!results[0]) return "";
    const syms = Object.keys(selected)
      .map((id) => GEJALA.find((g) => g.id === id)?.nama)
      .filter(Boolean)
      .join(", ");
    return encodeURIComponent(
      `Halo ${customer.name || "Pelanggan"}, berikut hasil diagnosa laptop Anda:\n\n📋 Gejala: ${syms}\n\n🔍 Diagnosa Utama: ${results[0].nama}\n📊 Tingkat Kepastian: ${(results[0].cf * 100).toFixed(1)}%\n💰 Estimasi Biaya: ${results[0].biaya}\n\nUntuk konfirmasi & perbaikan, kunjungi toko kami. Terima kasih! — LapDoc`
    );
  }, [results, selected, customer]);

  return (
    <div style={s.page}>
      <style>{FONTS}</style>

      <Topbar
        title="LapDoc"
        action={onBack}
        actionLabel="Kembali"
      />

      <div style={{ ...s.center, padding: "40px 16px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Hasil Analisis</h2>
        <p style={{ color: "#6B7280", marginBottom: 20 }}>Berdasarkan gejala yang Anda pilih</p>

        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 8 }}>
            Gejala yang Dipilih:
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.keys(selected).map((id) => {
              const g = GEJALA.find((x) => x.id === id);
              return g ? (
                <span
                  key={id}
                  style={{
                    ...s.badge("#FFF0E8", "#002fff"),
                    textDecoration: "none",
                  }}
                >
                  {g.nama}
                </span>
              ) : null;
            })}
          </div>
        </div>

        {results.length > 0 ? (
          <>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>
                Kemungkinan Kerusakan:
              </h3>
              <div style={{ display: "grid", gap: 12 }}>
                {results.map((r, i) => (
                  <ResultCard key={r.id} result={r} index={i} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <CustomerForm
                name={customer.name}
                phone={customer.phone}
                onChange={onCustomerChange}
              />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={onAnalyzeAgain} style={{ flex: 1, ...s.btnGhost }}>
                Analisis Ulang
              </button>
              <button
                onClick={onSendWA}
                style={{
                  flex: 1,
                  ...s.btnPrimary,
                  justifyContent: "center",
                  background: "#25D366",
                }}
              >
                <Send size={16} /> Kirim Hasil
              </button>
            </div>

            {showWAModal && (
              <Modal onClose={onCloseWAModal}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        background: "#25D366",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Send size={14} color="#fff" />
                    </div>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>
                      Kirim via WhatsApp
                    </span>
                  </div>
                  <p style={{ ...s.muted, margin: "8px 0 0 0" }}>
                    Hasil diagnosa akan dikirim ke WhatsApp
                  </p>
                </div>

                {!waSent ? (
                  <>
                    <div
                      style={{
                        background: "#F3F4F6",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 16,
                        fontSize: 13,
                        lineHeight: 1.6,
                        maxHeight: 120,
                        overflowY: "auto",
                      }}
                    >
                      {waText.slice(0, 100)}...
                    </div>
                    <button
                      onClick={() => {
                        onSendWA();
                      }}
                      disabled={!customer.phone}
                      style={{
                        ...s.btnGreen,
                        background: customer.phone ? "#25D366" : "#D1D5DB",
                        cursor: customer.phone ? "pointer" : "not-allowed",
                        opacity: customer.phone ? 1 : 0.6,
                      }}
                    >
                      {waProgress || "Kirim ke WhatsApp"}
                    </button>
                    {!customer.phone && (
                      <p style={{ color: "#EF4444", fontSize: 12, marginTop: 8 }}>
                        ⚠️ Masukkan nomor WhatsApp terlebih dahulu
                      </p>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <CheckCircle size={48} color="#22C55E" style={{ margin: "0 auto 12px" }} />
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>Hasil telah dikirim!</p>
                    <p style={{ ...s.muted }}>Pelanggan akan menerima hasil diagnosa di WhatsApp</p>
                  </div>
                )}
              </Modal>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <AlertCircle size={48} color="#00a2ff" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontWeight: 600 }}>Tidak ada hasil</p>
            <p style={{ ...s.muted }}>Coba analisis dengan gejala yang berbeda</p>
          </div>
        )}
      </div>
    </div>
  );
}
