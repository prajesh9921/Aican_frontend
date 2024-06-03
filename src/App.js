import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screen/Homepage/home";
import LoginAndRegister from "./screen/Login&Register/login&register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./utils/protectedRoute";
import TakeQuiz from "./screen/TakeQuiz/takequiz";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route exact path="/" element={<LoginAndRegister />} />
        <Route path="/home" element={<ProtectedRoute Component={Home}/>} />
        <Route path="/auth" element={<LoginAndRegister/>} />
        <Route path="/quiz/:quizid" element={<TakeQuiz />} />
      </Routes>
    </>
  );
}

export default App;
