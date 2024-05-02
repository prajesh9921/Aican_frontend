import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API;
const userID = localStorage.getItem("userId");
const token = localStorage.getItem('token');

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
    const url = `${baseUrl}/story/save/${storyid}/${userID}`;
    const response = await axios.put(url);
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    setLoading(false);
    toast.error(error?.response?.data?.message);
    console.log("error bookmarking story", error?.response?.data);
    return error?.response?.data;
  }
};

const LikeStory = async (storyid, setLoading) => {
  try {
    const url = `${baseUrl}/story/storylike/${storyid}/${userID}`;
    const response = await axios.put(url);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Cannot like story", error?.response?.data);
    return error?.response?.data;
  }
};

const AddStory = async (setLoading, value) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/add`;
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.post(url, value);
    toast.success(response?.data?.message);
    setLoading(false);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error adding story", error?.response?.data);
    setLoading(false);
    return error?.response?.data;
  }
}

const GetSharedStory = async (storyid, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/story/${storyid}`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    setLoading(false);
    console.log(
      "error in getting shared story",
      error?.response?.data
    );
    return toast.error(error?.response?.data?.message);
  }
};

const UpdateStory = async (storyid, setLoading, value) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/story/editstory/${storyid}`;
    const response = await axios.put(url, value);
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    setLoading(false);
    console.log("error bookmarking story", error?.response?.data);
    return toast.error(error?.response?.data?.message);
  }
};
export { GetStoryByQuery, GetYourStory, GetYourBookmarkedStory, BookmarkStory, LikeStory, AddStory, GetSharedStory, UpdateStory };
