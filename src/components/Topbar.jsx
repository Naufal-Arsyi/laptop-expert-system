import { s } from "../styles/styles";

export function Topbar({ title, icon: Icon, action, actionLabel }) {
  return (
    <div style={{ ...s.topbar, justifyContent: "space-between" }}>
      <div style={s.logo}>
        <div style={s.logoBox}>
          {Icon ? <Icon size={18} color="#fff" /> : null}
        </div>
        <span style={s.brand}>{title}</span>
      </div>
      {action && (
        <button onClick={action} style={{ ...s.btnGhost, color: "#fff" }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
