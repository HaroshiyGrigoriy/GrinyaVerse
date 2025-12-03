import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SanychHome from "./pages/SanychPage";
import SanychLayout from "./pages/sanych/SanychLayout";

import MenuLayout from "./pages/sanych/MenuLayout";
import MenuIndex from "./pages/sanych/MenuIndex";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

        
       <Route path="/sanych" element={<SanychLayout />}>
        {/* Главная Саныча: hero + модули */}
        <Route index element={<SanychHome />} />

        {/* Модуль "Меню" */}
        <Route path="menu" element={<MenuLayout />}>
          {/* Главная внутри модуля меню: плитки разделов */}
          <Route index element={<MenuIndex />} />
          </Route>
          </Route>
    </Routes>
  );
}
