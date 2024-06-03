import React, { useState } from "react";
import styles from "./analytics.module.css";
import AnalyticsMain from "../../components/Analytics/AnalyticsMain/analyticsMain";
import AnalyticsQuiz from "../../components/Analytics/AnalyticsQuiz/analyticsQuiz";
import AnalyticsPoll from "../../components/Analytics/AnalyticsPoll/analyticsPoll";

export default function Analytics({ allData, setSelectedPage }) {
  const [screenSelected, setScreenSelected] = useState("main");
  const [selectedQuiz, setSelectedQuiz] = useState();

  return (
    <div className={styles.container}>
      {screenSelected === "main" && (
        <AnalyticsMain
          setSelectedPage={setSelectedPage}
          setSelectedQuiz={setSelectedQuiz}
          data={allData}
          changePage={setScreenSelected}
        />
      )}
      {screenSelected === "q&a" && (
        <AnalyticsQuiz data={allData[selectedQuiz]} />
      )}
      {screenSelected === "poll" && (
        <AnalyticsPoll data={allData[selectedQuiz]} />
      )}
    </div>
  );
}
