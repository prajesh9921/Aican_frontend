import React from "react";
import styles from "./sideNavBtn.module.css";

export default function SideNavButton({
  title,
  currentPage,
  number,
  changePage,
}) {
  return (
    <>
      <button
        onClick={() => changePage()}
        className={
          currentPage === number ? styles.selectedBtnStyle : styles.btnStyle
        }
      >
        {title}
      </button>
    </>
  );
}
