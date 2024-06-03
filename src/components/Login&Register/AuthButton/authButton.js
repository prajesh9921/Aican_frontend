import React from "react";
import styles from "./authButton.module.css";

export default function AuthButton({ title, type, selected, setSelected }) {
  const handleSelect = (e) => {
    setSelected(type);
  };

  return (
    <button
      onClick={handleSelect}
      className={selected === type ? styles.activeContainer : styles.container}
    >
      {title}
    </button>
  );
}
