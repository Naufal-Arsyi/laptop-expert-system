import { useState, useMemo } from "react";
import { GEJALA, PENYAKIT, RULES, MOCK_CASES, CF_LEVELS, CF_LABELS } from "./data/index.js";
import { calcCF } from "./engine/calcCF.js";
import { FONTS, s } from "./styles/index.js";
import { Modal } from "./components/Modal.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { ArrowLeft, Search, Check, ChevronRight, Printer, MessageSquare, Laptop, LogOut, AlertCircle, CheckCircle, Send, Star, Wrench, Activity, Clock, RotateCcw } from "lucide-react";

export default function App() {
  const [page, setPage] = useState("landing");
  const [selected, setSelected] = useState({});
  const [customer, setCustomer] = useState({name:"",phone:""});
  const [results, setResults] = useState([]);
  const [cases, setCases] = useState(MOCK_CASES);
  const [activeCase, setActiveCase] = useState(null);
  const [showTechLogin, setShowTechLogin] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);
  const [techCreds, setTechCreds] = useState({user:"",pass:""});
  const [loginErr, setLoginErr] = useState("");
  const [search, setSearch] = useState("");
  const [waSent, setWaSent] = useState(false);
  const [waProgress, setWaProgress] = useState("");

  const filtered = useMemo(() =>
    GEJALA.filter(g => g.nama.toLowerCase().includes(search.toLowerCase())), [search]);

  const toggle = id => setSelected(p => {
    if (id in p) { const n={...p}; delete n[id]; return n; }
    return {...p, [id]: 0.6};
  });

  const setConf = (id, v) => setSelected(p => ({...p, [id]: v}));

  const handleAnalyze = async () => {
    const result = calcCF(selected);
    setResults(result);

    try {
      await fetch(
        "http://localhost:5678/webhook-test/Laptop-diagnose",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer,
            selected,
            results: result,
            created_at: new Date(),
          }),
        }
      );
      console.log("Data berhasil dikirim ke n8n");
    } catch (err) {
      console.error("Gagal kirim:", err);
    }

    setPage("results");
  };

  const acceptCase = (id, status) => {
    setCases(p => p.map(c => c.id === id ? {...c, status} : c));
    setActiveCase(p => p?.id === id ? {...p, status} : p);
  };

  const waText = useMemo(() => {
    if (!results[0]) return "";
    const syms = Object.keys(selected).map(id => GEJALA.find(g => g.id === id)?.nama).filter(Boolean).join(", ");
    return encodeURIComponent(
      `Halo ${customer.name||"Pelanggan"}, berikut hasil diagnosa laptop Anda:\n\n📋 Gejala: ${syms}\n\n🔍 Diagnosa Utama: ${results[0].nama}\n📊 Tingkat Kepastian: ${(results[0].cf*100).toFixed(1)}%\n💰 Estimasi Biaya: ${results[0].biaya}\n\nUntuk konfirmasi & perbaikan, kunjungi toko kami. Terima kasih! — LapDoc`
    );
  }, [results, selected, customer]);

  const qontakMsg = activeCase
    ? (activeCase.status === "in_progress"
        ? `Halo ${activeCase.customer}, laptop Anda sedang dalam proses perbaikan kami. Estimasi selesai: ${activeCase.deadline}. Kami akan memberikan update selanjutnya. Terima kasih! — LapDoc`
        : `Halo ${activeCase.customer}, perbaikan laptop Anda telah selesai. Silakan datang ke toko kami untuk pengambilan. Terima kasih telah mempercayai LapDoc!`)
    : "";

  const sendQontak = () => {
    setWaProgress("Menghubungi Qontak API...");
    setTimeout(() => setWaProgress("Mengirim pesan..."), 900);
    setTimeout(() => { setWaProgress(""); setWaSent(true); }, 1800);
  };

  // ── LANDING ──
  if (page === "landing") return (
    <LandingPage 
      onNavigate={setPage}
      showTechLogin={showTechLogin}
      onShowTechLogin={setShowTechLogin}
      loginErr={loginErr}
      onSetLoginErr={setLoginErr}
      techCreds={techCreds}
      onSetTechCreds={setTechCreds}
    />
  );

  // ── SYMPTOMS ──
  if (page === "symptoms") {
    const selCount = Object.keys(selected).length;
    return (
      <div style={s.page}>
        <style>{FONTS}</style>
        <div style={{...s.topbar}}>
          <button onClick={() => setPage("landing")} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:"#94A3B8"}}><ArrowLeft size={20}/></button>
          <div style={s.logo}>
            <div style={s.logoBox}><Wrench size={15} color="#fff"/></div>
            <span style={{...s.brand,fontSize:16}}>LapDoc</span>
          </div>
          <div style={{marginLeft:"auto",...s.muted,color:"#94A3B8",fontSize:13}}>
            <span style={{color:"#E8510A",fontWeight:700}}>{selCount}</span> dipilih
          </div>
        </div>

        <div style={{...s.center, padding:"20px 16px 16px"}}>
          <div style={{...s.card, marginBottom:16}}>
            <div style={{fontWeight:600, fontSize:14, color:"#374151", marginBottom:12}}>Data Pelanggan</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              <input placeholder="Nama Lengkap" value={customer.name} onChange={e=>setCustomer(p=>({...p,name:e.target.value}))} style={s.input}/>
              <input placeholder="No. HP (WhatsApp)" value={customer.phone} onChange={e=>setCustomer(p=>({...p,phone:e.target.value}))} style={s.input}/>
            </div>
          </div>

          <div style={{position:"relative", marginBottom:14}}>
            <Search size={15} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
            <input placeholder="Cari gejala..." value={search} onChange={e=>setSearch(e.target.value)} style={{...s.input, paddingLeft:36}}/>
          </div>

          <p style={{...s.muted, marginBottom:14}}>Pilih semua gejala yang dialami, lalu tentukan tingkat keyakinan Anda.</p>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(210px, 1fr))", gap:8, marginBottom:20}}>
            {filtered.map(({id, nama, Icon}) => {
              const isSel = id in selected;
              const conf = selected[id];
              return (
                <div key={id} onClick={() => toggle(id)} style={{
                  background: isSel ? "#FFF5F0" : "#fff",
                  border: `1.5px solid ${isSel ? "#E8510A" : "#E5E7EB"}`,
                  borderRadius: 10, padding: "11px 13px", cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s"
                }}>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom: isSel ? 9 : 0}}>
                    <div style={{
                      width:20, height:20, borderRadius:5, border:`2px solid ${isSel ? "#E8510A" : "#D1D5DB"}`,
                      background: isSel ? "#E8510A" : "transparent",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
                    }}>
                      {isSel && <Check size={11} color="#fff" strokeWidth={3}/>}
                    </div>
                    <div style={{display:"flex", alignItems:"center", gap:5, flex:1, minWidth:0}}>
                      <Icon size={13} color={isSel ? "#E8510A" : "#9CA3AF"} style={{flexShrink:0}}/>
                      <span style={{fontSize:13, fontWeight: isSel ? 600 : 400, color: isSel ? "#9A3412" : "#374151", lineHeight:1.3}}>{nama}</span>
                    </div>
                  </div>
                  {isSel && (
                    <div style={{display:"flex", gap:4}} onClick={e => e.stopPropagation()}>
                      {CF_LEVELS.map(lv => (
                        <button key={lv} title={CF_LABELS[lv]} onClick={() => setConf(id, lv)} style={{
                          flex:1, padding:"3px 0", borderRadius:5, fontSize:11.5, fontWeight:600, cursor:"pointer",
                          border: conf === lv ? "none" : "1px solid #E5E7EB",
                          background: conf === lv ? "#E8510A" : "#F9FAFB",
                          color: conf === lv ? "#fff" : "#9CA3AF"
                        }}>{lv.toFixed(1)}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{...s.card, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
            <div style={s.muted}>
              {selCount === 0
                ? "Belum ada gejala yang dipilih"
                : <><span style={{fontWeight:700, color:"#E8510A"}}>{selCount} gejala</span> siap dianalisis</>}
            </div>
            <button onClick={handleAnalyze} disabled={selCount===0} style={{
              ...s.btnPrimary,
              background: selCount > 0 ? "#E8510A" : "#D1D5DB",
              cursor: selCount > 0 ? "pointer" : "not-allowed",
              whiteSpace:"nowrap"
            }}>
              Analisis <ChevronRight size={17}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (page === "results") {
    const top = results[0];
    const waPhone = customer.phone.replace(/\D/g,"");
    return (
      <div style={s.page}>
        <style>{FONTS}</style>

        <div className="print-show" style={{padding:40,maxWidth:480,margin:"0 auto",fontFamily:"monospace",fontSize:13}}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:"bold"}}>LapDoc — Struk Diagnosa Laptop</div>
            <div>Tanggal: {new Date().toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})}</div>
          </div>
          <div style={{borderTop:"1px dashed #000",borderBottom:"1px dashed #000",padding:"8px 0",margin:"10px 0"}}>
            <div><b>Pelanggan:</b> {customer.name||"-"}</div>
            <div><b>No. HP:</b> {customer.phone||"-"}</div>
          </div>
          <div><b>Gejala:</b></div>
          {Object.keys(selected).map(id => <div key={id}>• {GEJALA.find(g=>g.id===id)?.nama} (CF user: {selected[id]})</div>)}
          <br/>
          <div><b>Hasil Diagnosa (Top 3):</b></div>
          {results.map((r,i) => <div key={r.id} style={{marginTop:6}}>#{i+1} {r.nama} — CF: {(r.cf*100).toFixed(1)}% — {r.biaya}</div>)}
          {top && <div style={{marginTop:12,borderTop:"1px dashed #000",paddingTop:8}}><b>Kesimpulan:</b> {top.nama} ({(top.cf*100).toFixed(1)}%). Estimasi biaya: {top.biaya}</div>}
        </div>

        <div className="no-print">
          <div style={s.topbar}>
            <button onClick={() => setPage("symptoms")} style={{background:"none",border:"none",cursor:"pointer",color:"#94A3B8"}}><ArrowLeft size={20}/></button>
            <div style={s.logo}>
              <div style={s.logoBox}><Wrench size={15} color="#fff"/></div>
              <span style={{...s.brand,fontSize:16}}>Hasil Diagnosa</span>
            </div>
            <div style={{marginLeft:"auto", display:"flex", gap:8}}>
              <button onClick={() => window.print()} style={s.btnGhost}><Printer size={14}/> Cetak</button>
              {waPhone && (
                <a href={`https://wa.me/${waPhone}?text=${waText}`} target="_blank" rel="noopener noreferrer" style={s.btnWA}>
                  <MessageSquare size={14}/> Kirim WA
                </a>
              )}
            </div>
          </div>

          <div style={{...s.center, padding:"20px 16px"}}>
            {results.length === 0 ? (
              <div style={{...s.card, textAlign:"center", padding:40}}>
                <AlertCircle size={36} color="#9CA3AF" style={{marginBottom:12}}/>
                <p style={{color:"#6B7280"}}>Tidak ada diagnosa yang cocok. Coba pilih lebih banyak gejala.</p>
                <button onClick={() => setPage("symptoms")} style={{...s.btnPrimary,margin:"16px auto 0"}}>Kembali</button>
              </div>
            ) : (
              <>
                <div style={{background:"#0C1528",borderRadius:14,padding:"20px 22px",marginBottom:18,display:"flex",alignItems:"center",gap:16}}>
                  <div style={{...s.logoBox,width:46,height:46,borderRadius:12,flexShrink:0}}><Star size={22} color="#fff"/></div>
                  <div>
                    <div style={{fontSize:11,color:"#94A3B8",letterSpacing:"0.5px",fontWeight:600,marginBottom:4}}>KEMUNGKINAN TERTINGGI</div>
                    <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{top.nama}</div>
                    <div style={{fontSize:13,color:"#94A3B8",marginTop:3}}>Certainty Factor: {(top.cf*100).toFixed(1)}% · Estimasi: {top.biaya}</div>
                  </div>
                </div>

                {(customer.name||customer.phone) && (
                  <div style={{...s.card,marginBottom:14,display:"flex",gap:16,fontSize:13}}>
                    <div><span style={{color:"#9CA3AF"}}>Pelanggan: </span><b>{customer.name||"-"}</b></div>
                    <div><span style={{color:"#9CA3AF"}}>HP: </span><b>{customer.phone||"-"}</b></div>
                  </div>
                )}

                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
                  {results.map((r, i) => {
                    const matched = RULES
                      .filter(rule => rule.penyakit === r.id && selected[rule.gejala])
                      .map(rule => GEJALA.find(g => g.id === rule.gejala)?.nama)
                      .filter(Boolean);
                    const accent = i === 0 ? "#E8510A" : i === 1 ? "#6366F1" : "#6B7280";
                    return (
                      <div key={r.id} style={{
                        ...s.card,
                        border: `1.5px solid ${i === 0 ? "#E8510A" : "#E5E7EB"}`,
                        background: i === 0 ? "#FFF5F0" : "#fff"
                      }}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{
                              background: i===0 ? "#E8510A" : "#F3F4F6",
                              color: i===0 ? "#fff" : "#6B7280",
                              width:28, height:28, borderRadius:8,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:12, fontWeight:800, flexShrink:0
                            }}>#{i+1}</div>
                            <div>
                              <div style={{fontWeight:700,fontSize:15,color:"#0C1528"}}>{r.nama}</div>
                              <div style={{fontSize:12,color:"#6B7280",marginTop:1}}>{r.biaya}</div>
                            </div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0}}>
                            <div style={{fontSize:24,fontWeight:800,color:accent,lineHeight:1}}>{(r.cf*100).toFixed(1)}%</div>
                            <div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>Certainty Factor</div>
                          </div>
                        </div>
                        <div style={{background:"#E5E7EB",borderRadius:99,height:5,overflow:"hidden",marginBottom:10}}>
                          <div style={{height:"100%",borderRadius:99,background:accent,width:`${(r.cf*100).toFixed(1)}%`}}/>
                        </div>
                        {matched.length > 0 && (
                          <div>
                            <div style={{fontSize:10,color:"#9CA3AF",fontWeight:700,letterSpacing:"0.5px",marginBottom:5}}>GEJALA COCOK</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                              {matched.map(sym => (
                                <span key={sym} style={{background:"#F3F4F6",borderRadius:5,padding:"2px 8px",fontSize:12,color:"#374151"}}>{sym}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{textAlign:"center"}}>
                  <button onClick={() => {setSelected({});setResults([]);setCustomer({name:"",phone:""});setPage("symptoms");}}
                    style={s.btnGhost}>
                    <RotateCcw size={14}/> Diagnosa Ulang
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── TECHNICIAN DASHBOARD ──
  if (page === "tech") {
    const stats = {
      pending: cases.filter(c=>c.status==="pending").length,
      in_progress: cases.filter(c=>c.status==="in_progress").length,
      done: cases.filter(c=>c.status==="done").length,
    };
    const statusStyle = {
      pending: {bg:"#FEF2F2", text:"#DC2626", label:"Antrian"},
      in_progress: {bg:"#FFF7ED", text:"#D97706", label:"Dalam Proses"},
      done: {bg:"#F0FDF4", text:"#16A34A", label:"Selesai"},
    };

    return (
      <div style={s.page}>
        <style>{FONTS}</style>
        <div style={{...s.topbar, justifyContent:"space-between"}}>
          <div style={s.logo}>
            <div style={s.logoBox}><Wrench size={15} color="#fff"/></div>
            <span style={{...s.brand,fontSize:16}}>Dashboard Teknisi</span>
          </div>
          <button onClick={() => {setPage("landing");setActiveCase(null);}} style={{...s.btnOutline,padding:"7px 14px",fontSize:13}}>
            <LogOut size={14}/> Keluar
          </button>
        </div>

        <div style={{...s.center, padding:"20px 16px"}}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:20}}>
            {[
              {label:"Antrian Masuk",val:stats.pending,color:"#DC2626"},
              {label:"Dalam Proses",val:stats.in_progress,color:"#D97706"},
              {label:"Selesai",val:stats.done,color:"#16A34A"},
            ].map(({label,val,color}) => (
              <div key={label} style={{...s.card, padding:"14px 18px"}}>
                <div style={{...s.muted, marginBottom:4}}>{label}</div>
                <div style={{fontSize:30,fontWeight:800,color}}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{display:"grid", gridTemplateColumns: activeCase ? "1fr 1.1fr" : "1fr", gap:14, alignItems:"start"}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#374151",marginBottom:10}}>Daftar Order Perbaikan</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {cases.map(c => {
                  const ss = statusStyle[c.status];
                  return (
                    <div key={c.id} onClick={() => setActiveCase(c)} style={{
                      ...s.card, cursor:"pointer",
                      border: `1.5px solid ${activeCase?.id===c.id ? "#E8510A" : "#E5E7EB"}`,
                      background: activeCase?.id===c.id ? "#FFF5F0" : "#fff"
                    }}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <div>
                          <div style={{fontWeight:600,fontSize:14,color:"#0C1528"}}>{c.customer}</div>
                          <div style={{...s.muted}}>{c.id} · {c.date}</div>
                        </div>
                        <span style={s.badge(ss.bg, ss.text)}>{ss.label}</span>
                      </div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {c.symptoms.slice(0,3).map(sid => (
                          <span key={sid} style={{background:"#F3F4F6",fontSize:11,padding:"2px 7px",borderRadius:5,color:"#4B5563"}}>
                            {GEJALA.find(g=>g.id===sid)?.nama}
                          </span>
                        ))}
                        {c.symptoms.length > 3 && <span style={{...s.muted,alignSelf:"center"}}>+{c.symptoms.length-3} lainnya</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {activeCase && (
              <div style={{...s.card, padding:22}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:16,color:"#0C1528"}}>{activeCase.customer}</div>
                    <div style={{...s.muted}}>{activeCase.phone} · {activeCase.date}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={s.badge(statusStyle[activeCase.status].bg, statusStyle[activeCase.status].text)}>
                      {statusStyle[activeCase.status].label}
                    </span>
                    <button onClick={() => setActiveCase(null)} style={{background:"none",border:"none",cursor:"pointer"}}><span style={{fontSize:16}}>✕</span></button>
                  </div>
                </div>

                <div style={{background:"#FFF5F0",borderRadius:10,padding:"12px 14px",marginBottom:14,border:"1px solid #FED7B0"}}>
                  <div style={{fontSize:10,color:"#C2410C",fontWeight:700,letterSpacing:"0.5px",marginBottom:4}}>DIAGNOSA</div>
                  <div style={{fontWeight:700,color:"#0C1528",fontSize:14}}>{activeCase.diagnosis}</div>
                  <div style={{...s.muted,marginTop:2}}>{activeCase.biaya}</div>
                </div>

                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:"#9CA3AF",fontWeight:700,letterSpacing:"0.5px",marginBottom:8}}>GEJALA YANG DILAPORKAN</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {activeCase.symptoms.map(sid => (
                      <span key={sid} style={{background:"#F3F4F6",fontSize:12,padding:"3px 10px",borderRadius:6,color:"#374151"}}>
                        {GEJALA.find(g=>g.id===sid)?.nama}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
                  <Clock size={16} color="#3B82F6" style={{flexShrink:0}}/>
                  <div>
                    <div style={{fontSize:10,color:"#1D4ED8",fontWeight:700,letterSpacing:"0.5px"}}>ESTIMASI PENYELESAIAN</div>
                    <div style={{fontWeight:600,color:"#1E3A5F",fontSize:13}}>{activeCase.deadline}</div>
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {activeCase.status === "pending" && (
                    <button onClick={() => acceptCase(activeCase.id,"in_progress")} style={{...s.btnPrimary,justifyContent:"center",padding:"11px"}}>
                      <CheckCircle size={16}/> Terima Perbaikan
                    </button>
                  )}
                  {activeCase.status === "in_progress" && (
                    <button onClick={() => acceptCase(activeCase.id,"done")} style={{...s.btnGreen}}>
                      <CheckCircle size={16}/> Tandai Selesai
                    </button>
                  )}
                  {activeCase.status !== "done" && (
                    <button onClick={() => {setShowWaModal(true);setWaSent(false);setWaProgress("");}} style={{
                      background:"#25D366",color:"#fff",border:"none",padding:"11px",borderRadius:9,
                      fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8
                    }}>
                      <MessageSquare size={16}/> Kirim Update WhatsApp
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {showWaModal && activeCase && (
          <Modal onClose={() => setShowWaModal(false)}>
            <div style={{marginBottom:16}}>
              <div style={{fontWeight:800,fontSize:15,color:"#0C1528",marginBottom:2}}>Kirim Update via Qontak</div>
              <div style={{...s.muted}}>WhatsApp Business API · {activeCase.phone}</div>
            </div>

            <div style={{background:"#F0FDF4",borderRadius:10,padding:"12px 14px",marginBottom:14,border:"1px solid #BBF7D0"}}>
              <div style={{fontSize:10,color:"#166534",fontWeight:700,letterSpacing:"0.5px",marginBottom:6}}>PRATINJAU PESAN</div>
              <div style={{fontSize:13,color:"#14532D",lineHeight:1.65}}>{qontakMsg}</div>
            </div>

            <div style={{background:"#F8F9FC",borderRadius:10,padding:"10px 12px",marginBottom:16,border:"0.5px solid #E5E7EB"}}>
              <div style={{fontWeight:600,fontSize:12,color:"#374151",marginBottom:6}}>Qontak API — POST /v1/broadcasts/whatsapp/direct</div>
              <pre style={{fontSize:11,color:"#6B7280",margin:0,fontFamily:"'DM Mono',monospace,monospace",lineHeight:1.6,overflowX:"auto"}}>{`{
  "channel_integration_id": "wa_channel_id",
  "to": "${activeCase.phone}",
  "type": "template",
  "message_template_id": "update_perbaikan",
  "body": { "params": ["${activeCase.customer}", "${activeCase.deadline}"] }
}`}</pre>
            </div>

            {waSent ? (
              <div style={{background:"#F0FDF4",borderRadius:9,padding:"14px",textAlign:"center",border:"1px solid #86EFAC"}}>
                <CheckCircle size={22} color="#16A34A" style={{margin:"0 auto 6px"}}/>
                <div style={{fontWeight:600,color:"#15803D",fontSize:14}}>Pesan berhasil dikirim!</div>
              </div>
            ) : (
              <button onClick={sendQontak} disabled={!!waProgress} style={{
                background: waProgress ? "#D1FAE5" : "#25D366", color:"#fff", border:"none",
                padding:"12px", borderRadius:9, fontSize:14, fontWeight:600, cursor: waProgress ? "default" : "pointer",
                width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8
              }}>
                <Send size={15}/> {waProgress || "Kirim via Qontak"}
              </button>
            )}
          </Modal>
        )}
      </div>
    );
  }

  return null;
}
