import React from "react";
import styles from "./home.module.css";
import HomeCard from "../../components/homecard";
import { useNavigate } from "react-router-dom";
import {
  FcAddressBook,
  FcBusinessman,
  FcCalculator,
  FcBarChart,
  FcGraduationCap
} from "react-icons/fc";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = screen => {
    navigate(screen);
  };

  return (
    <div className={styles.container}>
      <div className="p-3 bg-[#E49BFF] h-[60px] w-full flex items-center">
        <p className="text-2xl">School Management DashBoarb</p>
      </div>

      <div className="flex gap-3 justify-between">
        <HomeCard
          title="Add Class"
          icon={<FcAddressBook size={30} />}
          onPress={() => handleNavigate("/classform")}
        />
        <HomeCard
          title="Add Student"
          icon={<FcGraduationCap size={30} />}
          onPress={() => handleNavigate("/studentform")}
        />
        <HomeCard
          title="Add Teacher"
          icon={<FcBusinessman size={30} />}
          onPress={() => handleNavigate("/teacherform")}
        />
        <HomeCard title="Class Analysis" icon={<FcBarChart size={30} />} />
        <HomeCard title="Expense Analysis" icon={<FcCalculator size={30} />} />
      </div>
    </div>
  );
};

export default Home;
