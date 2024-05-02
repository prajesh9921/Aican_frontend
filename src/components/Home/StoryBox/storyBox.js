import React, { useState, useEffect } from "react";
import styles from "./storyBox.module.css";
import { FaEdit } from "react-icons/fa";
import CButton from "../../Button/button";
import { ThreeDots } from "react-loader-spinner";
import RemoveSpace from "../../../utils/removespace";
import { GetStoryByQuery, GetYourStory } from "../../../api/stories";
import { Paper } from "@mui/material";

export default function StoryBox({
  storyModalData,
  showModal,
  query,
  showEdit = false,
  openAddStoryModal,
  setAddStoryData,
}) {
  let userid = localStorage.getItem("userId");

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
    storyModalData(data);
    showModal(true);
  };

  // Box Card Component
  const BoxCard = ({ postData, allData }) => {
    const handleEditStory = () => {
      setAddStoryData(allData);
      openAddStoryModal({status: true, root: 'edit'});
    };
    return (
      <div
        className={styles.storyBox}
        style={{ backgroundImage: `url(${postData?.img})` }}
      >
        <div
          onClick={() => handleShowStoryModal(allData)}
          className={styles.storyInfo}
        >
          <p className={styles.heading}>{postData?.title}</p>
          <p style={{ fontSize: 10 }}>{postData?.subtitle}</p>
        </div>
        {/* Edit Button */}
        {showEdit ? (
          <Paper
            onClick={handleEditStory}
            elevation={2}
            className={styles.editBtn}
          >
            <FaEdit size={15} />
            <p style={{ color: "#000" }}>Edit</p>
          </Paper>
        ) : null}
      </div>
    );
  };

  // Function to fetch data
  const FetchData = async () => {
    let formatedquery = RemoveSpace(query);
    const res = showEdit
      ? await GetYourStory(userid, setLoading)
      : await GetStoryByQuery(formatedquery.toLowerCase(), setLoading);
    setData(res?.data);
  };

  useEffect(() => {
    FetchData();
  }, [query]);

  return (
    <div className={styles.mainBox}>
      <h3>
        {!showEdit ? "Top Stories About" : null} {query}
      </h3>

      {data?.length !== 0 ? (
        <div className={styles.gridContainer}>
          {data?.slice(0, itemsToShow).map((item, index) => (
            <BoxCard key={index} postData={item?.data[0]} allData={item} />
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
