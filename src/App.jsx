import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Index";
import ErrorPage from "./pages/ErrorPage/Index";
import './i18n';
import Login from "./pages/Login/Index";
import Register from "./pages/Register/Index";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
