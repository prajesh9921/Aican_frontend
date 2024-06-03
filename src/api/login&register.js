import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const LoginApi = async (email, password, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/auth/login`;
    const response = await axios.post(url, { email, password });
    toast.success(response?.data?.message);
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    console.log("error in login", error?.response?.data);
    toast.error(error?.response?.data?.message);
    return error?.response?.data;
  }
};

const RegisterApi = async (name, email, password, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/auth/register`;
    const response = await axios.post(url, { name, email, password });
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    setLoading(false);
    toast.error(error?.response?.data?.message);
    console.log("error in registering user", error?.response?.data);
  }
};

export { LoginApi, RegisterApi };
