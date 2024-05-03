import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import styles from "./bookmark.module.css";
import { GetYourBookmarkedStory } from "../../api/stories";
import { ThreeDots } from "react-loader-spinner";
import StoryModal from "../../components/Home/StoryModal/storymodal";
import { FaOpenid } from "react-icons/fa";

export default function BookmarkPage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleShowStoryModal = () => setOpen(true);

  const BoxCard = ({ postData, alldata }) => {
    return (
      <div
        className={styles.storyBox}
        style={{ backgroundImage: `url(${postData?.img})` }}
      >
        <div onClick={handleShowStoryModal} className={styles.storyInfo}>
          <p className={styles.heading}>{postData?.title}</p>
          <p style={{ fontSize: 10 }}>
            {postData?.subtitle}
          </p>
        </div>

        <StoryModal storyModalData={alldata} showModal={open} closeModal={setOpen}/>
      </div>
    );
  };

  const fetchBookedMarkedStories = async () => {
    const res = await GetYourBookmarkedStory(setLoading);
    setData(res?.data);
  };

  useEffect(() => {
    fetchBookedMarkedStories();
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <h2>Your Bookmarks</h2>

        {loading ? (
          <div className={styles.loader}>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
            />
          </div>
        ) : data?.length === 0 ? (
          <div className={styles.nodata}>No bookmarked stories found</div>
        ) : (
          <div className={styles.gridContainer}>
            {data?.map((item, index) => (
              <BoxCard key={index} postData={item?.data[0]} alldata={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
