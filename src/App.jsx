import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SanychHome from "./pages/SanychPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Главная страница Саныча */}
      <Route path="/sanych" element={<SanychHome />} />

      {/* Пока нет других страниц — просто добавим заглушки */}
      <Route path="/sanych/modules" element={<div>Карта модулей</div>} />
      <Route path="/sanych/start" element={<div>Старт кофейни</div>} />
      <Route path="/sanych/checklists" element={<div>Чек-листы</div>} />
      <Route path="/sanych/documents" element={<div>Документы</div>} />
      <Route path="/sanych/calculator" element={<div>Калькуляторы</div>} />
      <Route path="/sanych/staff" element={<div>Персонал</div>} />

      {/* Пример глубины */}
      <Route path="/sanych/start/premises" element={<div>Premises</div>} />
      <Route path="/sanych/start/power" element={<div>Power</div>} />
      <Route path="/sanych/start/layout" element={<div>Layout</div>} />

      {/* И так далее — постепенно заменишь на настоящие компоненты */}
    </Routes>
  );
}
