import React, { useState } from "react";
import styles from "./login$registerStyle.module.css";
import Paper from "@mui/material/Paper";
import AuthButton from "../../components/Login&Register/AuthButton/authButton";
import { LoginApi, RegisterApi } from "../../api/login&register";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginAndRegister() {
  const [selectedBtn, setSelectedBtn] = useState("login");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError({
      ...error,
      [name]: false,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginValidate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      setError((prevErrors) => ({ ...prevErrors, email: true }));
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      setError((prevErrors) => ({ ...prevErrors, password: true }));
    }

    return newErrors;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Name is required";
      setError((prevErrors) => ({ ...prevErrors, username: true }));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      setError((prevErrors) => ({ ...prevErrors, email: true }));
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      setError((prevErrors) => ({ ...prevErrors, email: true }));
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      setError((prevErrors) => ({ ...prevErrors, password: true }));
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      setError((prevErrors) => ({ ...prevErrors, password: true }));
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      setError((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      setError((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
    }

    return newErrors;
  };

  const handleLogin = async () => {
    const res = await LoginApi(formData.email, formData.password, setLoading);
    if (res?.message === "user login successfull" && res?.loginStatus) {
      localStorage.setItem("token", res?.token);
      localStorage.setItem("userEmail", res?.userEmail);
      localStorage.setItem("userId", res?.userId);
      navigate("/home");
    }
  };

  const handleSignup = async () => {
    const res = await RegisterApi(formData.username, formData.email, formData.password, setLoading);
    if (res?.message === "User created successfully") {
      setSelectedBtn('login')
    }
  };

  const handleSubmit = (form) => {
    form.preventDefault();
    const validationErrors =
      selectedBtn === "login" ? loginValidate() : validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        ...validationErrors,
      }));
    } else {
      selectedBtn === 'login' ? handleLogin() : handleSignup();
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className={styles.container}>
      <Paper elevation={0} className={styles.content}>
        <p className={styles.appname}>QUIZZIE</p>

        {/* Auth Buttons */}
        <div className={styles.authButton}>
          <AuthButton
            title="Sign Up"
            type="signup"
            selected={selectedBtn}
            setSelected={setSelectedBtn}
          />
          <AuthButton
            title="Log In"
            type="login"
            selected={selectedBtn}
            setSelected={setSelectedBtn}
          />
        </div>

        <form className={styles.form} onSubmit={(form) => handleSubmit(form)}>
          {selectedBtn === "signup" && (
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                className={error.username ? styles.errorInput : styles.input}
                type="text"
                name="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
          <div className={styles.inputField}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={error.email ? styles.errorInput : styles.input}
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={error.password ? styles.errorInput : styles.input}
              type={error.password ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {selectedBtn === "signup" && (
            <div className={styles.inputField}>
              <label className={styles.label} htmlFor="confirmPassword">
                Conform Password
              </label>
              <input
                className={
                  error.confirmPassword ? styles.errorInput : styles.input
                }
                type={error.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter password again"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {loading ? (
              <CircularProgress size={20}/>
            ) : selectedBtn === "login" ? (
              "Log-In"
            ) : (
              "Sign-Up"
            )}
          </button>
        </form>
      </Paper>
    </div>
  );
}
