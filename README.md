# Laptop Expert System

Sistem Pakar untuk Diagnosa Kerusakan Laptop menggunakan Forward Chaining dan Certainty Factor.

## Deskripsi

Laptop Expert System adalah aplikasi berbasis web yang dirancang untuk membantu mengidentifikasi masalah/kerusakan pada laptop berdasarkan gejala-gejala yang dialami. Sistem ini menggunakan:

- **Forward Chaining**: Algoritma inferensi untuk menentukan kemungkinan kerusakan dari gejala yang ada
- **Certainty Factor (CF)**: Metode untuk mengukur tingkat keyakinan diagnosis

## Fitur

- ✅ Diagnosa cepat dan akurat
- ✅ Antarmuka user-friendly
- ✅ API RESTful
- ✅ Database gejala dan kerusakan yang komprehensif
- ✅ Tingkat keyakinan diagnosis
- ✅ Solusi yang direkomendasikan
- ✅ Cetak hasil diagnosa

## Struktur Folder

```
laptop-expert-system/
├── app/
│   ├── data/
│   │   ├── gejala.py              # Data gejala
│   │   ├── kerusakan.py           # Data kerusakan
│   │   └── rules.py               # Aturan inferensi
│   │
│   ├── engine/
│   │   ├── forward_chaining.py    # Engine forward chaining
│   │   ├── certainty_factor.py    # Engine certainty factor
│   │   └── diagnosis_engine.py    # Engine diagnosis utama
│   │
│   ├── api/
│   │   └── app.py                 # Flask API
│   │
│   └── utils/
│
├── frontend/
│   ├── index.html                 # Halaman utama
│   ├── analisa_gejala.html        # Form diagnosa
│   ├── hasil.html                 # Halaman hasil
│   ├── css/
│   │   └── style.css              # Stylesheet
│   └── js/
│       ├── main.js                # JavaScript utama
│       ├── gejala.js              # Logic gejala
│       └── hasil.js               # Logic hasil
│
├── database/                       # Folder database (jika diperlukan)
├── requirements.txt                # Python dependencies
└── README.md                       # File ini
```

## Requirements

- Python 3.7+
- Flask
- Flask-CORS
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Instalasi

### Backend Setup

1. Clone atau download project ini
2. Buka terminal dan navigasi ke folder project:
   ```bash
   cd laptop-expert-system
   ```

3. Buat virtual environment (opsional tapi recommended):
   ```bash
   python -m venv venv
   ```

4. Aktivasi virtual environment:
   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **Linux/Mac**:
     ```bash
     source venv/bin/activate
     ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

Tidak ada setup khusus untuk frontend. File HTML, CSS, dan JavaScript dapat dibuka langsung di browser.

## Cara Menjalankan

### Menjalankan Backend (Flask API)

Dari folder project, jalankan:

```bash
python app/api/app.py
```

API akan berjalan di `http://localhost:5000`

### Menjalankan Frontend

1. Buka file `frontend/index.html` di browser Anda, atau
2. Jalankan local server (misal menggunakan Python):
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Kemudian buka `http://localhost:8000/frontend/index.html` di browser

## API Endpoints

### 1. Get Semua Gejala
```
GET /api/gejala
```

Response:
```json
{
    "success": true,
    "data": [
        {
            "id": "G001",
            "nama": "Laptop tidak menyala",
            "deskripsi": "Laptop sama sekali tidak merespons ketika tombol power ditekan"
        }
    ],
    "total": 10
}
```

### 2. Diagnosa
```
POST /api/diagnose
```

Request body:
```json
{
    "gejala": ["G001", "G005", "G006"]
}
```

Response:
```json
{
    "success": true,
    "gejala_input": [
        {
            "id": "G001",
            "nama": "Laptop tidak menyala",
            "deskripsi": "..."
        }
    ],
    "hasil_diagnosa": [
        {
            "id": "K001",
            "nama": "Power Supply Rusak",
            "deskripsi": "...",
            "solusi": "...",
            "tingkat_kerusakan": "Kritis",
            "confidence": 0.8,
            "confidence_label": "Sangat mungkin",
            "confidence_persen": 80.0
        }
    ],
    "rekomendasi": "..."
}
```

### 3. Health Check
```
GET /api/health
```

Response:
```json
{
    "status": "OK",
    "message": "API is running"
}
```

### 4. Reset
```
POST /api/reset
```

Response:
```json
{
    "success": true,
    "message": "Engine berhasil di-reset"
}
```

## Cara Menggunakan

1. **Buka Aplikasi**: Buka `index.html` di browser
2. **Navigasi ke Analisa Gejala**: Klik tombol "Analisa Gejala" atau "Mulai Diagnosa Sekarang"
3. **Pilih Gejala**: Centang gejala-gejala yang Anda alami
4. **Klik Diagnosa**: Tekan tombol "Diagnosa"
5. **Lihat Hasil**: Sistem akan menampilkan hasil diagnosa dengan:
   - Kerusakan yang terdeteksi
   - Tingkat keyakinan (Certainty Factor)
   - Solusi yang direkomendasikan
6. **Cetak atau Reset**: Opsi untuk mencetak hasil atau melakukan diagnosa ulang

## Data dan Rules

### Gejala yang Didukung (10 gejala)
1. Laptop tidak menyala
2. Laptop menyala sebentar lalu mati
3. Layar hitam/tidak ada tampilan
4. Layar berkedip-kedip
5. Laptop cepat panas
6. Fan bersuara bising
7. Keyboard tidak berfungsi
8. Touchpad tidak berfungsi
9. Baterai tidak mengisi
10. Baterai cepat habis

### Kerusakan yang Dapat Diidentifikasi (8 kerusakan)
1. Power Supply Rusak
2. Motherboard Rusak
3. Layar LCD Rusak
4. Sistem Pendingin Rusak
5. Keyboard Rusak
6. Touchpad Rusak
7. Baterai Rusak
8. Kabel Charger Rusak

### Aturan Inferensi (11 rules)
Sistem menggunakan 11 aturan untuk menghubungkan gejala dengan kerusakan.

## Algoritma

### Forward Chaining
Proses dari gejala (fakta) menuju kesimpulan (kerusakan):
1. Cek setiap rule apakah kondisinya terpenuhi
2. Jika kondisi terpenuhi, tambahkan kesimpulan ke derived facts
3. Ulangi sampai tidak ada fakta baru yang ditambahkan

### Certainty Factor
Mengukur tingkat keyakinan diagnosis:
- **CF = 0**: Tidak ada keyakinan
- **0 < CF ≤ 0.2**: Hampir tidak mungkin
- **0.2 < CF ≤ 0.4**: Mungkin tidak
- **0.4 < CF ≤ 0.6**: Tidak pasti
- **0.6 < CF ≤ 0.8**: Mungkin
- **0.8 < CF < 1**: Sangat mungkin
- **CF = 1**: Pasti

## Troubleshooting

### API tidak berjalan
- Pastikan Python terinstall dengan benar
- Pastikan semua dependencies terinstall (`pip install -r requirements.txt`)
- Periksa apakah port 5000 sedang digunakan

### Gejala tidak muncul
- Pastikan server API berjalan (`python app/api/app.py`)
- Periksa console browser untuk error messages
- Pastikan URL API sesuai (default: `http://localhost:5000`)

### Frontend tidak dapat mengakses API
- Pastikan CORS sudah diaktifkan di backend (sudah setting di `app.py`)
- Periksa Network tab di Developer Tools browser

## Pengembangan Lebih Lanjut

Beberapa saran pengembangan:
- Tambahkan lebih banyak gejala dan kerusakan
- Implementasi database (SQLite, PostgreSQL)
- Tambahkan user authentication
- Implementasi machine learning untuk improve diagnosis
- Tambahkan fitur chat bot
- Mobile app version
- Analytics dan reporting

## Lisensi

Proyek ini adalah proyek pembelajaran untuk sistem pakar. Bebas digunakan untuk tujuan edukatif.

## Author

Created as an Expert System Project

## Support

Untuk pertanyaan atau masalah, silakan buat issue atau hubungi penulis.

---

**Selamat menggunakan Laptop Expert System!** 🚀
