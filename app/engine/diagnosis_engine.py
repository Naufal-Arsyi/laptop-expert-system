# Main Diagnosis Engine untuk sistem expert laptop
# Mengintegrasikan forward chaining dan certainty factor

from app.engine.forward_chaining import ForwardChainingEngine
from app.engine.certainty_factor import CertaintyFactorEngine
from app.data.gejala import gejala_list
from app.data.kerusakan import kerusakan_list

class DiagnosisEngine:
    """
    Engine utama untuk diagnosa kerusakan laptop
    Menggabungkan forward chaining dengan certainty factor
    """
    
    def __init__(self):
        self.fc_engine = ForwardChainingEngine()
        self.cf_engine = CertaintyFactorEngine()
        self.gejala_input = []
        self.hasil_diagnosa = []
    
    def set_gejala(self, gejala_ids):
        """
        Set gejala yang dialami user
        gejala_ids: list dari gejala ID (contoh: ["G001", "G005", "G006"])
        """
        self.fc_engine.reset()
        self.gejala_input = []
        
        for gejala_id in gejala_ids:
            if self.fc_engine.add_fact(gejala_id):
                self.gejala_input.append(gejala_id)
            else:
                return False, f"Gejala {gejala_id} tidak ditemukan"
        
        return True, "Gejala berhasil diinput"
    
    def diagnose(self):
        """
        Jalankan diagnosa
        """
        # Jalankan forward chaining
        self.fc_engine.infer()
        
        # Dapatkan hasil diagnosa
        self.hasil_diagnosa = self.fc_engine.get_diagnosis()
        
        return self.hasil_diagnosa
    
    def get_gejala_deskripsi(self):
        """
        Dapatkan deskripsi gejala yang telah diinput
        """
        return [{
            "id": gejala_id,
            "nama": self.fc_engine.gejala[gejala_id]["nama"],
            "deskripsi": self.fc_engine.gejala[gejala_id]["deskripsi"]
        } for gejala_id in self.gejala_input]
    
    def get_hasil_diagnosa(self):
        """
        Dapatkan hasil diagnosa dengan interpretasi CF
        """
        hasil = []
        for item in self.hasil_diagnosa:
            hasil.append({
                **item,
                "confidence_label": self.cf_engine.interpret_cf(item["confidence"]),
                "confidence_persen": round(item["confidence"] * 100, 2)
            })
        return hasil
    
    def get_rekomendasi(self):
        """
        Dapatkan rekomendasi berdasarkan hasil diagnosa
        """
        if not self.hasil_diagnosa:
            return "Tidak ada diagnosa yang dapat ditentukan dari gejala yang diberikan"
        
        diagnosa_terbaik = self.hasil_diagnosa[0]
        
        rekomendasi = f"""
        DIAGNOSA: {diagnosa_terbaik['nama']}
        
        DESKRIPSI:
        {diagnosa_terbaik['deskripsi']}
        
        SOLUSI YANG DIREKOMENDASIKAN:
        {diagnosa_terbaik['solusi']}
        
        TINGKAT KERUSAKAN: {diagnosa_terbaik['tingkat_kerusakan']}
        TINGKAT KEYAKINAN: {round(diagnosa_terbaik['confidence'] * 100, 2)}%
        """
        
        return rekomendasi.strip()
    
    def reset(self):
        """
        Reset engine
        """
        self.fc_engine.reset()
        self.gejala_input = []
        self.hasil_diagnosa = []
    
    @staticmethod
    def get_all_gejala():
        """
        Dapatkan semua gejala yang tersedia
        """
        return [{
            "id": gejala_id,
            "nama": gejala["nama"],
            "deskripsi": gejala["deskripsi"]
        } for gejala_id, gejala in gejala_list.items()]
