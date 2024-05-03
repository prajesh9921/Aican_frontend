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
  const [like, setLike] = useState({
    liked: data?.likedBy?.includes(userID) ? true : false,
    likes: data?.likes,
  });
  const [bookmark, setBookmark] = useState(
    data?.bookedMarkedBy?.includes(userID) ? true : false
  );

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
    setBookmark((prev) => !prev);
    if (token) {
      const res = await BookmarkStory(data?._id, setLoading);
      if (res && res.message === "Successfully bookedmarked story.") {
        data.bookedMarkedBy = [...data.bookedMarkedBy, userID];
      } else if (res.message === "Bookmarked removed.") {
        let indexToRemove = data.bookedMarkedBy.indexOf(userID);
        if (indexToRemove !== -1) {
          data.bookedMarkedBy.splice(indexToRemove, 1);
        }
      }
    } else {
      closeModal(false);
      navigate("/login");
    }
  };

  const ToLikeTheStory = async () => {
    setLike((prev) => ({
      liked: !prev.liked,
      likes: prev.liked ? data.likes - 1 : data.likes + 1,
    }));
    if (token) {
      const res = await LikeStory(data?._id);
      console.log(res);
      if (res && res?.message === "Liked story") {
        data.likedBy = [...data.likedBy, userID];
        data.likes += 1;
      } else if (res && res?.message === "Story Unliked") {
        let indexToRemove = data.likedBy.indexOf(userID);
        if (indexToRemove !== -1) {
          data.likedBy.splice(indexToRemove, 1);
        }
        data.likes -= 1;
      }
    } else {
      closeModal(false);
      navigate("/login");
    }
  };

  const Spinner = () => {
    return <Oval visible={true} height="30" width="30" color="#fff" />;
  };

  // Function to share the link
  const handleSendLink = async () => {
    const url = `https://swiptorycuv.netlify.app/story/${data?._id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
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
          loop={true}
          onAllStoriesEnd={() => setCurrentIdx(0)}
        />

        <div className={styles.storyInfo}>
          <div className={styles.options}>
            <MdClose
              onClick={handleClose}
              size={20}
              color="#fff"
              style={{ margin: 0, cursor: "pointer" }}
            />
            <SlPaperPlane
              onClick={handleSendLink}
              size={20}
              color="#fff"
              style={{ margin: 0 }}
            />
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
                  color={bookmark ? "#085CFF" : "#fff"}
                  style={{ margin: 0 }}
                  onClick={ToBookmarkTheStory}
                />
              )}
              <span
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <FaHeart
                  size={20}
                  color={like?.liked ? "#FF0000" : "#fff"}
                  style={{ margin: 0 }}
                  onClick={ToLikeTheStory}
                />
                <p>{like?.likes}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <FaAngleRight size={35} className={styles.previcon} onClick={next} />
    </div>
  );
}
