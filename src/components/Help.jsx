// src/components/Help.jsx
export default function Help() {
  return (
    <section id="help" className="section reveal" aria-labelledby="help-title">
      <div className="container">
        <h2 id="help-title" className="section__title">
          Чем могу быть полезен
        </h2>
        <p className="section__desc">
          Направления, в которых я работаю и развиваюсь. Каждое — это путь к
          пониманию того, как строить системы, которые действительно помогают
          людям.
        </p>
        <div className="cards">
          <article className="card">
            <h3 className="card__title">Интерфейсы и фронтенд</h3>
            <p className="card__text">
              Проектирую и собираю понятные интерфейсы на React. Люблю живые
              детали: анимации, звёздные фоны, аккуратную типографику. Каждый
              пиксель на своём месте.
            </p>
          </article>
          <article className="card">
            <h3 className="card__title">Бэкенд и боты</h3>
            <p className="card__text">
              Java + Spring Boot, PostgreSQL, Telegram‑боты. Чистая архитектура,
              внимание к данным и сценариям. Системы, которые работают стабильно
              и предсказуемо.
            </p>
          </article>
          <article className="card">
            <h3 className="card__title">Консалтинг для сервиса</h3>
            <p className="card__text">
              Чек‑листы, процессы, обучение команды (пабы, кофейни, сервис).
              Перевожу хаос в систему. Опыт работы в сервисе помогает видеть
              реальные проблемы.
            </p>
          </article>
          <article className="card">
            <h3 className="card__title">Материалы и менторство</h3>
            <p className="card__text">
              Пишу понятные гайды, делаю учебные мини‑проекты и делюсь опытом
              пути. Знания должны быть доступными и применимыми.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
