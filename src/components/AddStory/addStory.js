import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./addStory.module.css";
import { Paper } from "@mui/material";
import { RxCrossCircled } from "react-icons/rx";
import CButton from "../Button/button";
import { toast } from "react-toastify";
import { FilterData } from "../../utils/filterData";
import { AddStory, UpdateStory } from "../../api/stories";
import { Oval } from "react-loader-spinner";
import RemoveSpace from "../../utils/removespace";

export default function AddStoryModal({ data, open, setOpen }) {
  const userID = localStorage.getItem("userId");
  const DefaultEntries = [
    {
      title: "",
      subtitle: "",
      img: "",
    },
    {
      title: "",
      subtitle: "",
      img: "",
    },
    {
      title: "",
      subtitle: "",
      img: "",
    },
  ];

  const handleClose = () => setOpen({ status: false, root: "" });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [entries, setEntries] = useState(DefaultEntries);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open.root === "edit") {
      setEntries(data?.data || DefaultEntries); // Use DefaultEntries if data is undefined
    } else {
      setEntries(DefaultEntries);
    }
  }, [data, open.root]);

  // Function to add slide
  const addSlide = () => {
    if (entries.length < 6) {
      const val = {
        title: "",
        subtitle: "",
        img: "",
      };

      setEntries([...entries, val]);
    } else {
      return toast.error("Can add upto 6 slides only");
    }
  };

  // Function to delete slide
  const deleteSlide = (index) => {
    if (index > 2) {
      const temparr = entries;
      temparr.splice(index, 1);
      setEntries(temparr);
    }
  };

  // Slide Box Component
  const Slidebox = ({ index, add = false }) => {
    const handleClick = () => {
      setSelectedSlide(index);
    };

    return (
      <Paper
        onClick={add ? addSlide : handleClick}
        elevation={2}
        className={
          index === selectedSlide ? styles.slideSelected : styles.slidemain
        }
      >
        <p className={styles.slideText}>
          {add ? "Add +" : `Slide ${index + 1}`}
        </p>
        {index > 2 ? (
          <RxCrossCircled
            size={15}
            onClick={() => deleteSlide(index)}
            className={styles.crossIcon}
          />
        ) : null}
      </Paper>
    );
  };


  // Function to handle input
  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEntries(updatedEntries);
  };

  // Function call to add story
  const AddStoryApi = async () => {
    entries.map((item, index) => {
      if (!item.title || !item.subtitle || !item.img) {
        setSelectedSlide(index);
        toast("All fields are required");
        return null;
      }
      return item;
    });

    if (!category) {
      return toast("All fields are required");
    }

    const val = {
      category: RemoveSpace(category),
      data: entries,
      userid: userID,
    };
    const res = await AddStory(setLoading, val);
    if (res?.message === "Story added successfully") {
      setOpen(false);
      window.location.reload();
    }
  };


  const nextSlide = async () => {
    if (selectedSlide < entries.length - 1) {
      setSelectedSlide((prev) => prev + 1);
    }
  };

  const prevSlide = async () => {
    if (selectedSlide > 0) {
      setSelectedSlide((prev) => prev - 1);
    }
  };

  // Function to update the story
  const UpdateStoryApi = async () => {
    entries.map((item, index) => {
      if (!item.title || !item.subtitle || !item.img) {
        setSelectedSlide(index);
        toast("All fields are required");
        return null;
      }
      return item;
    });

    if (!category) {
      return toast("All fields are required");
    }

    const val = {
      category: RemoveSpace(category).toLowerCase(),
      data: entries,
      userid: userID,
    };
    const res = await UpdateStory(data?._id, setLoading, val);
    if (res?.message === "Updated job details") {
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <Modal open={open.status} onClose={handleClose} className={styles.modal}>
      <div className={styles.main}>
        {/* Slide Buttons */}
        <p className={styles.warning}>Add upto 6 slides </p>
        <div className={styles.btndiv}>
          {entries?.map((item, index) => (
            <Slidebox index={index} key={index}/>
          ))}
          <Slidebox add={true} />
        </div>

        {/* Input Form */}
        <div className={styles.form}>
          {/* Heading */}
          <div className={styles.field}>
            <label htmlFor="heading">Heading :</label>
            <div className={styles.inputdiv}>
              <input
                className={styles.input}
                placeholder="Enter heading"
                onChange={(e) =>
                  handleInputChange(
                    selectedSlide,
                    e.target.name,
                    e.target.value
                  )
                }
                type="text"
                name="title"
                value={entries[selectedSlide]?.title}
              />
            </div>
          </div>
          {/* Description */}
          <div className={styles.field}>
            <label htmlFor="description">Description :</label>
            <div className={styles.textareadiv}>
              <textarea
                rows={3}
                type="text"
                name="subtitle"
                placeholder="Enter description"
                value={entries[selectedSlide]?.subtitle}
                className={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    selectedSlide,
                    e.target.name,
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          {/* Image */}
          <div className={styles.field}>
            <label htmlFor="image">Image :</label>
            <div className={styles.inputdiv}>
              <input
                type="text"
                name="img"
                placeholder="Paste image url"
                className={styles.input}
                value={entries[selectedSlide]?.img}
                onChange={(e) =>
                  handleInputChange(
                    selectedSlide,
                    e.target.name,
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          {/* Category */}
          <div className={styles.field}>
            <label htmlFor="category">Category :</label>
            <div className={styles.inputdiv}>
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                className={styles.dropdown}
              >
                <option defaultValue="default" disabled selected>
                  Please select category
                </option>
                {FilterData.map((item, index) => (
                  <option key={index} value={item.label}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.buttonsdiv}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <CButton
              title="Previous"
              color="#7EFF73"
              style={{ color: "#fff" }}
              onClick={prevSlide}
            />

            <CButton
              title="Next"
              color="#73ABFF"
              style={{ color: "#fff" }}
              onClick={nextSlide}
            />
          </div>
          {loading ? (
            <Oval height={30} width={30} visible={true} />
          ) : (
            <CButton
              title={open.root === "edit" ? "Update post" : "Post"}
              color="#FF7373"
              style={{ color: "#fff" }}
              onClick={open.root === "edit" ? UpdateStoryApi : AddStoryApi}
            />
          )}
        </div>

        <div className={styles.postbtn}>
          {loading ? (
            <Oval height={30} width={30} visible={true} />
          ) : (
            <CButton
              title={open.root === "edit" ? "Update post" : "Post"}
              color="#FF7373"
              style={{ color: "#fff" }}
              onClick={open.root === "edit" ? UpdateStoryApi : AddStoryApi}
            />
          )}
        </div>

        <RxCrossCircled
          size={24}
          onClick={handleClose}
          className={styles.crossIcon}
          style={{ top: "0.5rem", right: "0.5rem" }}
        />
      </div>
    </Modal>
  );
}
