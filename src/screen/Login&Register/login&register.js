import React, { useState } from "react";
import styles from "./login$registerStyle.module.css";
import CButton from "../../components/Button/button";
import { RxCrossCircled } from "react-icons/rx";
import Modal from "@mui/material/Modal";
import Spacer from "../../components/Spacer/spacer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LoginApi, RegisterApi } from "../../api/login&register";
import { CircularProgress } from "@mui/material";

export default function LoginAndRegisterScreen({
  showModal,
  type,
  closeModal,
}) {
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

  const LoginAndRegisterApi = async () => {
    if (!formData.username || !formData.password) {
      setError({ isError: true, message: "Require all fields" });
      return;
    }
    const res = await LoginApi(
      formData.username,
      formData.password,
      setLoading,
      setError,
      closeModal
    );
    setFormData({ username: "", password: "" });
    if (res && res?.loginStatus && error.isError === false) {
      localStorage.setItem("token", res?.token);
      localStorage.setItem("userEmail", res?.userEmail);
      localStorage.setItem("userId", res?.userId);
    } else {
      setError({ isError: true, message: "Error in logging. Please try again later." });
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={() => closeModal(false)}
      className={styles.modal}
    >
      {loading ? (
        <CircularProgress className={styles.spinner} />
      ) : (
        <div className={styles.container}>
          <RxCrossCircled
            size={24}
            onClick={() => closeModal(false)}
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
            onClick={LoginAndRegisterApi}
            style={{ marginTop: "10px" }}
          />

          <p className={styles.errorString}>
            {error.isError ? error.message : null}
          </p>
        </div>
      )}
    </Modal>
  );
}
