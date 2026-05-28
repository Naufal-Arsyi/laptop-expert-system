export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');`;

export const s = {
  // Layout
  page: {fontFamily:"'DM Sans',system-ui,sans-serif",minHeight:600,background:"#F4F5F8"},
  center: {maxWidth:760,margin:"0 auto",padding:"0 16px"},
  // Brand
  logo: {display:"flex",alignItems:"center",gap:10},
  logoBox: {width:34,height:34,background:"#00a2ff",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"},
  brand: {fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,letterSpacing:"-0.5px",color:"#fff"},
  // Buttons
  btnPrimary: {background:"#00a2ff",color:"#fff",border:"none",padding:"13px 28px",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8},
  btnOutline: {background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.25)",padding:"13px 24px",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8},
  btnGhost: {background:"none",border:"1px solid #D1D5DB",padding:"9px 16px",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",color:"#374151",display:"flex",alignItems:"center",gap:6},
  btnGreen: {background:"#22C55E",color:"#fff",border:"none",padding:"11px",borderRadius:9,fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%"},
  btnWA: {background:"#25D366",color:"#fff",border:"none",padding:"9px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,textDecoration:"none"},
  // Cards
  card: {background:"#fff",borderRadius:14,border:"0.5px solid #E5E7EB",padding:"16px 20px"},
  // Nav
  topbar: {background:"#0C1528",padding:"14px 24px",display:"flex",alignItems:"center",gap:12},
  // Badge
  badge: (bg,color) => ({background:bg,color,fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:99,letterSpacing:"0.3px"}),
  // Input
  input: {padding:"10px 12px",borderRadius:8,border:"1.5px solid #D1D5DB",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box",fontFamily:"inherit"},
  // Misc
  sectionTitle: {fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#0C1528"},
  muted: {color:"#6B7280",fontSize:13},
};
