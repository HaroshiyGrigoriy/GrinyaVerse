// src/components/MapNav.jsx
export default function MapNav() {
  const planets = [
    {
      id: "about",
      name: "Я",
      icon: "✦",
      color: "#00ffff",
      size: "large",
      y: 40,
    },
    {
      id: "help",
      name: "Чем могу быть полезен",
      icon: "◉",
      color: "#ff6bff",
      size: "medium",
      y: 70,
    },
    {
      id: "projects",
      name: "Проекты",
      icon: "◉",
      color: "#80ff80",
      size: "large",
      y: 30,
    },
    {
      id: "philosophy",
      name: "Философия",
      icon: "◉",
      color: "#ffaa00",
      size: "medium",
      y: 75,
    },
    {
      id: "feedback",
      name: "Диалог",
      icon: "◉",
      color: "#00aaff",
      size: "medium",
      y: 35,
    },
    {
      id: "support",
      name: "Поддержка",
      icon: "◉",
      color: "#ff00ff",
      size: "small",
      y: 65,
    },
  ];

  // Рассчитываем точные координаты для пути через центры планет
  const getPlanetCoords = (index) => {
    const x = (index / (planets.length - 1)) * 900 + 50; // от 50 до 950
    const y = planets[index].y; // высота в процентах
    return { x, y };
  };

  // Создаём путь точно через центры планет
  const coords = planets.map((_, i) => getPlanetCoords(i));
  let pathD = `M ${coords[0].x} ${coords[0].y}`;

  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const midX = (prev.x + curr.x) / 2;
    // Плавная кривая через среднюю точку
    pathD += ` Q ${midX} ${prev.y}, ${curr.x} ${curr.y}`;
  }

  return (
    <section id="mapnav" className="section reveal">
      <h2 className="section__title">Карта G-Verse</h2>
      <p className="section__desc">
        Навигация по планетам вселенной. Выбери направление.
      </p>
      <div className="star-path">
        <svg
          className="star-path__line"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.7" />
              <stop offset="25%" stopColor="#ff6bff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#80ff80" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#ffaa00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00aaff" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Пунктирная линия пути - точно через планеты */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="25 15"
            strokeLinecap="round"
            className="star-path__dash"
            filter="url(#glow)"
          />

          {/* Свечение пути */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeDasharray="25 15"
            strokeLinecap="round"
            className="star-path__glow"
            opacity="0.3"
            filter="url(#strongGlow)"
          />

          {/* Анимированная точка */}
          <circle
            r="6"
            fill="#00ffff"
            className="star-path__dot"
            filter="url(#strongGlow)"
          >
            <animateMotion dur="14s" repeatCount="indefinite">
              <mpath href="#starPath" />
            </animateMotion>
            <animate
              attributeName="r"
              values="5;7;5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          <path
            id="starPath"
            d={pathD}
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
        </svg>

        <div className="star-path__planets">
          {planets.map((planet, index) => {
            const xPercent = (index / (planets.length - 1)) * 100;
            return (
              <a
                key={planet.id}
                href={`#${planet.id}`}
                className={`star-path__planet star-path__planet--${planet.size}`}
                style={{
                  "--planet-color": planet.color,
                  left: `${xPercent}%`,
                  top: `${planet.y}%`,
                }}
              >
                <div className="star-path__planet-core">
                  <div className="star-path__planet-sphere"></div>
                  <div className="star-path__planet-highlight"></div>
                  <span className="star-path__planet-icon">{planet.icon}</span>
                  <div className="star-path__planet-aura"></div>
                </div>
                <span className="star-path__planet-name">{planet.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
