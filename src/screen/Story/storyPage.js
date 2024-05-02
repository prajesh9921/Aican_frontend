import React, { useEffect, useState } from "react";
import styles from "./storypage.module.css";
import StoryCard from "../../components/Story/storycard";
import { useParams } from "react-router-dom";
import { GetSharedStory } from "../../api/stories";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function StoryPage() {
    const { storyid } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const GetStory = async () => {
    const res = await GetSharedStory(storyid, setLoading);
    setData(res);
  };

  const GoBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    GetStory();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Oval visible={true} width={50} height={50} />
      ) : (
        <StoryCard data={data?.data} closeModal={GoBack} />
      )}
    </div>
  );
}
