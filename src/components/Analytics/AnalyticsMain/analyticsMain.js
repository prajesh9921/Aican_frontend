import React, { useState } from "react";
import styles from "./analyticsMain.module.css";
import Modal from "@mui/material/Modal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import moment from "moment";
import AddQuestionModal from "../../AddQuizModal/AddQuestionModal/addquestionmodal";
import { DeleteQuizApi } from "../../../api/quiz";
import CButton from "../../Button/button";
import { toast } from "react-toastify";

const AnalyticsMain = ({ changePage, data, setSelectedQuiz, setSelectedPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState();
  const [quizToDelete, setQuizToDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [allQuizes, setAllQuizes] = useState(data);

  const baseUrl = process.env.REACT_APP_URl;

  const requiredData = {
    quizType: quizToEdit?.quizType,
  };

  const handleQuestionWiseAnalysis = (type, index) => {
    changePage(type);
    setSelectedQuiz(index);
  };

  const handleEditQuiz = (quiz) => {
    setQuizToEdit(quiz);
    setShowModal(true);
  };

  const showDeleteDialog = (quizId) => {
    setShowDeleteModal(true);
    setQuizToDelete(quizId);
  };

  const handleCopy = (quizId) => {
    const linktobecopied = `${baseUrl}/quiz/${quizId}`
    navigator.clipboard.writeText(linktobecopied);
    toast.success("Link copied!");
}

  const handleDeleteQuiz = async () => {
    const res = await DeleteQuizApi(quizToDelete, setLoading);
    if (res.message === "Quiz deleted successfully!") {
      setShowDeleteModal(false);
      const temp = allQuizes.filter((item) => item._id !== quizToDelete);
      setAllQuizes(temp);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Quiz Analysis</p>
      <div className={styles.tablediv}>
        <table cellPadding="0" cellSpacing="0" className={styles.quiztable}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created on</th>
              <th>Impression</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allQuizes?.map((quiz, index) => (
              <tr
                key={quiz?._id}
                className={index % 2 === 1 ? styles.stripedrow : ""}
              >
                <td>{index + 1}</td>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {quiz?.quizName}
                </td>
                <td>{moment(quiz.createdAt).format("Do MMMM ,YYYY")}</td>
                <td>{quiz?.impression}</td>
                <td className={styles.action}>
                  <FaRegEdit
                    color="#5076FF"
                    onClick={() => handleEditQuiz(quiz)}
                    className={styles.actionbtn}
                    size={20}
                  />
                  <RiDeleteBin5Fill
                    color="#D60000"
                    onClick={() => showDeleteDialog(quiz?._id)}
                    className={styles.actionbtn}
                    size={20}
                  />
                  <IoShareSocial
                    color="#60B84B"
                    className={styles.actionbtn}
                    size={20}
                    onClick={() => handleCopy(quiz?._id)}
                  />
                </td>
                <td>
                  <a
                    href="#analysis"
                    onClick={() =>
                      handleQuestionWiseAnalysis(quiz?.quizType, index)
                    }
                  >
                    Question Wise Analysis
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allQuizes.length === 0 && (
          <div className={styles.nodata}>
            <p>No quizes to show</p>
          </div>
        )}
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <div className={styles.modalcontent}>
          <AddQuestionModal
            closeModal={setShowModal}
            quizEditData={quizToEdit}
            data={requiredData}
            edit={true}
            setSelectedPage={setSelectedPage}
          />
        </div>
      </Modal>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className={styles.modal}
      >
        <div className={styles.modalcontent}>
          <div>
            <p className={styles.deleteText}>
              Are you confirm <br /> you want to delete ?
            </p>
            <div className={styles.actionControlbtn}>
              <CButton
                onClick={handleDeleteQuiz}
                title="Confirm Delete"
                padding="0.8rem"
                width={200}
                style={{
                  backgroundColor: "#FF4B4B",
                  fontWeight: "bold",
                  color: "#fff",
                }}
                loading={loading ? true : false}
              />
              <CButton
                onClick={() => setShowDeleteModal(false)}
                padding="0.8rem"
                title="Cancel"
                width={200}
                style={{ color: "#000" }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AnalyticsMain;
