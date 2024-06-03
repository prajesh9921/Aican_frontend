import React from "react";
import styles from "./analyticsPoll.module.css";
import moment from "moment";

const AnalyticsPoll = ({ data }) => {
    return (
        <div className={styles.container}>
            <div className={styles.titlediv}>
                <p className={styles.title}>{data?.quizName} Quiz Analysis</p>
                <div>
                    <p className={styles.subtext}>Created on : {moment(data?.createdAt).format("Do MMMM ,YYYY")}</p>
                    <p className={styles.subtext}>Impressions : {data?.impression}</p>
                </div>
            </div>

            <div className={styles.content}>
                {data?.questions?.map((item, index) => <QuizCard data={item} idx={index} />)}
            </div>
        </div>
    )
}

export default AnalyticsPoll;

const QuizCard = ({ data, idx }) => {
    return (
        <div className={styles.card}>
            <p className={styles.question}>Q.{idx+1} {data?.question} </p>
            <div className={styles.infodiv}>
                {data?.options?.map((item, index) => <div className={styles.infocard}>
                    <p>{item?.selectedInPoll}</p>
                    <p>Option {index+1}</p>
                </div>)}
            </div>
            <div className={styles.hr}></div>
        </div>
    )
}