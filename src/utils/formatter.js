/**
 * Format bilangan ke format rupiah
 * @param {number} num - Number to format
 * @returns {string} Formatted number with Rp
 */
export function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

/**
 * Format tanggal ke format lokal Indonesia
 * @param {string} dateStr - Date string
 * @returns {string} Formatted date
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Format confidence percentage
 * @param {number} cf - Confidence factor (0-1)
 * @returns {string} Formatted percentage
 */
export function formatConfidence(cf) {
  return `${(cf * 100).toFixed(1)}%`;
}

/**
 * Truncate text ke panjang maksimal dengan ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Max length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
