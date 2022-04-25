import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Upload } from "./pages/Upload";
import { LastFile } from "./pages/LastFile";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/upload" exact element={<Upload />} />
        <Route path="/lastfile" element={<LastFile />} />
        <Route path="*" element={<Navigate to="/upload" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" exact element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
