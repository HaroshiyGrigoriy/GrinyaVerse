// src/App.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SanychPage from "./pages/SanychPage";

export default function App() {
  return (
    <Routes>
      {/* Главная G-Verse */}
      <Route path="/" element={<HomePage />} />
      <Route path="/sanych" element={<SanychPage/ >}>
        <Route index element = {<SanychHome/>} />      
      </Route>
    </Routes>
  );
}
