import React, { useState } from "react";
import styles from "./login$registerStyle.module.css";
import CButton from "../../components/Button/button";
import { RxCrossCircled } from "react-icons/rx";
import Spacer from "../../components/Spacer/spacer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LoginApi, RegisterApi } from "../../api/login&register";
import { CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginAndRegisterScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const type = state?.type || "login";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const setFormValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle the login
  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError({ isError: true, message: "Require all fields" });
      return;
    }
    const res = await LoginApi(
      formData.username,
      formData.password,
      setLoading,
      setError
    );
    setFormData({ username: "", password: "" });
    if (res && res?.loginStatus && error.isError === false) {
      localStorage.setItem("token", res?.token);
      localStorage.setItem("userEmail", res?.userEmail);
      localStorage.setItem("userId", res?.userId);
      navigate("/home");
    } else {
      setError({
        isError: true,
        message: "Error in logging. Please try again later.",
      });
    }
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.password) {
      setError({ isError: true, message: "Require all fields" });
      return;
    }

    const res = await RegisterApi(
      formData.username,
      formData.password,
      setLoading,
      setError
    );

    if (res && res?.message === "User created successfully") {
      navigate("/login", { state: { type: "login" } });
    }

    setFormData({ username: "", password: "" });
  };

  return (
    <div className={styles.bgdiv}>
      <div className={styles.main}>
        {loading ? (
          <CircularProgress className={styles.spinner} />
        ) : (
          <div className={styles.container}>
            <RxCrossCircled
              size={24}
              onClick={() => navigate("/home")}
              className={styles.crossIcon}
            />
            <h3>{type === "login" ? "Login" : "Register"} to SwipTory</h3>
            <Spacer height="30px" />
            <div className={styles.inputContainer}>
              <label htmlFor="">Username</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="Enter username"
                  className={styles.inputfield}
                  name="username"
                  onChange={setFormValue}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="">Password </label>
              <div className={styles.inputBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={styles.inputfield}
                  name="password"
                  onChange={setFormValue}
                />
                {showPassword ? (
                  <FaRegEye
                    onClick={toggleShowPassword}
                    size={20}
                    className={styles.eye}
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={toggleShowPassword}
                    size={20}
                    className={styles.eye}
                  />
                )}
              </div>
            </div>

            <CButton
              title={type === "login" ? "Login" : "Register"}
              onClick={type === "login" ? handleLogin : handleRegister}
              style={{ marginTop: "10px" }}
            />

            <p className={styles.errorString}>
              {error.isError ? error.message : null}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
