import "./Header.scss"
import logoImage from "../../assets/images/header_logo.png"
import { useState } from "react"
import { MobileMenu } from "../MobileMenu/MobileMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prevValue) => !prevValue);
  }
   return (<>
   <header className="header">
      <a className="header__logo-link" href="/" aria-label="На главную">
        <img className="header__logo-image" src={logoImage} alt="GV" />
      </a>
     <button className={`header__burger ${isMenuOpen ? "header__burger--open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span className="header__burger-line" />
        <span className="header__burger-line" />
        <span className="header__burger-line" />
      </button>
    </header>
    <MobileMenu isOpen={isMenuOpen} />
    </>
  )
}