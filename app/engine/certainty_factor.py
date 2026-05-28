# Certainty Factor (CF) Calculation Engine
# Modul untuk menghitung dan mengombinasi certainty factor

class CertaintyFactorEngine:
    """
    Engine untuk menghitung Certainty Factor pada Expert System
    
    CF Formula:
    - CF(H,E) = CF(E) * CF(H|E)
    
    Kombinasi CF:
    - CF combine = CF1 + CF2 - (CF1 * CF2)
    """
    
    @staticmethod
    def cf_combine(cf1, cf2):
        """
        Kombinasi dua Certainty Factor
        CF combine = CF1 + CF2 - (CF1 * CF2)
        """
        if cf1 < 0 or cf2 < 0:
            return cf1 + cf2 + (cf1 * cf2)
        return cf1 + cf2 - (cf1 * cf2)
    
    @staticmethod
    def cf_multiply(cf_evidence, cf_rule):
        """
        Perkalian CF Evidence dengan CF Rule
        CF(H,E) = CF(E) * CF(H|E)
        """
        return cf_evidence * cf_rule
    
    @staticmethod
    def normalize_cf(cf_value):
        """
        Normalisasi nilai CF agar berada di range [-1, 1]
        """
        if cf_value > 1:
            return 1.0
        elif cf_value < -1:
            return -1.0
        return cf_value
    
    @staticmethod
    def interpret_cf(cf_value):
        """
        Interpretasi nilai Certainty Factor
        """
        cf_value = abs(cf_value)
        
        if cf_value == 0:
            return "Tidak ada keyakinan"
        elif 0 < cf_value <= 0.2:
            return "Hampir tidak mungkin"
        elif 0.2 < cf_value <= 0.4:
            return "Mungkin tidak"
        elif 0.4 < cf_value <= 0.6:
            return "Tidak pasti"
        elif 0.6 < cf_value <= 0.8:
            return "Mungkin"
        elif 0.8 < cf_value < 1:
            return "Sangat mungkin"
        elif cf_value == 1:
            return "Pasti"
        else:
            return "Unknown"
    
    @staticmethod
    def combine_multiple_cf(cf_list):
        """
        Kombinasi multiple Certainty Factor
        """
        if not cf_list:
            return 0.0
        
        result = cf_list[0]
        for cf in cf_list[1:]:
            result = CertaintyFactorEngine.cf_combine(result, cf)
            result = CertaintyFactorEngine.normalize_cf(result)
        
        return result
