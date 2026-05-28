import { Search } from "lucide-react";
import { s } from "../styles/styles";

export function SearchBar({ value, onChange, placeholder = "Cari..." }) {
  return (
    <div style={{ position: "relative" }}>
      <Search size={18} style={{ position: "absolute", left: 12, top: 12, color: "#9CA3B8", pointerEvents: "none" }} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...s.input, paddingLeft: 40 }}
      />
    </div>
  );
}
