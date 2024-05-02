import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const LoginApi = async (email, password, setLoading, setError) => {
  try {
    setError({ isError: false, message: "" });
    setLoading(true);
    const url = `${baseUrl}/auth/login`;
    const response = await axios.post(url, { email, password });
    setLoading(false);
    return response.data;
  } catch (error) {
    setError({
      isError: true,
      message: error?.response?.data?.message,
    });
    setLoading(false);
    console.log("error in login", error?.response?.data);
    return error?.response?.data;
  }
};

const RegisterApi = async (email, password, setLoading, setError) => {
  try {
    setError({ isError: false, message: "" });
    setLoading(true);
    const url = `${baseUrl}/auth/register`;
    const response = await axios.post(url, { email, password });
    setLoading(false);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    setError({
      isError: true,
      message: error?.response?.data?.message,
    });
    setLoading(false);
    console.log("error in registering user", error?.response?.data);
  }
};

export { LoginApi, RegisterApi };
