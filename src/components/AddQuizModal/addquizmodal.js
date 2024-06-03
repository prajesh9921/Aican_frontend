import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./addquizmodal.module.css";
import CButton from "../Button/button";
import AddQuestionModal from "./AddQuestionModal/addquestionmodal";
import SuccessModal from "./SuccessModal/successModal";

export default function AddQuizModal({ showModal, closeModal, setSelectedPage }) {
  const userid = localStorage.getItem('userId');
  const [steps, setSteps] = useState(0);
  const [quizData, setQuizData] = useState({
    quizName: '',
    quizType: '',
    timer: 'off',
    createdBy: userid,
  })
  const [quizId, setQuizId] = useState('');

  const handleCloseModal = () => {
    closeModal(false);
    setSelectedPage(0);
  } 

  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
      className={styles.modal}
    >
      <div className={styles.content}>
        {steps === 0 &&
          <QuizName setSteps={setSteps} closeModal={closeModal} setQuizData={setQuizData} />
        }

        {steps === 1 && <AddQuestionModal setSelectedPage={setSelectedPage} setQuizId={setQuizId} setSteps={setSteps} closeModal={closeModal} data={quizData}/>}
        {steps === 2 && <SuccessModal quizId={quizId} setSteps={setSteps} closeModal={closeModal} />}
      </div>
    </Modal>
  );
}

// Modal to add quizname and select the quiz type.
const QuizName = ({ closeModal, setQuizData, setSteps }) => {
  const [data, setData] = useState({
    type: '',
    quizname: ''
  });
  const [error, setError] = useState(false);

  const typeSelect = (type) => {
    setData({ ...data, type: type });
  }

  const handleQuizname = (e) => {
    setData({ ...data, quizname: e.target.value });
  }

  const onContinue = () => {
    if (!data.type || !data.quizname) {
      setError(true);
      return;
    }

    setQuizData(prev => ({
      ...prev,
      quizName: data.quizname,
      quizType: data.type
    }));
    setSteps(1);
  }

  return <div className={styles.quizdiv}>
    <input onChange={handleQuizname} placeholder="Quiz name" className={styles.quizname} type="text" id="quizname" name="quizname" required />
    <div className={styles.quiztype}>
      <p>Quiz Type</p>
      <CButton onClick={() => typeSelect('q&a')} title="Q & A" selected={data.type === "q&a" ? true : false} />
      <CButton onClick={() => typeSelect('poll')} title="Poll Type" selected={data.type === "poll" ? true : false} />
    </div>

    <div className={styles.actionbtn}>
      <CButton onClick={() => closeModal(false)} title="Cancel" width={200} />
      <CButton onClick={onContinue} title="Continue" width={200} selected />
    </div>

    {error &&
      <p className={styles.error}>Please enter quiz name and select quiz type</p>
    }
  </div>
}