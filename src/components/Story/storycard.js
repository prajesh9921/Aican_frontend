import React, { useState } from "react";
import styles from "./storycard.module.css";
import { FaAngleLeft, FaAngleRight, FaBookmark, FaHeart } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import Stories from "react-insta-stories";
import { BookmarkStory, LikeStory } from "../../api/stories";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StoryCard({ data, closeModal }) {
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const storyData = data?.data?.map((item) => ({ url: item.img }));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

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
      await BookmarkStory(data?._id, setLoading);
    } else {
      closeModal(false);
      navigate("/login")
    }
  };

  const ToLikeTheStory = async () => {
    if (token) {
      setLike(true);
      await LikeStory(data?._id);
    } else {
      closeModal(false);
      navigate("/login")
    }
  };

  const Spinner = () => {
    return <Oval visible={true} height="30" width="30" color="#fff" />;
  };

  // Function to share the link
  const handleSendLink = async () => {
    const url = `http://localhost:3000/story/${data?._id}`
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard")
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  }

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
          loop={true}
        />

        <div className={styles.storyInfo}>
          <div className={styles.options}>
            <MdClose
              onClick={handleClose}
              size={20}
              color="#fff"
              style={{ margin: 0, cursor: "pointer" }}
            />
            <SlPaperPlane onClick={handleSendLink} size={20} color="#fff" style={{ margin: 0 }} />
          </div>

          <div className={styles.storydetails}>
            <p className={styles.heading}>{data?.data[currentIdx]?.title}</p>
            <p className={styles.sub}>{data?.data[currentIdx]?.subtitle}</p>

            <div className={styles.options}>
              {loading ? (
                <Spinner />
              ) : (
                <FaBookmark
                  size={20}
                  color={
                    data?.bookedMarkedBy?.includes(userID) ? "#085CFF" : "#fff"
                  }
                  style={{ margin: 0 }}
                  onClick={ToBookmarkTheStory}
                />
              )}
              <span
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <FaHeart
                  size={20}
                  color={data?.likedBy?.includes(userID) || like ? "#FF0000" : "#fff"}
                  style={{ margin: 0 }}
                  onClick={ToLikeTheStory}
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
