import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ViewStudentDetails from "./components/ViewStudentDetails";
import AuthPage from "./components/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/AuthApiSlice";

function App() {
  const userToken=useSelector((state:any)=>state?.auth?.token);
  const studentToken = JSON.parse(localStorage.getItem("students") || "{}");
  console.log("studentToken", studentToken.token);
  console.log("userToken", userToken);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to='/auth' replace />} />
          {userToken || studentToken ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/view/:id" element={<ViewStudentDetails />} />
              
            </>
          ) : <Route path="/" element={<Navigate to='/auth' replace />} />}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
