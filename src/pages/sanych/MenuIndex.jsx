// src/pages/sanych/menu/MenuIndex.jsx
import { Link } from "react-router-dom";
import "./MenuIndex.scss";

export default function MenuIndex() {
  return (
    <div className="menu-index">
      <p className="menu-index__intro">
        Выбери, с какого блока меню начать. Каждый раздел раскрывает
        структуру, рецептуры и логику цен.
      </p>

      <div className="menu-index__grid">
        {/* КОФЕЙНЫЕ НАПИТКИ */}
        <article className="menu-section-card">
          <h2 className="menu-section-card__title">Кофе</h2>
          <p className="menu-section-card__text">
            Эспрессо, американо, капучино, латте, раф, альтернативы.
            Группы напитков, объёмы, базовые рецептуры.
          </p>
          <Link
            to="/sanych/menu/coffee"
            className="menu-section-card__link"
          >
            Перейти в раздел
          </Link>
        </article>

        {/* НЕ КОФЕЙНЫЕ МОЛОЧНЫЕ */}
        <article className="menu-section-card">
          <h2 className="menu-section-card__title">
            Не кофейные молочные
          </h2>
          <p className="menu-section-card__text">
            Какао, горячий шоколад, детские напитки, молочные коктейли.
            Где делать акцент, как не расползтись.
          </p>
          <Link
            to="/sanych/menu/milk"
            className="menu-section-card__link"
          >
            Перейти в раздел
          </Link>
        </article>

        {/* ЧАЙ, МАТЧА */}
        <article className="menu-section-card">
          <h2 className="menu-section-card__title">Чай и матча</h2>
          <p className="menu-section-card__text">
            Базовые линейки чая, матча-латте, травяные и фруктовые
            сборы, логика выбора ассортимента.
          </p>
          <Link
            to="/sanych/menu/tea"
            className="menu-section-card__link"
          >
            Перейти в раздел
          </Link>
        </article>

        {/* ХОЛОДНЫЕ НАПИТКИ */}
        <article className="menu-section-card">
          <h2 className="menu-section-card__title">
            Холодные напитки
          </h2>
          <p className="menu-section-card__text">
            Айс-латте, айс-американо, лимонады, холодный кофе,
            свежевыжатые соки.
          </p>
          <Link
            to="/sanych/menu/cold"
            className="menu-section-card__link"
          >
            Перейти в раздел
          </Link>
        </article>

        {/* СЕБЕСТОИМОСТЬ И ОБЪЁМЫ */}
        <article className="menu-section-card">
          <h2 className="menu-section-card__title">
            Себестоимость и объёмы
          </h2>
          <p className="menu-section-card__text">
            Техкарты, граммовки, формулы расчёта, наценка, выбор
            объёмов по категориям.
          </p>
          <Link
            to="/sanych/menu/cost"
            className="menu-section-card__link"
          >
            Перейти в раздел
          </Link>
        </article>
      </div>
    </div>
  );
}
