import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import styles from "./addquestionmodal.module.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CButton from "../../Button/button";
import { AddQuiz, EditQuizApi } from "../../../api/quiz";

const AddQuestionModal = ({
  data,
  closeModal,
  setSteps,
  setQuizId,
  edit = false,
  quizEditData,
  setSelectedPage
}) => {
  const radioStyle = {
    color: "#9F9F9F",
    "&.Mui-checked": {
      color: "black",
    },
  };

  const optionRadioStyle = {
    color: "#9F9F9F",
    "&.Mui-checked": {
      color: "#60B84B",
    },
  };
  const DefaultEntries = [
    {
      question: "",
      answer: "",
      options: [
        {
          option: "",
          img: "",
        },
        {
          option: "",
          img: "",
        },
      ],
    },
  ];

  const [questions, setQuestions] = useState(DefaultEntries);
  const [radio, setRadio] = useState("text");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [timer, setTimer] = useState("off");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit) {
      setQuestions(quizEditData?.questions);
    }
  }, []);

  //   Function to add the question
  const addQuestion = () => {
    if (questions.length < 5) {
      const val = {
        question: "",
        answer: "",
        options: [
          {
            option: "",
            img: "",
          },
          {
            option: "",
            img: "",
          },
        ],
      };
      setQuestions([...questions, val]);
      setSelectedQuestion(questions.length);
    } else {
      return toast.error("Can add upto 5 slides only");
    }
  };

  //   Function to handle the question input
  const handleQuestionName = (e) => {
    const updatedEntries = [...questions];
    updatedEntries[selectedQuestion] = {
      ...updatedEntries[selectedQuestion],
      question: e.target.value,
    };
    setQuestions(updatedEntries);
  };

  //   Function to handle radio buttons
  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  // Function to remove question
  const deleteQuestion = (index) => {
    setSelectedQuestion(
      index === selectedQuestion ? selectedQuestion - 1 : selectedQuestion
    );
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // Function to add option
  const addOption = () => {
    const newOption = {
      option: "",
      img: "",
    };
    const updatedEntries = [...questions];

    if (updatedEntries[selectedQuestion].options.length < 4) {
      updatedEntries[selectedQuestion] = {
        ...updatedEntries[selectedQuestion],
        options: [...updatedEntries[selectedQuestion].options, newOption],
      };
      setQuestions(updatedEntries);
    } else {
      toast.error("You can add upto 4 options only.");
    }
  };

  // Function to delete an option
  const deleteOption = (optionIndex) => {
    const updatedEntries = [...questions];

    updatedEntries[selectedQuestion] = {
      ...updatedEntries[selectedQuestion],
      options: updatedEntries[selectedQuestion].options.filter(
        (_, index) => index !== optionIndex
      ),
    };

    setQuestions(updatedEntries);
  };

  // Function to handle option input 
  const handleOptionChange = (optionidx, e) => {
    const updatedEntries = [...questions];
    const selectedOption = updatedEntries[selectedQuestion].options[optionidx];

    if (radio === "text") {
      selectedOption.img = "";
    } else if (radio === "image") {
      selectedOption.option = "";
    }
    updatedEntries[selectedQuestion].options[optionidx] = {
      ...selectedOption,
      [e.target.name]: e.target.value,
    };

    setQuestions(updatedEntries);
  };

  // Function to select the answer
  const handleSelectAnswer = (index) => {
    const updatedEntries = [...questions];
    updatedEntries[selectedQuestion] = {
      ...updatedEntries[selectedQuestion],
      answer: index.toString(),
    };
    setQuestions(updatedEntries);
  };

  // Function to handle timer
  const handleSelectTimer = (time) => {
    setTimer(time);
  };


  const handleCancelBtn = () => {
    if (!edit) {
      setSteps(0);
    }
    closeModal(false);
  };

  const validateQuestion = (question) => {
    if (!question?.trim()) {
      return true;
    }
    return "";
  };

  // Function to handle the options validation
  const validateOption = (option) => {
    if (!option.option.trim() && !option.img.trim()) {
      return true;
    }

    return false;
  };

  const validateInputs = () => {
    let optionError = [];
    let questionError = "";
    let answerError = [];
    let validateErrors = [];

    questions.forEach((question, qIndex) => {
      // checking for question
      const qError = validateQuestion(question?.question);
      if (qError) {
        questionError += (questionError ? ", " : "") + (qIndex + 1).toString();
      }

      // checking for options
      question?.options.forEach((option, optionidx) => {
        const oError = validateOption(option);
        if (oError) {
          optionError.push(qIndex + 1);
        }
      });

      // checking for selected answer
      if (!question.answer) {
        answerError.push(qIndex + 1);
      }
    });

    if (questionError.length !== 0) {
      validateErrors.push(
        `Question cannot be empty. Error in questions ${questionError}`
      );
    }

    if (optionError.length !== 0) {
      let uniqueArray = [...new Set(optionError)];
      validateErrors.push(
        `Options cannot be empty. Error in questions ${uniqueArray.join(", ")}`
      );
    }

    if (data.quizType === "q&a" && answerError.length != 0) {
      validateErrors.push(
        `Answer not selected in questions ${answerError.join(", ")}`
      );
    }

    setErrors(validateErrors);
    return validateErrors.length === 0;
  };

  // Api call to add quiz
  const callAddQuizApi = async () => {
    const newQuiz = {
      quizName: data.quizName,
      quizType: data.quizType,
      timer: timer,
      createdBy: data.createdBy,
      questions: questions,
    };

    const response = await AddQuiz(newQuiz, setLoading, setQuizId);
    return response?.quizId;
  };

  // Api call to edit the quiz
  const callEditQuizApi = async () => {
    const res = await EditQuizApi(
      quizEditData._id,
      questions,
      timer,
      setLoading
    );
    if (res?.message === "Quiz edited successfully!") {
      setSelectedPage(0)
      closeModal(false);
    }
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      const id = await callAddQuizApi();
      if (id) {
        setSteps(2);
        setSelectedPage(0)
      }
    } else {
      console.log(errors);
    }
  };

  //   Change question Buttons
  const ChangeQuestionTab = ({ index }) => {
    const handleClick = () => {
      setSelectedQuestion(index);
    };

    const handleDelete = (e) => {
      e.stopPropagation(); // This line makes sure that handleclick is not getting triggered on clicking x.
      deleteQuestion(index);
    };
    return (
      <div className={styles.questionmarker}>
        <Paper
          onClick={handleClick}
          elevation={4}
          className={
            selectedQuestion === index
              ? styles.selectedquestionTab
              : styles.questionTab
          }
        >
          <p>{index + 1}</p>
        </Paper>
        {index > 0 && (
          <p onClick={handleDelete} className={styles.crossquestion}>
            x
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* 1st Layer */}
      <div className={styles.questiondiv}>
        <div className={styles.questionmarkers}>
          {/* Add Question Button */}
          {questions?.map((item, index) => (
            <ChangeQuestionTab index={index} />
          ))}
          <FiPlus
            size={25}
            color="#9F9F9F"
            className={styles.addbtn}
            onClick={addQuestion}
          />
        </div>
        <p>Max 5 questions</p>
      </div>

      {/* 2nd Layer */}
      <input
        onChange={handleQuestionName}
        placeholder="Enter question"
        className={styles.questionip}
        value={questions[selectedQuestion]?.question}
        type="text"
        name="questionn"
        required
      />

      {/* 3rd layer */}
      <div className={styles.radiogrpdiv}>
        <p style={{ margin: 0 }}>Option Type</p>
        <RadioGroup
          row
          value={radio}
          onChange={handleRadioChange}
          className={styles.radiogrp}
        >
          <FormControlLabel
            value="text"
            className={styles.radiolabel}
            control={<Radio size={"25"} sx={radioStyle} />}
            label="Text"
          />
          <FormControlLabel
            value="image"
            className={styles.radiolabel}
            control={<Radio size={"25"} sx={radioStyle} />}
            label="Image URL"
          />
          <FormControlLabel
            value="text&image"
            className={styles.radiolabel}
            control={<Radio size={"25"} sx={radioStyle} />}
            label="Text & Image URL"
          />
        </RadioGroup>
      </div>

      {/* 4th Layer */}
      <div className={styles.optioncontainer}>
        <div style={{ flex: 3 }}>
          {questions[selectedQuestion]?.options?.map((item, index) => (
            <div className={styles.optionsdiv}>
              {data.quizType === "q&a" ? (
                <Radio
                  checked={
                    questions[selectedQuestion].answer === index.toString()
                  }
                  onChange={() => handleSelectAnswer(index)}
                  value={questions[selectedQuestion].answer}
                  name="radio-buttons"
                  size="25"
                  sx={optionRadioStyle}
                  style={{ margin: 0 }}
                />
              ) : null}
              {radio === "text" || radio === "text&image" ? (
                <input
                  type="text"
                  placeholder="Text"
                  style={{
                    marginLeft: data.quizType === "poll" ? 50 : 0,
                    maxWidth: radio === "text&image" ? "35%" : "50%",
                  }}
                  className={
                    questions[selectedQuestion].answer === index.toString()
                      ? styles.selectedtextinput
                      : styles.textinput
                  }
                  value={item.option}
                  name="option"
                  onChange={(e) => handleOptionChange(index, e)}
                />
              ) : null}

              {radio === "image" || radio === "text&image" ? (
                <input
                  type="text"
                  placeholder="Image URL"
                  style={{
                    marginLeft:
                      radio === "image"
                        ? data.quizType === "poll"
                          ? 50
                          : 0
                        : 0,
                    flex: 1,
                    maxWidth: "50%",
                  }}
                  className={
                    questions[selectedQuestion].answer === index.toString()
                      ? styles.selectedtextinput
                      : styles.textinput
                  }
                  name="img"
                  value={item.img}
                  onChange={(e) => handleOptionChange(index, e)}
                />
              ) : null}
              {index > 1 && (
                <RiDeleteBin6Fill
                  onClick={() => deleteOption(index)}
                  color="#D60000"
                  size={20}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ))}
          <CButton
            title="Add option"
            onClick={addOption}
            padding="0.7rem"
            width="50%"
            style={{
              fontSize: "1rem",
              color: "#000",
              fontWeight: "bold",
              marginLeft: 50,
              marginTop: "1rem",
            }}
          />
        </div>

        {/* Timer */}
        {data.quizType === "q&a" ? (
          <div className={styles.timercontainer}>
            <p style={{ alignSelf: "center" }}>Timer</p>
            <CButton
              onClick={() => handleSelectTimer("off")}
              title="off"
              style={{
                backgroundColor: timer === "off" ? "#D60000" : "#fff",
                color: timer === "off" ? "#fff" : "#9F9F9F",
                fontWeight: "bold",
              }}
            />
            <CButton
              onClick={() => handleSelectTimer("5")}
              title="5 sec"
              style={{
                backgroundColor: timer === "5" ? "#D60000" : "#fff",
                color: timer === "5" ? "#fff" : "#9F9F9F",
              }}
            />
            <CButton
              onClick={() => handleSelectTimer("10")}
              title="10 sec"
              style={{
                backgroundColor: timer === "10" ? "#D60000" : "#fff",
                color: timer === "10" ? "#fff" : "#9F9F9F",
              }}
            />
          </div>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}
      </div>

      {/* 5th Layer */}
      <div className={styles.actionbtn}>
        <CButton
          onClick={handleCancelBtn}
          title="Cancel"
          padding="0.8rem"
          width={200}
        />
        <CButton
          onClick={edit ? callEditQuizApi : handleSubmit}
          padding="0.8rem"
          title={edit ? "Edit Quiz" : "Create Quiz"}
          width={200}
          selected
          loading={loading ? true : false}
        />
      </div>

      {/* Error layer */}
      <div style={{ margin: "1rem" }}>
        {errors?.map((item) => (
          <p className={styles.error}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default AddQuestionModal;
