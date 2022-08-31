import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import ViewStudentDetails from "./components/ViewStudentDetails";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/view/:id" element={<ViewStudentDetails/>} />
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
