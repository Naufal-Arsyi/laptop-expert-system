# Flask API untuk Laptop Expert System

from flask import Flask, jsonify, request
from flask_cors import CORS
from app.engine.diagnosis_engine import DiagnosisEngine

app = Flask(__name__)
CORS(app)

# Instance dari diagnosis engine
diagnosis_engine = DiagnosisEngine()

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        "message": "Selamat datang di Laptop Expert System API",
        "version": "1.0.0"
    })

@app.route('/api/gejala', methods=['GET'])
def get_semua_gejala():
    """Dapatkan semua gejala yang tersedia"""
    try:
        gejala = DiagnosisEngine.get_all_gejala()
        return jsonify({
            "success": True,
            "data": gejala,
            "total": len(gejala)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/diagnose', methods=['POST'])
def diagnose():
    """
    Endpoint untuk melakukan diagnosa
    Request body: {"gejala": ["G001", "G005", "G006"]}
    """
    try:
        data = request.json
        gejala_ids = data.get('gejala', [])
        
        if not gejala_ids:
            return jsonify({
                "success": False,
                "error": "Minimal harus memilih 1 gejala"
            }), 400
        
        # Set gejala
        success, message = diagnosis_engine.set_gejala(gejala_ids)
        if not success:
            return jsonify({
                "success": False,
                "error": message
            }), 400
        
        # Jalankan diagnosa
        hasil = diagnosis_engine.diagnose()
        
        return jsonify({
            "success": True,
            "gejala_input": diagnosis_engine.get_gejala_deskripsi(),
            "hasil_diagnosa": diagnosis_engine.get_hasil_diagnosa(),
            "rekomendasi": diagnosis_engine.get_rekomendasi()
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/reset', methods=['POST'])
def reset():
    """Reset diagnosis engine"""
    try:
        diagnosis_engine.reset()
        return jsonify({
            "success": True,
            "message": "Engine berhasil di-reset"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "OK",
        "message": "API is running"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
