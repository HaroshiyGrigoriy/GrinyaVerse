// src/pages/sanych/home/HeroSanych.jsx
import { Link } from "react-router-dom";
import "./HeroSanych.scss";

export default function HeroSanych() {
  return (
    <section className="sn-hero" role="region" aria-labelledby="sn-hero-title">
      <div className="sn-hero__grid sn-container">
        {/* Левая колонка: смысл и CTA */}
        <div className="sn-hero__main">
          <div className="sn-hero__eyebrow">стартовая площадка</div>
          <h1 id="sn-hero-title" className="sn-hero__title">
            Запускаем кофейню без хаоса
          </h1>

          <p className="sn-hero__lead">
            Здесь собраны модули, которые превращают бардак, связанный с открытием кофейни,
            в ясный план. Сейчас главный фокус на <strong>модуль «Меню»</strong>, в нём:
            структура напитков, рецептуры, объёмы, себестоимость и итоговые цены.
          </p>

          <ul className="sn-hero__points" aria-label="Что даёт модуль «Меню»">
            <li><span>Логика групп:</span> классика, авторские, чай/матча, холодные, молочные.</li>
            <li><span>Техкарты и объёмы:</span> единые граммовки, понятные порции, стабильный вкус.</li>
            <li><span>Экономика:</span> калькуляция ингредиентов, себестоимость, наценка и прайс.</li>
          </ul>

          <div className="sn-hero__cta">
            <Link to="/sanych/menu" className="sn-btn sn-btn--primary">Открыть модуль «Меню»</Link>
          </div>
        </div>

        {/* Правая колонка: смысловой «профайл» Меню */}
        <aside className="sn-hero__aside" aria-label="Краткий профайл модуля «Меню»">
          <article className="sn-hero-card">
            <div className="sn-hero-card__badge">главный модуль</div>
            <h2 className="sn-hero-card__title">Меню кофейни</h2>
            <p className="sn-hero-card__text">
              Это не просто список названий. Это осмысленное разбиение напитка на уровни:
            </p>
            <ol className="sn-hero-card__list">
              <li><strong>Смысловой слой напитка.</strong> Зачем он в меню и какую роль играет.</li>
              <li><strong>Главный компонент.</strong> Кофе/чай/молочная основа и её варианты.</li>
              <li><strong>Вариации.</strong> Авторские вкусы, сезонные версии, холодные формы.</li>
            </ol>
            <p className="sn-hero-card__text">
             Технологическая карта для каждого напитка, состав и точная калькуляция.
              Понимаем, как объёмы влияют на стоимость, и как продавать больше за счёт объёма.
            </p>
            <Link to="/sanych/menu" className="sn-hero-card__link">Перейти в модуль</Link>
          </article>
        </aside>
      </div>
    </section>
  );
}
