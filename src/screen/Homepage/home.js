import React, { useState } from "react";
import styles from "./home.module.css";
import SideNavBar from "../../components/HomePage/SideNav/sidenav";
import Dashboard from "../Dashboard/dashboard";
import Analytics from "../Analytics/analytics";
import AddQuizModal from "../../components/AddQuizModal/addquizmodal";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [allData, setAllData] = useState();

  return (
    <div className={styles.container}>
      {/* SIDE NAVBAR */}
      <div className={styles.sidenav}>
        <SideNavBar
          setShowModal={setShowModal}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </div>

      {/* SELECTED PAGE */}
      <div className={styles.contentpage}>
        {selectedPage === 0 && (
          <Dashboard
            showModal={showModal}
            allData={allData}
            setAllData={setAllData}
          />
        )}
        {selectedPage === 1 && (
          <Analytics
            setSelectedPage={setSelectedPage}
            allData={allData?.data}
          />
        )}
      </div>

      <AddQuizModal
        showModal={showModal}
        setSelectedPage={setSelectedPage}
        closeModal={setShowModal}
      />
    </div>
  );
}
