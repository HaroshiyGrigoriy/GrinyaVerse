import React from "react";
import s from "./WelcomeHero.module.scss";

export type HeroOverlayProps = {
  titleTop?: string;        // верхняя строка: "Это я"
  titleName?: string;       // имя крупно: "ГРИША"
  lead?: string;            // "Добро Пожаловать в мою цифровую вселенную"
  sublead?: string;         // "это мое места для творчества, и для свободы"
  ctaHref?: string;         // якорь вниз: "#start"
  ctaLabel?: string;        // "Давайте знакомиться"
  photoSrc?: string;        // путь к фото
  photoAlt?: string;        // alt
};

const HeroOverlay: React.FC<HeroOverlayProps> = ({
  titleTop = "Это я",
  titleName = "ГРИША",
  lead = "Добро Пожаловать в мою цифровую вселенную",
  sublead = "это мое места для творчества, и для свободы",
  ctaHref = "#start",
  ctaLabel = "Давайте знакомиться",
  photoSrc = "./ya.jpg",
  photoAlt = "Гриша",
}) => {
  return (
    <header className={s.hero} aria-label="Первый экран">
      {/* мягкая дымка над канвасом для контраста текста */}
      <div className={s.vignette} aria-hidden="true" />

      <div className={s.grid}>
        {/* Левая колонка: гигантский заголовок + тексты + CTA */}
        <div className={s.colText}>
          <h1 className={s.title} aria-label={`${titleTop} ${titleName}`}>
            <span className={s.top}>{titleTop}</span>
            <span className={s.name}>{titleName}</span>
          </h1>

          <p className={s.lead}>{lead}</p>
          <p className={s.sublead}>{sublead}</p>

          <a href={ctaHref} className={s.cta} aria-label={`${ctaLabel}, листай вниз`}>
            <span className={s.ctaText}>
              {ctaLabel}
              <span className={s.sep}> · </span>
              <span className={s.small}>листай вниз</span>
            </span>
            <svg viewBox="0 0 24 24" className={s.chevron} aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        {/* Правая колонка: фото */}
        {photoSrc && (
          <div className={s.colPhoto}>
            <div className={s.photoWrap}>
              <img className={s.photo} src={photoSrc} alt={photoAlt} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeroOverlay;
