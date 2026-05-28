# Forward Chaining Engine untuk Expert System
# Algoritma untuk melakukan inferensi dari gejala ke kesimpulan

from app.data.rules import rules
from app.data.gejala import gejala_list
from app.data.kerusakan import kerusakan_list

class ForwardChainingEngine:
    def __init__(self):
        self.rules = rules
        self.gejala = gejala_list
        self.kerusakan = kerusakan_list
        self.facts = set()  # Fakta yang sudah diketahui
        self.derived_facts = {}  # Kesimpulan yang diturunkan dengan CF
        
    def add_fact(self, gejala_id):
        """Tambahkan fakta (gejala) ke dalam sistem"""
        if gejala_id in self.gejala:
            self.facts.add(gejala_id)
            return True
        return False
    
    def check_rule_condition(self, rule):
        """Cek apakah kondisi rule terpenuhi"""
        kondisi = rule.get("kondisi", [])
        return all(gejala in self.facts for gejala in kondisi)
    
    def infer(self):
        """Jalankan forward chaining inference"""
        changed = True
        while changed:
            changed = False
            for rule in self.rules:
                if self.check_rule_condition(rule):
                    kesimpulan = rule.get("kesimpulan")
                    cf = rule.get("cf", 0.5)
                    
                    if kesimpulan not in self.derived_facts:
                        self.derived_facts[kesimpulan] = cf
                        changed = True
                    else:
                        # Gabungkan CF jika sudah ada
                        old_cf = self.derived_facts[kesimpulan]
                        new_cf = old_cf + cf * (1 - old_cf)  # Formula kombinasi CF
                        self.derived_facts[kesimpulan] = new_cf
        
        return self.derived_facts
    
    def get_diagnosis(self):
        """Dapatkan hasil diagnosa"""
        hasil = []
        for kerusakan_id, cf in sorted(self.derived_facts.items(), 
                                       key=lambda x: x[1], reverse=True):
            if kerusakan_id in self.kerusakan:
                hasil.append({
                    "id": kerusakan_id,
                    "nama": self.kerusakan[kerusakan_id]["nama"],
                    "deskripsi": self.kerusakan[kerusakan_id]["deskripsi"],
                    "solusi": self.kerusakan[kerusakan_id]["solusi"],
                    "tingkat_kerusakan": self.kerusakan[kerusakan_id]["tingkat_kerusakan"],
                    "confidence": cf
                })
        return hasil
    
    def reset(self):
        """Reset sistem"""
        self.facts = set()
        self.derived_facts = {}
