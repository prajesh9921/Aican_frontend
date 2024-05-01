import React from "react";
import Button from "@mui/material/Button";

export default function CButton({ title, onClick, color="#73ABFF", style, icon}) {
  const btnStyle = {
    backgroundColor: color,
    borderRadius: '20px',
    color: '#000',
    fontWeight: 'bold',
  };

  const finalStyle = {...btnStyle, ...style};

  return (
    <Button 
        style={finalStyle} 
        variant="contained" 
        disableElevation
        onClick={onClick}
        startIcon={icon ? icon : null}
    >
      {title}
    </Button>
  );
}
