import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import EyeIcon from "../../assets/eye.png";
import { GetHomePageData } from "../../api/quiz";
import { FormatCount } from "../../utils/formatCount";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard({ allData, setAllData, showModal }) {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const callGetHomePageData = async () => {
    const response = await GetHomePageData(userId, setLoading);
    setAllData(response);
  };

  useEffect(() => {
    if (userId) {
      callGetHomePageData();
    }
  }, [showModal === true]);

  const SkeletonLoader = () => {
    return (
      <div className={styles.skloader}>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Data Display Card */}
        <div className={styles.display}>
          {/* Quiz Created */}
          <div className={styles.displaycard}>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <p className={styles.quizcreated}>
                <span className={styles.count}>{allData?.quizCreated}</span>{" "}
                Quiz Created
              </p>
            )}
          </div>

          {/* Question Created */}
          <div className={styles.displaycard}>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <p className={styles.questioncreated}>
                <span className={styles.count}>
                  {FormatCount(allData?.questionsCreated)}
                </span>{" "}
                Questions Created
              </p>
            )}
          </div>

          {/* Total Impression */}
          <div className={styles.displaycard}>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <p className={styles.totalimpression}>
                <span className={styles.count}>
                  {FormatCount(allData?.totalImpressions)}
                </span>{" "}
                Total Impression
              </p>
            )}
          </div>
        </div>

        {/* Trending Quizes */}
        <div className={styles.trendingcontainer}>
          <h3 className={styles.trendingtitle}>Trending Quizes</h3>

          {loading ? (
            <div className={styles.trendingloader}>
              <CircularProgress />
            </div>
          ) : allData?.data.length !== 0 ? (
            <div className={styles.quizcontainer}>
              {allData?.data?.map((item) => (
                <div key={item?._id} className={styles.trendingcard}>
                  <p className={styles.trendingquizupper}>
                    <span className={styles.trendingquiztitle}>
                      {item?.quizName}
                    </span>
                    {item?.impression}{" "}
                    <img className={styles.eyeicon} src={EyeIcon} alt="eye" />
                  </p>
                  <p className={styles.trendingquizlower}>
                    Created on :{" "}
                    {moment(item?.createdAt).format("Do MMMM, YYYY")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.nodata}>
              <p>No quizes to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
