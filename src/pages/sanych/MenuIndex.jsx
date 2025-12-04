// src/pages/sanych/menu/MenuIndex.jsx
import { Link } from "react-router-dom";
import { COFFEE_BASICS } from "./data/coffeeBasics";
import "./MenuIndex.scss";

export default function MenuIndex() {
  return (
    <div className="menu-index">
      {/* Приветственный блок */}
      <section className="menu-welcome sn-container" aria-labelledby="menu-welcome-title">
        <h1 id="menu-welcome-title" className="menu-welcome__title">
          Добро пожаловать в модуль «Меню»
        </h1>
        <p className="menu-welcome__lead">
          Здесь соберём структуру напитков, зададим объёмы, оформим техкарты и посчитаем цены.
          Пока раздел в работе — ниже быстрый ориентир по основным кофейным напиткам:
          названия, объёмы и базовый состав.
        </p>
        <div className="menu-welcome__cta">
          <Link className="sn-btn sn-btn--primary" to="/sanych/menu/structure">
            Начать со структуры
          </Link>
          <a className="sn-btn" href="#coffee-basics">Смотреть кофейные напитки</a>
        </div>
      </section>

      {/* Обзор секций (как было) */}
      <section className="menu-index__cards sn-container">
        <p className="menu-index__intro">
          Выбери, с какого блока меню начать. Каждый раздел раскрывает структуру, рецептуры и логику цен.
        </p>

        <div className="menu-index__grid">
          <article className="menu-section-card">
            <h2 className="menu-section-card__title">Кофе</h2>
            <p className="menu-section-card__text">
              Эспрессо, американо, капучино, латте, раф, альтернативы. Группы напитков, объёмы, базовые рецептуры.
            </p>
            <Link to="/sanych/menu/coffee" className="menu-section-card__link">Перейти в раздел</Link>
          </article>

          <article className="menu-section-card">
            <h2 className="menu-section-card__title">Не кофейные молочные</h2>
            <p className="menu-section-card__text">
              Какао, горячий шоколад, детские напитки, молочные коктейли. Где делать акцент, как не расползтись.
            </p>
            <Link to="/sanych/menu/milk" className="menu-section-card__link">Перейти в раздел</Link>
          </article>

          <article className="menu-section-card">
            <h2 className="menu-section-card__title">Чай и матча</h2>
            <p className="menu-section-card__text">
              Базовые линейки чая, матча-латте, травяные и фруктовые сборы, логика выбора ассортимента.
            </p>
            <Link to="/sanych/menu/tea" className="menu-section-card__link">Перейти в раздел</Link>
          </article>

          <article className="menu-section-card">
            <h2 className="menu-section-card__title">Холодные напитки</h2>
            <p className="menu-section-card__text">
              Айс-латте, айс-американо, лимонады, холодный кофе, свежевыжатые соки.
            </p>
            <Link to="/sanych/menu/cold" className="menu-section-card__link">Перейти в раздел</Link>
          </article>

          <article className="menu-section-card">
            <h2 className="menu-section-card__title">Себестоимость и объёмы</h2>
            <p className="menu-section-card__text">
              Техкарты, граммовки, формулы расчёта, наценка, выбор объёмов по категориям.
            </p>
            <Link to="/sanych/menu/cost" className="menu-section-card__link">Перейти в раздел</Link>
          </article>
        </div>
      </section>

      {/* Быстрый ориентир по кофе */}
      <section id="coffee-basics" className="menu-coffee-basics sn-container" aria-labelledby="coffee-basics-title">
        <h2 id="coffee-basics-title" className="menu-coffee-basics__title">
          Основные кофейные напитки: объёмы и состав
        </h2>

        <ul className="coffee-list" role="list">
          {COFFEE_BASICS.map((d) => (
            <li key={d.id} className="coffee-item">
              <div className="coffee-item__head">
                <h3 className="coffee-item__title">{d.title}</h3>
                <div className="coffee-item__volumes">
                  {d.volumes.map((v) => (
                    <span key={v} className="chip">{v} мл</span>
                  ))}
                </div>
              </div>
              <p className="coffee-item__comp">{d.composition}</p>
            </li>
          ))}
        </ul>

        <div className="menu-coffee-basics__cta">
          <Link className="sn-btn" to="/sanych/menu/recipes">Перейти к техкартам</Link>
          <Link className="sn-btn sn-btn--primary" to="/sanych/menu/pricing">Перейти к ценам</Link>
        </div>
      </section>
    </div>
  );
}
