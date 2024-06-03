import React from "react";
import styles from "./analyticsQuiz.module.css";
import moment from "moment";

const AnalyticsQuiz = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.titlediv}>
            <p className={styles.title}>{data.quizName} Question Analysis</p>

            <div>
                <p className={styles.subtext}>Created on : {moment(data?.createdAt).format("Do MMMM ,YYYY")}</p>
                <p className={styles.subtext}>Impressions : {data?.impression}</p>
            </div>
            </div>

            <div className={styles.content}>
                {data?.questions?.map((item, index) => <QuizCard data={item} idx={index}/>)}
            </div>
        </div>
    )
}

export default AnalyticsQuiz;

const QuizCard = ({data, idx}) => {
    return (
        <div className={styles.card}>
            <p className={styles.question}>Q.{idx+1} {data?.question} </p>
            <div className={styles.infodiv}>
                <div className={styles.infocard}>
                    <p>{data?.attempted}</p>
                    <p>people Attempted the question</p>
                </div>

                <div className={styles.infocard}>
                    <p>{data?.answerCorrected}</p>
                    <p>people Answered Correctly</p>
                </div>

                <div className={styles.infocard}>
                    <p>{data?.answerIncorrectly}</p>
                    <p>people Answered Incorrectly</p>
                </div>
            </div>
            <div className={styles.hr}></div>
        </div>
    )
}