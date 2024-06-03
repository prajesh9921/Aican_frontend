import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function CButton({padding="0.5rem 1rem", title, onClick, style, selected=false, width=100, loading=false }) {
  const btnStyle = {
    backgroundColor: selected ? "#60B84B" : '#fff',
    borderRadius: '10px',
    border: 'none',
    color: selected ? '#fff' : '#9F9F9F',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
    padding: padding,
    width: width,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: "1rem"
  };

  const finalStyle = {...btnStyle, ...style};

  return (
    <button 
        style={finalStyle} 
        onClick={onClick}
    >
      {title}
      {loading ? <CircularProgress color="inherit" size={20}/> : null }
    </button>
  );
}
