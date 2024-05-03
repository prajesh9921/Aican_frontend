import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginAndRegisterScreen from "./screen/Login&Register/login&register";
import Home from "./screen/Homepage/home";
import BookmarkPage from "./screen/Bookmark/bookmark";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoryPage from "./screen/Story/storyPage";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
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
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginAndRegisterScreen />} />
        <Route
          path="/bookmark"
          element={<ProtectedRoute Component={BookmarkPage} />}
        />
        <Route path="/story/:storyid" element={<StoryPage />} />
      </Routes>
    </>
  );
}

export default App;
