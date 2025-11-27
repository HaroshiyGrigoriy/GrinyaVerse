// src/components/Support.jsx
export default function Support() {
  return (
    <section
      id="support"
      className="section reveal"
      aria-labelledby="sup-title"
    >
      <div className="container support">
        <h2 id="sup-title" className="section__title">
          Поддержать G‑Verse
        </h2>
        <p
          className="section__desc"
          style={{ maxWidth: "600px", margin: "0 auto 32px" }}
        >
          Если то, что я делаю, тебе откликается — можно подбросить топлива
          кораблю. Каждая поддержка помогает двигаться дальше и создавать больше
          полезного.
        </p>
        <a className="btn btn--primary" href="/thanks">
          Перейти к чаевым
        </a>
      </div>
    </section>
  );
}
