import { X } from "lucide-react";

export function Modal({onClose, children}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}>
      <div style={{background:"#fff",borderRadius:16,padding:28,width:"100%",maxWidth:380,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"none",border:"none",cursor:"pointer",lineHeight:1}}><X size={18} color="#9CA3AF"/></button>
        {children}
      </div>
    </div>
  );
}