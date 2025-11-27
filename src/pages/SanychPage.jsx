// src/pages/SanychPage.jsx
import { Outlet, NavLink } from "react-router-dom";
import styles from "./sanych/Layout.moduke.css";

export default function SanychPage() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerRow}>
            <div className={styles.brand}>Sanych • Кофейня</div>
            <nav className={styles.nav}>
              <NavLink to="/sanych" end>Главная</NavLink>
              <NavLink to="/sanych/start">Подготовка</NavLink>
              <NavLink to="/sanych/process">Процессы</NavLink>
              <NavLink to="/sanych/finance">Финансы</NavLink>
              <NavLink to="/sanych/docs">Документы</NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}><Outlet /></main>

      <footer className={styles.footer}>
        <div className="container">
          <small>Поддержка: Гриша • контакт внутри</small>
        </div>
      </footer>
    </div>
  );
}
