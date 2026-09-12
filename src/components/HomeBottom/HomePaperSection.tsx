import paperTop from "../../assets/images/torn-paper-top.png";
import paperBody from "../../assets/images/paper-body.png";

import "./HomePaperSection.scss";

const paperCards = [
  {
    title: "Люблю сервис",
    text: "Официантство научило меня слышать людей, замечать детали и создавать атмосферу.",
    icon: "𐄂",
  },
  {
    title: "Создаю сайты",
    text: "Собираю страницы, интерфейсы и визуальные блоки под реальные задачи.",
    icon: "▣",
  },
  {
    title: "Делаю Telegram-ботов",
    text: "Продумываю сценарии, кнопки, роли и простую автоматизацию.",
    icon: "✈",
  },
  {
    title: "Открыт к задачам",
    text: "Могу помочь с сайтом, идеей, текстами, структурой или ботом.",
    icon: "♡",
  },
] as const;

export function HomePaperSection() {
  return (
    <section className="home-paper">
      <img
        className="home-paper__bg home-paper__bg--top"
        src={paperTop}
        alt=""
        aria-hidden="true"
      />

      <img
        className="home-paper__bg home-paper__bg--body"
        src={paperBody}
        alt=""
        aria-hidden="true"
      />

      <div className="home-paper__content">
        <h2 className="home-paper__title">
          Рад видеть вас
          <br />
          за пределами зала
        </h2>

        <p className="home-paper__description">
          Здесь можно узнать, чем я живу вне работы: почему люблю работу с
          людьми, какие проекты постепенно создаю своими руками и какие задачи
          беру в работу.
        </p>

        <div className="home-paper__cards">
          {paperCards.map((card) => (
            <article className="home-paper__card" key={card.title}>
              <div className="home-paper__card-label">{card.title}</div>

              <div className="home-paper__card-body">
                <span className="home-paper__card-icon" aria-hidden="true">
                  {card.icon}
                </span>

                <p className="home-paper__card-text">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}