// src/components/Projects.jsx
export default function Projects() {
  return (
    <section
      id="projects"
      className="section reveal"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <h2 id="projects-title" className="section__title">
          Созвездие проектов
        </h2>
        <p className="section__desc">
          Текущая «главная звезда» и спутники G‑Verse. Каждый проект — это
          эксперимент, урок и шаг вперёд в понимании того, как строить полезные
          цифровые системы.
        </p>
        <div className="projects">
          <article className="project project--featured">
            <div className="project__badge">Главная звезда</div>
            <h3 className="project__title">Академия паба «William & Kate»</h3>
            <p className="project__text">
              Многостраничный фронтенд + Telegram‑бот для персонала: роли,
              смены, чек‑листы, обучение. Цель — понятная система работы,
              которая помогает команде быть эффективнее.
            </p>
            <div className="project__actions">
              <a
                className="btn btn--primary"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Демо/макет
              </a>
              <a className="btn" href="#" onClick={(e) => e.preventDefault()}>
                Заметки
              </a>
            </div>
          </article>

          <article className="project">
            <h3 className="project__title">GrinyaVerse Starfield</h3>
            <p className="project__text">
              Лёгкая библиотека космических фонов и эффектов для сайтов: звёзды,
              мерцание, гиперпрыжок. Открытый код для тех, кто любит космос в
              интерфейсах.
            </p>
          </article>

          <article className="project">
            <h3 className="project__title">Ароматный дневник</h3>
            <p className="project__text">
              Личный трекер ароматов и вкусов с заметками, ассоциациями и
              рекомендациями. Проект про внимание к деталям и память о моментах.
            </p>
          </article>

          <article className="project">
            <h3 className="project__title">Digital Tip Card</h3>
            <p className="project__text">
              Цифровая визитка с чаевыми и историей: бренд «G‑Verse» в офлайне.
              Мост между цифровым и реальным миром.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
