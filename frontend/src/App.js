import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Screens
import Landing from "./screens/Landing.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import NotFound from "./screens/NotFound.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
        </Helmet>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

