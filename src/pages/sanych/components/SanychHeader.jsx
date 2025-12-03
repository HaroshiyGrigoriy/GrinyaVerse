// src/pages/sanych/SanychHeader.jsx
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./SanychHeader.scss";

export default function SanychHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Закрывать моб.меню при переходе по роуту
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Тень при скролле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sanych-header" +
        (scrolled ? " is-scrolled" : "") +
        (open ? " is-open" : "")
      }
    >
      <div className="sanych-layout__container sanych-header__bar">
        {/* Бренд */}
        <Link to="/sanych" className="sanych-header__brand" aria-label="На главную Саныча">
          <div className="sanych-header__logo" aria-hidden>S</div>
          <div className="sanych-header__title">Кофейный центр Саныча</div>
        </Link>

        {/* Десктоп-навигация */}
        <nav className="sanych-header__nav" aria-label="Основная навигация">
          <NavLink
            to="/sanych"
            end
            className={({ isActive }) =>
              "sanych-header__link" + (isActive ? " is-active" : "")
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/sanych/menu"
            className={({ isActive }) =>
              "sanych-header__link" + (isActive ? " is-active" : "")
            }
          >
            Меню
          </NavLink>

          {/* Место для будущих модулей
          <NavLink to="/sanych/process" className={({isActive})=>"sanych-header__link"+(isActive?" is-active":"")}>Процессы</NavLink>
          */}
        </nav>

        {/* CTA справа (можно заменить на любой модуль) */}
        <Link to="/sanych/menu" className="sanych-header__cta">
          Открыть «Меню»
        </Link>

        {/* Бургер для мобилок */}
        <button
          type="button"
          className="sanych-header__burger"
          aria-label="Открыть меню"
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-lines" aria-hidden />
        </button>
      </div>

      {/* Мобильная панель */}
      <nav id="mobile-nav" className="sanych-header__mobile" aria-label="Мобильная навигация">
        <NavLink
          to="/sanych"
          end
          className={({ isActive }) =>
            "sanych-header__m-link" + (isActive ? " is-active" : "")
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/sanych/menu"
          className={({ isActive }) =>
            "sanych-header__m-link" + (isActive ? " is-active" : "")
          }
        >
          Меню
        </NavLink>
      </nav>
    </header>
  );
}
