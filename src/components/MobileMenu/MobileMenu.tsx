import { Link } from "react-router";

import "./MobileMenu.scss";

type MobileMenuProps = {
  isOpen: boolean;
};

const menuLinks = [
  { label: "Главная", to: "/" },
  { label: "Моя история", to: "/about" },
  { label: "Оставить чаевые", to: "/tips" },
  { label: "Что я делаю", to: "/services" },
  { label: "Мои проекты", to: "/projects" },
];

export function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <nav
      className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
      aria-label="Мобильная навигация"
    >
      <ul className="mobile-menu__list">
        {menuLinks.map((link) => (
          <li className="mobile-menu__item" key={link.to}>
            <Link className="mobile-menu__link" to={link.to}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}