# 🖥️ Laptop Expert System - React + Vite

Sistem Pakar Diagnosa Kerusakan Laptop menggunakan algoritma **Certainty Factor** dengan frontend React modern.

## ✅ Setup Selesai!

### 🚀 Development Server
Server sudah berjalan di **http://localhost:5173/**

**Terminal Command:**
```bash
npm run dev
```

### 📦 Struktur Project

```
laptop-expert-system/
├── src/
│   ├── App.jsx           # React App Component (Main)
│   ├── main.jsx          # Entry Point
│   └── index.css         # Global Styles
├── index.html            # HTML Entry (Vite)
├── vite.config.js        # Vite Configuration
├── package.json          # Dependencies
├── app/                  # Python Flask Backend
│   ├── api/app.py
│   ├── engine/
│   ├── data/
│   └── utils/
└── frontend/             # (Legacy - dapat dihapus)
```

### 🔧 Fitur Aplikasi

**Diagnosis Engine:**
- ✅ 30 gejala laptop (Gejala.G01-G30)
- ✅ 10 jenis kerusakan hardware/software (P01-P10)
- ✅ 45 rules dengan Certainty Factor
- ✅ Algoritma forward chaining
- ✅ CF kombinasi sekuensial

**Interface:**
- ✅ Landing page hero
- ✅ Symptom selection dengan confidence level
- ✅ Real-time diagnosis results
- ✅ WhatsApp integration (Qontak API ready)
- ✅ Technician dashboard
- ✅ Order management

**UI Components:**
- Icons dari lucide-react
- Responsive grid layout
- Modal dialogs
- Form validation
- Progress indicators

### 📋 Available Scripts

```bash
# Development
npm run dev          # Jalankan dev server (http://localhost:5173)

# Production
npm run build        # Build untuk production
npm run preview      # Preview production build

# Linting
npm run lint         # ESLint check
```

### 🔌 Backend Integration

Flask API endpoints tersedia di `/app/api/app.py`:
```
GET    /api/gejala      # Daftar gejala
POST   /api/diagnose    # Diagnosis endpoint
POST   /api/reset       # Reset session
GET    /api/health      # Health check
```

Frontend siap untuk connect ke backend melalui fetch/axios.

### 🎨 Technologies

- **Frontend:** React 18.2 + Vite 5.0
- **Styling:** CSS-in-JS (inline styles)
- **Icons:** lucide-react
- **Backend:** Flask (Python)
- **Algorithm:** Certainty Factor (CF) + Forward Chaining

### 💡 Deployment

Untuk production:
```bash
npm run build        # Generate dist/
# Deploy dist/ folder ke server
```

---

✨ **Status:** Ready to use! Server jalan di http://localhost:5173/
