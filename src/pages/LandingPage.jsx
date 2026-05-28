import { useState } from "react";
import { Activity, Laptop, Wrench, Shield, Clock, Printer, MessageSquare } from "lucide-react";
import { Modal } from "../components/Modal";
import { s, FONTS } from "../styles/index.js";

export function LandingPage({ onNavigate, showTechLogin, onShowTechLogin, loginErr, onSetLoginErr, techCreds, onSetTechCreds }) {
  const handleTechLogin = () => {
    if (techCreds.user.toLowerCase() === "teknisi" && techCreds.pass.length > 0) {
      onShowTechLogin(false);
      onSetLoginErr("");
      onNavigate("tech");
    } else onSetLoginErr("Username atau password salah.");
  };

  return (
    <div style={{...s.page, background:"#0C1528"}}>
      <style>{FONTS}</style>
      <style>{`@media print{.no-print{display:none!important}.print-show{display:block!important}} .print-show{display:none}`}</style>

      {/* Topbar */}
      <div style={{...s.topbar, justifyContent:"space-between"}}>
        <div style={s.logo}>
          <div style={s.logoBox}><Wrench size={18} color="#fff"/></div>
          <span style={s.brand}>LapDoc</span>
        </div>
        <button onClick={() => onShowTechLogin(true)} style={{...s.btnOutline, padding:"8px 16px", fontSize:13}}>
          <Wrench size={15}/> Login Teknisi
        </button>
      </div>

      {/* Hero */}
      <div style={{padding:"72px 24px 60px", textAlign:"center"}}>
        <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"rgba(232,81,10,0.15)", border:"1px solid rgba(232,81,10,0.3)", padding:"5px 14px", borderRadius:99, fontSize:12, fontWeight:600, color:"#F97316", marginBottom:24, letterSpacing:"0.5px"}}>
          <Activity size={13}/> SISTEM PAKAR CERTAINTY FACTOR
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:44,fontWeight:800,lineHeight:1.15,color:"#fff",marginBottom:16,letterSpacing:"-1px"}}>
          Diagnosa Kerusakan<br/><span style={{color:"#00a2ff"}}>Laptop Anda</span><br/>Secara Cerdas
        </h1>
        
        <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
          <button onClick={() => onNavigate("symptoms")} style={s.btnPrimary}>
            <Laptop size={18}/> Mulai Diagnosa Gratis
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{background:"#F4F5F8", borderRadius:"28px 28px 0 0", padding:"52px 24px 60px"}}>
        <div style={{...s.center, maxWidth:720}}>
          <h2 style={{...s.sectionTitle, fontSize:26, textAlign:"center", marginBottom:36}}>Fitur Unggulan</h2>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:14}}>
            {[
              {Icon:Shield, title:"30 Gejala", desc:"Dataset lengkap berbasis pakar teknisi"},
              {Icon:Activity, title:"CF Engine", desc:"Algoritma Certainty Factor yang akurat"},
              {Icon:Clock, title:"Instan", desc:"Hasil diagnosa dalam hitungan detik"},
              {Icon:Printer, title:"Cetak Struk", desc:"Ekspor hasil sebagai struk PDF"},
              {Icon:MessageSquare, title:"WhatsApp", desc:"Kirim hasil ke pelanggan via WA"},
              {Icon:Wrench, title:"Dashboard Teknisi", desc:"Manajemen order dengan update Qontak"},
            ].map(({Icon, title, desc}) => (
              <div key={title} style={{...s.card, textAlign:"center", padding:"20px 14px"}}>
                <div style={{width:42,height:42,background:"#FFF0E8",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                  <Icon size={20} color="#E8510A"/>
                </div>
                <div style={{fontWeight:700, fontSize:14, marginBottom:4, color:"#0C1528"}}>{title}</div>
                <div style={{...s.muted, lineHeight:1.5}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTechLogin && (
        <Modal onClose={() => {onShowTechLogin(false);onSetLoginErr("");}}>
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{...s.logoBox,width:28,height:28}}><Wrench size={14} color="#fff"/></div>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15}}>Login Teknisi</span>
            </div>
            <p style={{...s.muted,margin:0}}>Gunakan kredensial teknisi Anda</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input placeholder="Username" value={techCreds.user} onChange={e=>onSetTechCreds(p=>({...p,user:e.target.value}))} style={s.input}/>
            <input type="password" placeholder="Password" value={techCreds.pass} onChange={e=>onSetTechCreds(p=>({...p,pass:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleTechLogin()} style={s.input}/>
            {loginErr && <div style={{color:"#EF4444",fontSize:13}}>{loginErr}</div>}
            <button onClick={handleTechLogin} style={{...s.btnPrimary,justifyContent:"center",marginTop:4}}>
              Masuk Dashboard
            </button>
            <p style={{...s.muted,textAlign:"center",margin:0,fontSize:12}}>Demo: username "teknisi", password bebas</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
