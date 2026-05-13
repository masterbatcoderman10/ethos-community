import React from "react";

export default function Photo({ caption = "", overlay = "", pill = "", img = "", style = {}, className = "", dark = false }) {
  const bgStyle = img ? { background: `url(${img}) center/cover` } : {};
  return (
    <div className={`photo ${dark ? "dark" : ""} ${className}`} style={{ ...bgStyle, ...style }}>
      {pill && <div className="photo-pill">{pill}</div>}
      {overlay && <div className="photo-overlay" style={dark ? {color:"#f7f4ee"}:{}}>{overlay}</div>}
      <div className="photo-meta" style={dark?{color:"rgba(247,244,238,.6)"}:{}}><span>{caption}</span><span>4 : 5</span></div>
    </div>
  );
}
