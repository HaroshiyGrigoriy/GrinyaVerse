// src/pages/sanych/SanychLayout.jsx
import { Outlet } from "react-router-dom";
import "./SanychLayout.scss";
import SanychHeader from "./components/SanychHeader.jsx";
import SanychFooter from "./components/SanychFooter.jsx";

export default function SanychLayout() {
  return (
    <div className="sanych-scope">
      <div className="sanych-layout">
        <SanychHeader />
        <main className="sanych-layout__main">
          <div className="sanych-layout__container">
            <Outlet />
          </div>
        </main>
        <SanychFooter />
      </div>
    </div>
  );
}
