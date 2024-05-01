import React, { useEffect, useState } from "react";
import styles from "./storycard.module.css";
import { FaAngleLeft, FaAngleRight, FaBookmark, FaHeart } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import Stories from "react-insta-stories";
import { BookmarkStory } from "../../api/stories";
import { toast } from "react-toastify";

export default function StoryCard({ data, closeModal }) {
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const storyData = data?.data?.map((item) => ({ url: item.img }));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const next = () => {
    if (currentIdx < data?.data?.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIdx >= 1) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    closeModal(false);
  };

  const ToBookmarkTheStory = async () => {
    if (token) {
      const res = await BookmarkStory(data?._id, setLoading);
      if (res) {
        return toast.success(res?.message);
      } else {
        return toast.error("Error in bookmarking story");
      }
    } else {
        closeModal(false);
        return toast.success("Login to bookmark the story");
    }
  };

  return (
    <div className={styles.main}>
      <FaAngleLeft size={35} className={styles.nexticon} onClick={prev} />

      <div className={styles.storydiv}>
        <Stories
          stories={storyData}
          defaultInterval={3000}
          width="100%"
          height="inherit"
          storyStyles={{ zIndex: 1 }}
          onStoryEnd={next}
          currentIndex={currentIdx}
        />

        <div className={styles.storyInfo}>
          <div className={styles.options}>
            <MdClose
              onClick={handleClose}
              size={20}
              color="#fff"
              style={{ margin: 0, cursor: "pointer" }}
            />
            <SlPaperPlane size={20} color="#fff" style={{ margin: 0 }} />
          </div>

          <div className={styles.storydetails}>
            <p className={styles.heading}>{data?.data[currentIdx]?.title}</p>
            <p className={styles.sub}>{data?.data[currentIdx]?.subtitle}</p>

            <div className={styles.options}>
              <FaBookmark
                size={20}
                color={
                  data?.bookedMarkedBy?.includes(userID) ? "#085CFF" : "#fff"
                }
                style={{ margin: 0 }}
                onClick={ToBookmarkTheStory}
              />
              <span
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <FaHeart
                  size={20}
                  color={data?.likedBy?.includes(userID) ? "#FF0000" : "#fff"}
                  style={{ margin: 0 }}
                />
                <p>{data?.likes}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <FaAngleRight size={35} className={styles.previcon} onClick={next} />
    </div>
  );
}
