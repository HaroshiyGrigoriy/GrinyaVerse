// src/components/Hero.jsx
import { useEffect, useState } from "react";

const NAMES = [
  "Гриша",
  "Гриня",
  "Гриндяй",
  "Груша",
  "Гришаня",
  "Грихан",
  "Грифон",
  "Григорий",
];

function GNickTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % NAMES.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <span key={i} className="ticker__item">
      {NAMES[i]}
    </span>
  );
}

// Эффект печатной машинки - максимально быстрый
function Typewriter({ text, speed = 1, delay = 0, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay + currentIndex * speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete && currentIndex >= text.length) {
      setIsComplete(true);
      if (onComplete) {
        setTimeout(() => onComplete(), 1);
      }
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="typewriter-cursor">▊</span>}
    </span>
  );
}

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <section id="hero" className="hero section">
      <div className="hero__content">
        <h1 className="hero__title">
          <Typewriter
            text="G-Verse"
            speed={20}
            delay={0}
            onComplete={() => setShowSubtitle(true)}
          />
        </h1>

        {showSubtitle && (
          <p className="hero__subtitle">
            <Typewriter
              text="Добро пожаловать в мою цифровую вселенную"
              speed={0}
              delay={10}
              onComplete={() => setShowLead(true)}
            />
          </p>
        )}

        {showLead && (
          <p className="hero__lead">
            <Typewriter
              text="Здесь живут мои проекты, мысли и эксперименты — про технологии, людей и жизнь. Это место, где я учусь, создаю и делюсь тем, что может быть полезно другим."
              speed={0}
              delay={5}
              onComplete={() => setShowLine(true)}
            />
          </p>
        )}

        {showLine && (
          <div className="hero__line">
            <span className="hero__tag">
              G — <GNickTicker />
            </span>
            <span className="hero__sep"> • </span>
            <span className="hero__tag">Verse — куплет, вселенная истории</span>
          </div>
        )}

        {showLine && (
          <div className="hero__cta">
            <a
              href="#mapnav"
              className="btn btn--primary"
              onClick={() => setShowCTA(true)}
            >
              Войти в навигацию
            </a>
            <a
              href="#projects"
              className="btn"
              onClick={() => setShowCTA(true)}
            >
              Посмотреть проекты
            </a>
          </div>
        )}

        {showCTA && (
          <p className="hero__hint">
            Листай ниже — там карта, манифест и планеты G-Verse.
          </p>
        )}
      </div>
    </section>
  );
}
