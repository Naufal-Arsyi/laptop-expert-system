import { PENYAKIT, RULES } from "../data/index.js";

// Formula: CF_combined = CF_user × CF_expert (where CF_expert = bobot/10)
// Sequential combination: CF_new = CF_prev + CF_curr × (1 - CF_prev)
export function calcCF(selected) {
  const scores = {};
  for (const p of PENYAKIT) {
    let cf = 0;
    for (const r of RULES) {
      if (r.penyakit !== p.id) continue;
      const userConf = selected[r.gejala];
      if (userConf == null) continue;
      const cfExpert = r.bobot / 10;
      const cfCombined = userConf * cfExpert;
      cf = cf + cfCombined * (1 - cf);
    }
    if (cf > 0) scores[p.id] = cf;
  }
  return Object.entries(scores)
    .map(([id, cf]) => ({ ...PENYAKIT.find(p => p.id === id), cf }))
    .sort((a, b) => b.cf - a.cf)
    .slice(0, 3);
}