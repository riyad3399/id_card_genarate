// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Institutions from "./pages/Institutions";
import GenerateIdCard from "./pages/GenerateIdCard";
import ShowAllIdCard from "./components/idCardForm/ShowAllIdCard";
import ShowIdCardBack from "./components/idCardForm/ShowIdCardBack";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="px-8">
          <Navbar />
          <Home />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/generate-id-card" element={<GenerateIdCard />} />
          <Route path="/show-all-id-card" element={<ShowAllIdCard />} />
          <Route path="/show-id-card-back" element={<ShowIdCardBack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
