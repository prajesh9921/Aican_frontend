import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const AddClass = async (value, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/addClass`;
    const response = await axios.post(url, value);
    toast.success(response?.data?.message);
    setLoading(false);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error adding class", error?.response?.data);
    setLoading(false);
    return error?.response?.data;
  }
};

const AddTeacher = async (value, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/addTeacher`;
    const response = await axios.post(url, value);
    toast.success(response?.data?.message);
    setLoading(false);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error adding teacher", error?.response?.data);
    setLoading(false);
    return error?.response?.data;
  }
};

const AddStudent = async (value, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/addStudent`;
    const response = await axios.post(url, value);
    toast.success(response?.data?.message);
    setLoading(false);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("Error adding student", error?.response?.data);
    setLoading(false);
    return error?.response?.data;
  }
};

const GetAllTeachers = async (setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/getTeachers`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    console.log("Error getting teachers", error?.response?.data);
    setLoading(false);
  }
};

const GetAllClasses = async (setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/getClasses`;
    const response = await axios.get(url);
    setLoading(false);
    return response?.data;
  } catch (error) {
    console.log("Error getting classes", error?.response?.data);
    setLoading(false);
  }
};

export {
  AddClass,
  GetAllTeachers,
  GetAllClasses,
  AddTeacher,
  AddStudent
};
