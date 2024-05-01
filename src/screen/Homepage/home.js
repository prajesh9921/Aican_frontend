import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import LoginAndRegisterScreen from "../Login&Register/login&register";
import FilterBox from "../../components/Home/FilterBox/filterBox";
import StoryBox from "../../components/Home/StoryBox/storyBox";
import styles from "./home.module.css";
import { FilterData } from "../../utils/filterData";
import StoryModal from "../../components/Home/StoryModal/storymodal";

export default function Home() {
  let token = localStorage.getItem("token");
  const [authType, setAuthType] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyModalData, setStoryModalData] = useState({});

  const [categoryData, setCategoryData] = useState(FilterData);

  useEffect(() => {}, [setCategoryData]);

  return (
    <div>
      <Header showModal={setShowModal} setAuthType={setAuthType} />

      {/* filter Category */}
      <FilterBox setCategoryData={setCategoryData} />

      <main className={styles.main}>
        {token ? (
          <div className={styles.mystories}>
            <StoryBox setStoryModalData={setStoryModalData} showModal={setShowStoryModal} showEdit={true} query="Your stories will appear here" />
          </div>
        ) : null}
        {categoryData.map((item) => (
          <StoryBox query={item.label} />
        ))}
      </main>

      <LoginAndRegisterScreen
        showModal={showModal}
        type={authType}
        closeModal={setShowModal}
      />

      <StoryModal storyModalData={storyModalData} showModal={showStoryModal} closeModal={setShowStoryModal}/>
    </div>
  );
}
