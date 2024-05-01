import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const LoginApi = async (email, password, setLoading, setError, closeModal) => {
  try {
    setError({ isError: false, message: "" });
    setLoading(true);
    const url = `${baseUrl}/auth/login`;
    const response = await axios.post(url, { email, password });
    setLoading(false);
    closeModal(false);
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

const RegisterApi = async (data, setLoading) => {
  console.log("register api called");
};

export { LoginApi, RegisterApi };
