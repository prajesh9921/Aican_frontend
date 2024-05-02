import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/header";
import FilterBox from "../../components/Home/FilterBox/filterBox";
import StoryBox from "../../components/Home/StoryBox/storyBox";
import styles from "./home.module.css";
import { FilterData } from "../../utils/filterData";
import StoryModal from "../../components/Home/StoryModal/storymodal";
import AddStoryModal from "../../components/AddStory/addStory";

export default function Home() {
  let token = localStorage.getItem("token");
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyModalData, setStoryModalData] = useState("");
  const [categoryData, setCategoryData] = useState(FilterData);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [addStoryModal, setAddStoryModal] = useState({
    status: false,
    root: "",
  });
  const [addStoryData, setAddStoryData] = useState();

  const mystoriesRef = useRef();

  const toggleDisplay = () => {
    if (mystoriesRef.current.style.display === "none") {
      mystoriesRef.current.style.display = "block";
    } else {
      mystoriesRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 480);
      if (mystoriesRef.current) {
        if (window.innerWidth > 480) {
          mystoriesRef.current.style.display = "block";
        } else {
          mystoriesRef.current.style.display = "none";
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setCategoryData]);

  return (
    <div>
      <Header
        toggleDisplay={toggleDisplay}
        openAddStoryModal={setAddStoryModal}
      />

      {/* filter Category */}
      <FilterBox setCategoryData={setCategoryData} />

      <main className={styles.main}>
        {token ? (
          <div ref={mystoriesRef} className={styles.mystories}>
            <StoryBox
              storyModalData={setStoryModalData}
              showModal={setShowStoryModal}
              showEdit={true}
              query="Your stories will appear here"
              openAddStoryModal={setAddStoryModal}
              setAddStoryData={setAddStoryData}
            />
          </div>
        ) : null}
        {categoryData.map((item, index) => (
          <StoryBox
            key={index}
            storyModalData={setStoryModalData}
            showModal={setShowStoryModal}
            query={item.label}
          />
        ))}
      </main>

      <AddStoryModal
        data={addStoryData}
        open={addStoryModal}
        setOpen={setAddStoryModal}
      />

      <StoryModal
        storyModalData={storyModalData}
        showModal={showStoryModal}
        closeModal={setShowStoryModal}
      />
    </div>
  );
}
