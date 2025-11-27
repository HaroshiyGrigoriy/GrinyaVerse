// src/components/Feedback.jsx
export default function Feedback() {
  return (
    <section id="feedback" className="section reveal" aria-labelledby="fb-title">
      <div className="container grid grid--2">
        <div>
          <h2 id="fb-title" className="section__title">Общение</h2>
          <p className="text-lg">
            Поделись, что тебе интересно. Какие темы раскрыть в первую очередь?
            Что хочешь построить вместе?
          </p>
          <ul className="bullets">
            <li>Идеи для совместных мини‑проектов</li>
            <li>Вопросы по фронтенду/бэкенду</li>
            <li>Опыт сервиса и чек‑листы</li>
            <li>Философия разработки и дизайна</li>
          </ul>
        </div>
        <div className="contact">
          <a className="btn btn--primary btn--wide" href="#" onClick={(e) => e.preventDefault()}>
            Написать сообщение
          </a>
          <a className="btn btn--ghost btn--wide" href="#" onClick={(e) => e.preventDefault()}>
            Телеграм
          </a>
        </div>
      </div>
    </section>
  );
}
