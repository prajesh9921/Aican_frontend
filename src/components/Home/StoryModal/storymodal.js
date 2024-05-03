import React from "react";
import Modal from "@mui/material/Modal";
import StoryCard from "../../Story/storycard";
import styles from "./storymodal.module.css";

export default function StoryModal({ storyModalData, showModal, closeModal }) {
  return (
    <Modal
      open={showModal}
      onClose={() => closeModal(false)}
      className={styles.modal}
    >
      <StoryCard data={storyModalData} closeModal={closeModal} />
    </Modal>
  );
}
