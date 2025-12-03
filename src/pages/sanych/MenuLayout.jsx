// src/pages/sanych/menu/MenuLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "./SanychLayout.scss"; // можно использовать те же токены
import "./MenuLayout.scss";

export default function MenuLayout() {
  return (
    <div className="menu-layout">
      <header className="menu-layout__header">
        <h1 className="menu-layout__title">Модуль «Меню кофейни»</h1>
        <p className="menu-layout__subtitle">
          Здесь мы разбираем структуру напитков, делим меню на группы,
          считаем себестоимость и формируем логичную карту напитков.
        </p>

        <nav className="menu-layout__nav">
          <NavLink
            to="/sanych/menu"
            end
            className="menu-layout__nav-link"
          >
            Обзор модулей меню
          </NavLink>
          {/* дальше:
          <NavLink to="/sanych/menu/coffee" className="menu-layout__nav-link">
            Кофе
          </NavLink>
          <NavLink to="/sanych/menu/tea" className="menu-layout__nav-link">
            Чай и матча
          </NavLink>
          и т.д.
          */}
        </nav>
      </header>

      <section className="menu-layout__content">
        <Outlet />
      </section>
    </div>
  );
}
