import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screen/Homepage/home";
import TeacherForm from "./screen/Form/teacherform";
import ClassForm from "./screen/Form/classform";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentForm from "./screen/Form/studentform";
import ClassAnalysis from "./screen/ClassAnalysis/classanalysis";
import ExpenseAnalysis from "./screen/ExpenseAnalysis/expenseAnalysis";

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
        <Route path="/" element={<Home/>} />
        <Route path="/classform" element={<ClassForm/>} />
        <Route path="/teacherform" element={<TeacherForm/>} />
        <Route path="/studentform" element={<StudentForm/>} />
        <Route path="/classanalysis" element={<ClassAnalysis/>} />
        <Route path="/expenseanalysis" element={<ExpenseAnalysis/>} />
      </Routes>
    </>
  );
}

export default App;
