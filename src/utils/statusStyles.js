export function getStatusColor(status) {
  const colors = {
    pending: "#F97316",
    in_progress: "#3B82F6",
    done: "#22C55E",
  };
  return colors[status] || "#6B7280";
}

export function getStatusLabel(status) {
  const labels = {
    pending: "Pending",
    in_progress: "Dalam Proses",
    done: "Selesai",
  };
  return labels[status] || status;
}
