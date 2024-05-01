import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const GetStoryByQuery = async (query, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/stories?category=${query}`;
    const response = await axios.get(url);
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    console.log("error in getting post data by query", error?.response?.data);
    return error?.response?.data;
  }
};

const GetYourStory = async (userid, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/yourstory/${userid}`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    setLoading(false);
    console.log("error in getting your stories", error?.response?.data);
    return error?.response?.data;
  }
};

const GetYourBookmarkedStory = async (userid, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/bmstories/${userid}`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    setLoading(false);
    console.log(
      "error in getting your bookedmarked stories",
      error?.response?.data
    );
    return error?.response?.data;
  }
};

const BookmarkStory = async (storyid, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/save/${storyid}`;
    const response = await axios.put(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    setLoading(false);
    console.log("error bookmarking story", error?.response?.data);
    return error?.response?.data;
  }
};

export { GetStoryByQuery, GetYourStory, GetYourBookmarkedStory, BookmarkStory };
