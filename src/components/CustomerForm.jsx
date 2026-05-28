import { s } from "../styles/styles";

export function CustomerForm({ name, phone, onChange }) {
  return (
    <div>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>
        Masukkan Data Pelanggan (Optional):
      </h3>
      <input
        placeholder="Nama Pelanggan"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
        style={{ ...s.input, marginBottom: 10 }}
      />
      <input
        placeholder="Nomor WhatsApp (cth: 62812345678)"
        value={phone}
        onChange={(e) => onChange("phone", e.target.value)}
        style={s.input}
      />
    </div>
  );
}
