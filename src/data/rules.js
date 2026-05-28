export const RULES = [
  // ========== P01: Kerusakan Fan ==========
  {penyakit:"P01",gejala:"G01",bobot:9},
  {penyakit:"P01",gejala:"G02",bobot:10},
  {penyakit:"P01",gejala:"G18",bobot:9},
  {penyakit:"P01",gejala:"G03",bobot:6},

  // ========== P02: Kerusakan SSD/HDD ==========
  {penyakit:"P02",gejala:"G03",bobot:8},
  {penyakit:"P02",gejala:"G14",bobot:9},
  {penyakit:"P02",gejala:"G16",bobot:10},
  {penyakit:"P02",gejala:"G22",bobot:7},
  {penyakit:"P02",gejala:"G29",bobot:8},

  // ========== P03: Kerusakan RAM ==========
  {penyakit:"P03",gejala:"G03",bobot:7},
  {penyakit:"P03",gejala:"G04",bobot:9},
  {penyakit:"P03",gejala:"G15",bobot:8},
  {penyakit:"P03",gejala:"G22",bobot:9},
  {penyakit:"P03",gejala:"G27",bobot:7},

  // ========== P04: Kerusakan Power IC ==========
  {penyakit:"P04",gejala:"G05",bobot:9},
  {penyakit:"P04",gejala:"G06",bobot:9},
  {penyakit:"P04",gejala:"G23",bobot:8},
  {penyakit:"P04",gejala:"G15",bobot:7},

  // ========== P05: Kerusakan Baterai ==========
  {penyakit:"P05",gejala:"G07",bobot:9},
  {penyakit:"P05",gejala:"G08",bobot:9},
  {penyakit:"P05",gejala:"G20",bobot:8},
  {penyakit:"P05",gejala:"G06",bobot:6},

  // ========== P06: Kerusakan LCD ==========
  {penyakit:"P06",gejala:"G10",bobot:9},
  {penyakit:"P06",gejala:"G19",bobot:9},
  {penyakit:"P06",gejala:"G24",bobot:10},
  {penyakit:"P06",gejala:"G04",bobot:7},

  // ========== P07: Kerusakan Keyboard ==========
  {penyakit:"P07",gejala:"G09",bobot:10},
  {penyakit:"P07",gejala:"G21",bobot:6},

  // ========== P08: Kerusakan Motherboard ==========
  {penyakit:"P08",gejala:"G04",bobot:9},
  {penyakit:"P08",gejala:"G06",bobot:8},
  {penyakit:"P08",gejala:"G15",bobot:8},
  {penyakit:"P08",gejala:"G23",bobot:7},
  {penyakit:"P08",gejala:"G05",bobot:6},

  // ========== P09: Kerusakan WiFi Card ==========
  {penyakit:"P09",gejala:"G11",bobot:10},
  {penyakit:"P09",gejala:"G25",bobot:9},

  // ========== P10: Kerusakan Charging IC ==========
  {penyakit:"P10",gejala:"G08",bobot:9},
  {penyakit:"P10",gejala:"G20",bobot:9},
  {penyakit:"P10",gejala:"G07",bobot:7},

  // ========== Multi-symptom rules (kombinasi gejala) ==========
  {penyakit:"P01",gejala:["G01","G02"],bobot:9.5},
  {penyakit:"P01",gejala:["G01","G18"],bobot:9},
  {penyakit:"P02",gejala:["G03","G14"],bobot:8.5},
  {penyakit:"P02",gejala:["G14","G16"],bobot:9},
  {penyakit:"P03",gejala:["G03","G04"],bobot:8.5},
  {penyakit:"P03",gejala:["G04","G15"],bobot:8.5},
  {penyakit:"P03",gejala:["G15","G22"],bobot:9},
  {penyakit:"P04",gejala:["G05","G06"],bobot:9},
  {penyakit:"P04",gejala:["G06","G23"],bobot:8.5},
  {penyakit:"P05",gejala:["G07","G08"],bobot:9.5},
  {penyakit:"P05",gejala:["G08","G20"],bobot:9},
  {penyakit:"P06",gejala:["G10","G19"],bobot:9},
  {penyakit:"P06",gejala:["G19","G24"],bobot:9.5},
  {penyakit:"P08",gejala:["G04","G06"],bobot:9},
  {penyakit:"P08",gejala:["G06","G15"],bobot:8.5},
];