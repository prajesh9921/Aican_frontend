import React from "react";
import styles from "./sidenav.module.css";
import SideNavButton from "../SideNavBtn/sideNavBtn";
import { useNavigate } from "react-router-dom";

export default function SideNavBar({selectedPage, setSelectedPage, setShowModal}) {

    const navigate = useNavigate();

    const handleSelectPage = (num) => {
        setSelectedPage(num);
    }

    const handleLogout = () => {
      localStorage.clear();
      navigate('/auth')  
    }

  return (
    <div className={styles.container}>
      <p className={styles.quizzie}>QUIZZIE</p>

      <div className={styles.pageButtons}>
        <SideNavButton title="Dashboard" changePage={() => handleSelectPage(0)} currentPage={selectedPage} number={0}/>
        <SideNavButton title="Analytics" changePage={() => handleSelectPage(1)} currentPage={selectedPage} number={1}/>
        <SideNavButton title="Create Quiz" changePage={() => setShowModal(true)} currentPage={selectedPage} number={2}/>
      </div>

      <div className={styles.logout}>
        <hr className={styles.horizontalLine}/>
        <button onClick={handleLogout} className={styles.logoutbtn}>LOGOUT</button>
      </div>
    </div>
  );
}
