import { Link } from "react-router";

import notebookIcon from "../../assets/icons/notebook.svg";
import heartIcon from "../../assets/icons/button-heart.svg";
import keyboardIcon from "../../assets/icons/keyboard.svg";

import "./HomeHeroButton.scss";

type HomeHeroButtonVariant = "history" | "tips" | "services";

type HomeHeroButtonProps = {
  to: string;
  label: string;
  variant: HomeHeroButtonVariant;
};

const buttonIcons = {
  history: notebookIcon,
  tips: heartIcon,
  services: keyboardIcon,
} satisfies Record<HomeHeroButtonVariant, string>;

export function HomeHeroButton({ to, label, variant }: HomeHeroButtonProps) {
  return (
    <Link className={`home-hero-button home-hero-button--${variant}`} to={to}>
      <span className="home-hero-button__background" aria-hidden="true">
        <span className="home-hero-button__glow home-hero-button__glow--one" />
        <span className="home-hero-button__glow home-hero-button__glow--two" />
        <span className="home-hero-button__texture" />
      </span>

      <span className="home-hero-button__content">
        <img
          className="home-hero-button__icon"
          src={buttonIcons[variant]}
          alt=""
          aria-hidden="true"
        />

        <span className="home-hero-button__label">{label}</span>
      </span>
    </Link>
  );
}