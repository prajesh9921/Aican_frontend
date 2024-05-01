import React, { useState, useEffect } from "react";
import styles from "./storyBox.module.css";
import { FaEdit } from "react-icons/fa";
import CButton from "../../Button/button";
import { ThreeDots } from "react-loader-spinner";
import RemoveSpace from "../../../utils/removespace";
import { GetStoryByQuery, GetYourStory } from "../../../api/stories";
import { Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function StoryBox({ setStoryModalData, showModal, query, showEdit = false }) {
  let userid = localStorage.getItem("userId");

  const navigate = useNavigate();

  const DEFAULT_ITEM_COUNT = 5;

  const [itemsToShow, setItemsToShow] = useState(DEFAULT_ITEM_COUNT);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const ShowItems = () => {
    setItemsToShow((prev) => {
      if (prev <= DEFAULT_ITEM_COUNT) {
        return data?.length; // Show all items if currently showing less than or equal to 5
      } else {
        return DEFAULT_ITEM_COUNT; // Otherwise, show only 5 items
      }
    });
  };

  const handleShowStoryModal = (data) => {
    setStoryModalData(data)
    showModal(true);
  }

  const BoxCard = ({ postData, allData }) => {
    return (
      <div
        onClick={() => handleShowStoryModal(allData)}
        className={styles.storyBox}
        style={{ backgroundImage: `url(${postData?.img})` }}
      >
        <div className={styles.storyInfo}>
          <p className={styles.heading}>{postData?.title}</p>
          <p style={{ fontSize: 10 }}>{postData?.subtitle}</p>
        </div>

        {/* Edit Button */}
        {showEdit ? (
          <Paper elevation={2} className={styles.editBtn}>
            <FaEdit size={15} />
            <p style={{ color: "#000" }}>Edit</p>
          </Paper>
        ) : null}
      </div>
    );
  };

  const FetchData = async () => {
    let formatedquery = RemoveSpace(query);
    const res = showEdit
      ? await GetYourStory(userid, setLoading)
      : await GetStoryByQuery(formatedquery, setLoading);
    setData(res?.data);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className={styles.mainBox}>
      <h3>
        {!showEdit ? "Top Stories About" : null} {query}
      </h3>

      {data?.length !== 0 ? (
        <div className={styles.gridContainer}>
          {data?.slice(0, itemsToShow).map((item) => (
            <BoxCard postData={item?.data[0]} allData={item} />
          ))}
        </div>
      ) : loading ? (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      ) : (
        <div className={styles.nostories}>No Stories Available</div>
      )}

      {!data?.length ? null : (
        <CButton
          onClick={ShowItems}
          style={{ color: "#fff" }}
          color="#FF7373"
          title={itemsToShow <= DEFAULT_ITEM_COUNT ? "Show more" : "Show less"}
        />
      )}
    </div>
  );
}
