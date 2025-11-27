// src/components/About.jsx
export default function About() {
  return (
    <section
      id="about"
      className="section reveal"
      aria-labelledby="about-title"
    >
      <div className="container grid grid--2">
        <div>
          <h2 id="about-title" className="section__title">
            Кто я в G‑Verse
          </h2>
          <p className="text-lg">
            Я исследователь и строитель цифровых миров: люблю науку и космос,
            учусь, программирую и превращаю идеи в вещи, которые помогают людям.
          </p>
          <p>
            Эта вселенная растёт вместе со мной — здесь честные эксперименты,
            заметки о пути и полезные артефакты: от компонентов интерфейса до
            ботов и чек‑листов.
          </p>
        </div>
        <div className="about__card">
          <ul className="about__facts">
            <li>Frontend: React, Vite, JSX/TSX, SCSS.</li>
            <li>Backend: Java, Spring Boot, PostgreSQL, Telegram API.</li>
            <li>Дизайн: космические интерфейсы, UX как маршрут.</li>
            <li>Цель: строить полезные системы и расти вместе с ними.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
