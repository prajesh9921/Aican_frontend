import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API;
const token = localStorage.getItem('token');

const AddQuiz = async (value, setLoading, setQuizId) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/quiz/addquiz`;
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.post(url, value);
    setQuizId(response?.data?.quizId);
    toast.success(response?.data?.message);
    setLoading(false);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error fetching quizes", error?.response?.data);
    setLoading(false);
    return error?.response?.data;
  }
}

const GetQuizById = async (quizId, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/quiz/quizbyid/${quizId}`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    console.log("Error getting quiz", error?.response?.data);
    setLoading(false);
  }
}

const GetHomePageData = async (userId, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/quiz/gethomepagedata/${userId}`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    console.log("Error getting home page data", error?.response?.data);
    setLoading(false);
  }
}

const UpdateImpression = async (quizId) => {
  try {
    const url = `${baseUrl}/quiz/impression/${quizId}`;
    await axios.put(url);
  } catch (error) {
    console.log("error updating impression story", error?.response?.data);
  }
};

const SubmitQuizApi = async (quizId, val) => {
  try {
    const url = `${baseUrl}/quiz/quizsubmit/${quizId}`;
    await axios.put(url, { increments: val });
  } catch (error) {
    console.log("error submiting quiz", error?.response?.data);
  }
};

const SubmitPollQuizApi = async (quizId, val) => {
  try {
    const url = `${baseUrl}/quiz/pollsubmit/${quizId}`;
    await axios.put(url, { selected: val });
  } catch (error) {
    console.log("error submiting poll", error?.response?.data);
  }
};

const EditQuizApi = async (quizId, questions, timer, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/quiz/editQuiz`;
    const response = await axios.put(url, { quizId: quizId, questions: questions, timer: timer });
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data
  } catch (error) {
    setLoading(false);
    console.log("error editing quiz", error?.response?.data);
  }
};

const DeleteQuizApi = async (quizId, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/quiz/deleteQuiz/${quizId}`;
    const response = await axios.delete(url);
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data
  } catch (error) {
    setLoading(false);
    console.log("error deleting quiz", error?.response?.data);
  }
};

export { AddQuiz, GetQuizById, UpdateImpression, SubmitQuizApi, SubmitPollQuizApi, GetHomePageData, EditQuizApi, DeleteQuizApi };
