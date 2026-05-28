import { LogOut, Send } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { CaseCard } from "../components/CaseCard";
import { Modal } from "../components/Modal";
import { CheckCircle } from "lucide-react";
import { s, FONTS } from "../styles/styles";

export function TechnicianDashboard({
  cases,
  onStatusChange,
  onLogout,
  showWAModal,
  onCloseWAModal,
  activeCase,
  waSent,
  waProgress,
  onSendNotification,
  qontakMsg,
}) {
  return (
    <div style={s.page}>
      <style>{FONTS}</style>

      <div style={{ ...s.topbar, justifyContent: "space-between" }}>
        <div style={s.logo}>
          <div style={s.logoBox}>
            <LogOut size={18} color="#fff" />
          </div>
          <span style={s.brand}>LapDoc Teknisi</span>
        </div>
        <button onClick={onLogout} style={{ ...s.btnGhost, color: "#fff" }}>
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div style={{ ...s.center, padding: "40px 16px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Dashboard Service</h2>

        <div style={{ display: "grid", gap: 12 }}>
          {cases.map((c) => (
            <CaseCard
              key={c.id}
              caseData={c}
              onStatusChange={onStatusChange}
              onNotify={(caseData) => {
                onSendNotification(caseData);
              }}
            />
          ))}
        </div>
      </div>

      {showWAModal && (
        <Modal onClose={onCloseWAModal}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>
              Notifikasi Status
            </span>
            <p style={{ ...s.muted, margin: "8px 0 0 0" }}>
              {activeCase?.customer}
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
                {qontakMsg}
              </div>
              <button
                onClick={onSendNotification}
                style={{ ...s.btnGreen, background: "#25D366" }}
              >
                {waProgress || "Kirim via WhatsApp"}
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CheckCircle size={48} color="#22C55E" style={{ margin: "0 auto 12px" }} />
              <p style={{ fontWeight: 600 }}>Pesan terkirim!</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
