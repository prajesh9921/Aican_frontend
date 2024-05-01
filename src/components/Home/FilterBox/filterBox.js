import React from "react";
import styles from "./filterbox.module.css";
import { FilterData } from "../../../utils/filterData";

export default function FilterBox({ setCategoryData }) {
  
  const url = "https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFsbCUyMHN0dWZmfGVufDB8fDB8fHww";
  
  const handleCategorySet = (data) => {
    setCategoryData(arr => {
      if (arr.length < 6) {
       return [...arr, data];
      } else {
        return [data];
      }
    });
  };

  const handleAll = () => {
    setCategoryData(FilterData);
  }

  return (
    <div className={styles.container}>

      <div
        onClick={handleAll}
        className={styles.filterbox}
        style={{ backgroundImage: `url(${url})` }}
      >
        <h4 className={styles.label}>All</h4>
      </div>

      {FilterData.map((item, index) => {
        return (
          <div
            onClick={() => handleCategorySet(item)}
            className={styles.filterbox}
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <h4 className={styles.label}>{item.label}</h4>
          </div>
        );
      })}
    </div>
  );
}
