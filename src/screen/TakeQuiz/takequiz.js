import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./takequiz.module.css";
import {
  GetQuizById,
  UpdateImpression,
  SubmitQuizApi,
  SubmitPollQuizApi,
} from "../../api/quiz";
import CircularProgress from "@mui/material/CircularProgress";
import Trophy from "../../assets/trophy.png";

const TakeQuiz = () => {
  const { quizid } = useParams();
  const [selectedOption, setSelectedOption] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState("off");
  const [answerData, setAnswerData] = useState([]);
  const [pollData, setPollData] = useState([]);

  const callApiToGetQuiz = async () => {
    const response = await GetQuizById(quizid, setLoading);
    setQuizData(response.data);
    if (response?.data?.timer !== "off") {
      setTimer(parseInt(response?.data?.timer));
    }
    setAnswerData(Array(response?.data?.questions?.length).fill(-1));
    setPollData(Array(response?.data?.questions?.length).fill(-1));
  };

  useEffect(() => {
    callApiToGetQuiz();
    UpdateImpression(quizid);
  }, []);

  // To handle option click
  const handleAnswerClick = (selectedAnswer) => {
    setSelectedOption(selectedAnswer);
  };

  const handlePollNextQuestion = () => {

    const temp = pollData;
    temp[currentQuestion] = selectedOption;
    setPollData(temp);

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedOption(-1);
  };

  useEffect(() => {
    if (quizData && currentQuestion < quizData?.questions?.length && quizData?.timer !== "off") {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            handleNextQuestion();
            return parseInt(quizData?.timer);
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestion, quizData]);

  const handleNextQuestion = () => {
      if (selectedOption.toString() === quizData?.questions[currentQuestion]?.answer) {
        setScore((prevScore) => prevScore + 1);
        const temp = answerData;
        temp[currentQuestion] = 1;
        setAnswerData(temp);
      } else if (selectedOption === -1) {
        const temp = answerData;
        temp[currentQuestion] = -1;
        setAnswerData(temp);
      } else {
        const temp = answerData;
        temp[currentQuestion] = 0;
        setAnswerData(temp);
      }

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    if (timer !== "off") {
        const time = quizData?.timer === "5" ? 5 : 10;
        setTimer(time);
    }
    setSelectedOption(-1);
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <CircularProgress />
      ) : currentQuestion < quizData?.questions?.length ? (
        <div className={styles.content}>
          <p className={styles.questionnumber}>
            0{currentQuestion + 1}/0{quizData?.questions?.length}{" "}
            {timer !== "off" ? (
              <span style={{ color: "#D60000" }}>00:{timer}s</span>
            ) : null}{" "}
          </p>
          <p className={styles.question}>
            {quizData?.questions[currentQuestion]?.question}
          </p>

          <div className={styles.options}>
            {quizData?.questions[currentQuestion]?.options.map((item, index) => (
              <div
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{ padding: item.option ? 5 : 0 }}
                className={`${styles.option} ${
                  selectedOption === index ? styles.selected : null
                }`}
              >
                {item?.option ? (
                  <p className={styles.optionlabel}>{item?.option}</p>
                ) : null}
                {item?.img ? (
                  <img
                    className={styles.image}
                    src={item?.img}
                    alt="optionimg"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.nxtbtn}>
            <button
              onClick={
                quizData.quizType === "poll"
                  ? handlePollNextQuestion
                  : handleNextQuestion
              }
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </div>
      ) : quizData.quizType === "q&a" ? (
        <QuizFinishedCard
          quizId={quizid}
          userQuizData={answerData}
          total={quizData?.questions?.length}
          marks={score}
        />
      ) : (
        <PollFinishedCard data={pollData} quizId={quizid} />
      )}
    </div>
  );
};

export default TakeQuiz;

const QuizFinishedCard = ({ total, marks, userQuizData, quizId }) => {
  useEffect(() => {
    SubmitQuizApi(quizId, userQuizData);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.finishedcontainer}>
        <p className={styles.finishcardtext}>Congrats Quiz is completed</p>
        <img src={Trophy} alt="trophy" className={styles.trophy} />
        <p className={styles.finishcardtext}>
          Your Score is{" "}
          <span className={styles.scoretext}>
            0{marks}/0{total}
          </span>
        </p>
      </div>
    </div>
  );
};

const PollFinishedCard = ({ data, quizId }) => {
  useEffect(() => {
    SubmitPollQuizApi(quizId, data);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.finishedpollcontainer}>
        <p className={styles.pollfinishedtext}>
          Thanks for participating in the poll
        </p>
      </div>
    </div>
  );
};
