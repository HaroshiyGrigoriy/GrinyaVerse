import s from "./final.module.scss";

const TG_LINK = "https://t.me/grishiya"; // подставь свой @
         // если нужно — оставь/измени

export default function FinalSection() {
  return (
    <section id="final" className={s.wrap} aria-labelledby="final-title">
      <div className={s.aura} aria-hidden />

      <div className={s.card}>
        <h2 id="final-title" className={s.title}>
          Если вам нужны цифровые решения
        </h2>

        <p className={s.lead}>
          Автоматизации, Telegram-боты, маленькие и большие инструменты , можем поговорить об этом вместе.
          Я мечтаю заниматься большим делом и продолжать <span className={s.care}>ухаживать и заботиться</span> о людях -
          и в сервисе, и в коде.
        </p>

        <p className={s.place}>
          Приходите к нам в <strong>«Уильям и Кейт»</strong> - мы рады вас видеть.
        </p>

        <div className={s.actions}>
          <a className={s.btnPrimary} href={TG_LINK} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
