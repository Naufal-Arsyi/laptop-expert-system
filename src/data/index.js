 import {
  Flame, Zap, Battery, Monitor, Wifi, HardDrive, Keyboard, RotateCcw,
  Wind, Snowflake, AlertCircle, CheckCircle, X, Printer, MessageSquare,
  LogOut, Search, Laptop, Clock, ChevronRight, ArrowLeft,
  Activity, Send, Wrench, Star, Check, Shield, Disc, Mouse,
  Volume2, Usb, RefreshCw, Radio, Bluetooth, Camera, FileX, Tv
} from "lucide-react";

export const GEJALA = [
  {id:"G01",nama:"Laptop cepat panas",Icon:Flame},
  {id:"G02",nama:"Fan berisik",Icon:Wind},
  {id:"G03",nama:"Laptop lambat",Icon:Activity},
  {id:"G04",nama:"Blue screen (BSOD)",Icon:Monitor},
  {id:"G05",nama:"Tidak bisa menyala",Icon:Zap},
  {id:"G06",nama:"Mati mendadak",Icon:Zap},
  {id:"G07",nama:"Baterai cepat habis",Icon:Battery},
  {id:"G08",nama:"Tidak bisa charging",Icon:Zap},
  {id:"G09",nama:"Keyboard tidak berfungsi",Icon:Keyboard},
  {id:"G10",nama:"Layar berkedip",Icon:Monitor},
  {id:"G11",nama:"WiFi sering putus",Icon:Wifi},
  {id:"G12",nama:"Speaker pecah",Icon:Volume2},
  {id:"G13",nama:"USB tidak terbaca",Icon:Usb},
  {id:"G14",nama:"Booting sangat lama",Icon:Clock},
  {id:"G15",nama:"Restart sendiri",Icon:RotateCcw},
  {id:"G16",nama:"HDD berbunyi",Icon:Disc},
  {id:"G17",nama:"Touchpad tidak berfungsi",Icon:Mouse},
  {id:"G18",nama:"Overheat saat gaming",Icon:Flame},
  {id:"G19",nama:"Layar gelap",Icon:Monitor},
  {id:"G20",nama:"Charger panas",Icon:Flame},
  {id:"G21",nama:"Kursor bergerak sendiri",Icon:Mouse},
  {id:"G22",nama:"Laptop freeze",Icon:Snowflake},
  {id:"G23",nama:"Bunyi beep terus",Icon:Radio},
  {id:"G24",nama:"Tidak ada tampilan",Icon:Tv},
  {id:"G25",nama:"Bluetooth tidak berfungsi",Icon:Bluetooth},
  {id:"G26",nama:"Webcam tidak berfungsi",Icon:Camera},
  {id:"G27",nama:"Laptop sering lag",Icon:Activity},
  {id:"G28",nama:"FPS game drop",Icon:Activity},
  {id:"G29",nama:"Sistem operasi corrupt",Icon:FileX},
  {id:"G30",nama:"Port HDMI tidak berfungsi",Icon:Tv},
];

export const PENYAKIT = [
  {id:"P01",nama:"Kerusakan Fan",biaya:"Rp 150.000 – 300.000"},
  {id:"P02",nama:"Kerusakan SSD/HDD",biaya:"Rp 350.000 – 900.000"},
  {id:"P03",nama:"Kerusakan RAM",biaya:"Rp 250.000 – 700.000"},
  {id:"P04",nama:"Kerusakan Power IC",biaya:"Rp 500.000 – 1.500.000"},
  {id:"P05",nama:"Kerusakan Baterai",biaya:"Rp 300.000 – 1.200.000"},
  {id:"P06",nama:"Kerusakan LCD",biaya:"Rp 700.000 – 2.500.000"},
  {id:"P07",nama:"Kerusakan Keyboard",biaya:"Rp 150.000 – 500.000"},
  {id:"P08",nama:"Kerusakan Motherboard",biaya:"Rp 800.000 – 3.000.000"},
  {id:"P09",nama:"Kerusakan WiFi Card",biaya:"Rp 150.000 – 400.000"},
  {id:"P10",nama:"Kerusakan Charging IC",biaya:"Rp 400.000 – 1.200.000"},
];

export const RULES = [
  {penyakit:"P01",gejala:"G01",bobot:9},{penyakit:"P01",gejala:"G02",bobot:10},
  {penyakit:"P01",gejala:"G18",bobot:8},{penyakit:"P01",gejala:"G06",bobot:6},
  {penyakit:"P01",gejala:"G27",bobot:5},{penyakit:"P01",gejala:"G28",bobot:6},
  {penyakit:"P02",gejala:"G03",bobot:8},{penyakit:"P02",gejala:"G04",bobot:7},
  {penyakit:"P02",gejala:"G14",bobot:10},{penyakit:"P02",gejala:"G16",bobot:9},
  {penyakit:"P02",gejala:"G22",bobot:7},{penyakit:"P02",gejala:"G29",bobot:8},
  {penyakit:"P03",gejala:"G04",bobot:9},{penyakit:"P03",gejala:"G15",bobot:8},
  {penyakit:"P03",gejala:"G05",bobot:6},{penyakit:"P03",gejala:"G22",bobot:7},
  {penyakit:"P03",gejala:"G23",bobot:10},{penyakit:"P04",gejala:"G05",bobot:10},
  {penyakit:"P04",gejala:"G06",bobot:8},{penyakit:"P04",gejala:"G20",bobot:7},
  {penyakit:"P04",gejala:"G24",bobot:8},{penyakit:"P05",gejala:"G07",bobot:10},
  {penyakit:"P05",gejala:"G08",bobot:8},{penyakit:"P05",gejala:"G20",bobot:6},
  {penyakit:"P05",gejala:"G06",bobot:4},{penyakit:"P06",gejala:"G10",bobot:8},
  {penyakit:"P06",gejala:"G19",bobot:10},{penyakit:"P06",gejala:"G24",bobot:9},
  {penyakit:"P06",gejala:"G30",bobot:5},{penyakit:"P07",gejala:"G09",bobot:10},
  {penyakit:"P07",gejala:"G21",bobot:7},{penyakit:"P08",gejala:"G05",bobot:9},
  {penyakit:"P08",gejala:"G06",bobot:8},{penyakit:"P08",gejala:"G15",bobot:7},
  {penyakit:"P08",gejala:"G19",bobot:8},{penyakit:"P08",gejala:"G24",bobot:10},
  {penyakit:"P08",gejala:"G30",bobot:6},{penyakit:"P09",gejala:"G11",bobot:10},
  {penyakit:"P09",gejala:"G25",bobot:8},{penyakit:"P10",gejala:"G08",bobot:9},
  {penyakit:"P10",gejala:"G20",bobot:8},{penyakit:"P10",gejala:"G06",bobot:5},
  {penyakit:"P10",gejala:"G07",bobot:4},
];

export const MOCK_CASES = [
  {id:"SV-001",customer:"Budi Santoso",phone:"081234567890",date:"2026-05-24",
   symptoms:["G01","G02","G18"],diagnosis:"Kerusakan Fan",biaya:"Rp 150.000 – 300.000",deadline:"2 hari kerja",status:"pending"},
  {id:"SV-002",customer:"Siti Rahayu",phone:"082345678901",date:"2026-05-23",
   symptoms:["G07","G08","G20"],diagnosis:"Kerusakan Baterai",biaya:"Rp 300.000 – 1.200.000",deadline:"3-5 hari kerja",status:"in_progress"},
  {id:"SV-003",customer:"Dian Pertiwi",phone:"083456789012",date:"2026-05-22",
   symptoms:["G10","G19","G24"],diagnosis:"Kerusakan LCD",biaya:"Rp 700.000 – 2.500.000",deadline:"5-7 hari kerja",status:"in_progress"},
  {id:"SV-004",customer:"Ahmad Fauzi",phone:"084567890123",date:"2026-05-21",
   symptoms:["G03","G14","G16"],diagnosis:"Kerusakan SSD/HDD",biaya:"Rp 350.000 – 900.000",deadline:"Selesai",status:"done"},
  {id:"SV-005",customer:"Rina Wulandari",phone:"085678901234",date:"2026-05-25",
   symptoms:["G05","G06","G24"],diagnosis:"Kerusakan Power IC / Motherboard",biaya:"Rp 500.000 – 3.000.000",deadline:"5-7 hari kerja",status:"pending"},
];

export const CF_LEVELS = [0.2, 0.4, 0.6, 0.8, 1.0];
export const CF_LABELS = {0.2:"Tidak Yakin",0.4:"Kurang Yakin",0.6:"Cukup Yakin",0.8:"Yakin",1.0:"Sangat Yakin"};
