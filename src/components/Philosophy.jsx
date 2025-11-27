// src/components/Philosophy.jsx
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section section--dim reveal"
      aria-labelledby="ph-title"
    >
      <div className="container">
        <h2 id="ph-title" className="section__title">
          Взгляды и философия
        </h2>
        <blockquote className="quote">
          <p>
            Цифровая эпоха — не про бесконечные экраны, а про то, как сделать
            жизнь понятнее и человечнее. Полезность — главный критерий красоты.
            Каждый интерфейс должен быть маршрутом, а не лабиринтом.
          </p>
        </blockquote>
        <div style={{ marginTop: "24px" }}>
          <a className="btn" href="#" onClick={(e) => e.preventDefault()}>
            Читать глубже
          </a>
        </div>
      </div>
    </section>
  );
}
