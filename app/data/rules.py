# Rules untuk sistem expert laptop menggunakan forward chaining
# Berisi aturan-aturan untuk mendiagnosa kerusakan laptop

rules = [
    {
        "id": "R001",
        "nama": "Power Supply Problem",
        "kondisi": ["G001"],  # Laptop tidak menyala
        "kesimpulan": "K001",  # Power Supply Rusak
        "cf": 0.8  # Certainty Factor
    },
    {
        "id": "R002",
        "nama": "Power Supply dengan Start-Stop",
        "kondisi": ["G002"],  # Laptop menyala sebentar lalu mati
        "kesimpulan": "K001",  # Power Supply Rusak
        "cf": 0.7
    },
    {
        "id": "R003",
        "nama": "Motherboard Problem dengan Gejala Multiple",
        "kondisi": ["G001", "G002"],
        "kesimpulan": "K002",  # Motherboard Rusak
        "cf": 0.85
    },
    {
        "id": "R004",
        "nama": "Layar LCD Tidak Menampilkan",
        "kondisi": ["G003"],  # Layar hitam/tidak ada tampilan
        "kesimpulan": "K003",  # Layar LCD Rusak
        "cf": 0.75
    },
    {
        "id": "R005",
        "nama": "Layar Berflicker",
        "kondisi": ["G004"],  # Layar berkedip-kedip
        "kesimpulan": "K003",  # Layar LCD Rusak
        "cf": 0.7
    },
    {
        "id": "R006",
        "nama": "Overheating Problem",
        "kondisi": ["G005", "G006"],  # Laptop cepat panas + Fan bising
        "kesimpulan": "K004",  # Sistem Pendingin Rusak
        "cf": 0.9
    },
    {
        "id": "R007",
        "nama": "Keyboard Malfunction",
        "kondisi": ["G007"],  # Keyboard tidak berfungsi
        "kesimpulan": "K005",  # Keyboard Rusak
        "cf": 0.85
    },
    {
        "id": "R008",
        "nama": "Touchpad Malfunction",
        "kondisi": ["G008"],  # Touchpad tidak berfungsi
        "kesimpulan": "K006",  # Touchpad Rusak
        "cf": 0.85
    },
    {
        "id": "R009",
        "nama": "Battery Charging Problem",
        "kondisi": ["G009"],  # Baterai tidak mengisi
        "kesimpulan": "K007",  # Baterai Rusak
        "cf": 0.7
    },
    {
        "id": "R010",
        "nama": "Battery Fast Drain dengan Charging Problem",
        "kondisi": ["G009", "G010"],  # Baterai tidak mengisi + cepat habis
        "kesimpulan": "K007",  # Baterai Rusak
        "cf": 0.95
    },
    {
        "id": "R011",
        "nama": "Battery Cable Problem",
        "kondisi": ["G009"],  # Baterai tidak mengisi
        "kesimpulan": "K008",  # Kabel Charger Rusak
        "cf": 0.6
    }
]
