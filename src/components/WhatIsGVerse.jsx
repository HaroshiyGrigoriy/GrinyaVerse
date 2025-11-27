// src/components/WhatIsGVerse.jsx
export default function WhatIsGVerse() {
  return (
    <section id="what" className="section reveal">
      <h2 className="section__title">Что такое G-Verse</h2>
      <p className="section__desc text-block">
        <b>G-Verse</b> — вселенная рассказов и взглядов Гриши. Здесь я —
        наблюдатель, решатель, ухаживатель, приниматель. И ещё: разработчик,
        который строит цифровые штуки с душой.
      </p>

      <details className="details">
        <summary className="details__summary">Расшифровать название</summary>
        <div className="details__body text-block">
          <p>
            <b>G значит:</b> Гриня, Гриша, Гриндяй, Груша, Гришаня, Грихан,
            Грифон, Григорий.
            <br />
            <b>Universe</b> — вселенная.
            <br />
            <b>Verse</b> — стих, куплет, часть истории.
            <br />
            <b>Итого:</b> G-Verse — большой куплет моей жизни, собранный в
            цифровую форму.
          </p>
        </div>
      </details>
    </section>
  );
}
