import { GEJALA } from "../data/gejala";

/**
 * Generate WhatsApp message untuk hasil diagnosa
 * @param {Array} results - Array of diagnosis results
 * @param {Object} selected - Selected symptoms object
 * @param {Object} customer - Customer data {name, phone}
 * @returns {string} URL-encoded WhatsApp message
 */
export function generateWAMessage(results, selected, customer) {
  if (!results[0]) return "";
  
  const symptoms = Object.keys(selected)
    .map((id) => GEJALA.find((g) => g.id === id)?.nama)
    .filter(Boolean)
    .join(", ");
  
  const message = `Halo ${customer.name || "Pelanggan"}, berikut hasil diagnosa laptop Anda:\n\n📋 Gejala: ${symptoms}\n\n🔍 Diagnosa Utama: ${results[0].nama}\n📊 Tingkat Kepastian: ${(results[0].cf * 100).toFixed(1)}%\n💰 Estimasi Biaya: ${results[0].biaya}\n\nUntuk konfirmasi & perbaikan, kunjungi toko kami. Terima kasih! — LapDoc`;
  
  return encodeURIComponent(message);
}

/**
 * Generate notifikasi status untuk teknisi
 * @param {Object} caseData - Case data
 * @returns {string} Notifikasi message
 */
export function generateStatusNotification(caseData) {
  if (caseData.status === "in_progress") {
    return `Halo ${caseData.customer}, laptop Anda sedang dalam proses perbaikan kami. Estimasi selesai: ${caseData.deadline}. Kami akan memberikan update selanjutnya. Terima kasih! — LapDoc`;
  } else if (caseData.status === "done") {
    return `Halo ${caseData.customer}, perbaikan laptop Anda telah selesai. Silakan datang ke toko kami untuk pengambilan. Terima kasih telah mempercayai LapDoc!`;
  }
  return "";
}
