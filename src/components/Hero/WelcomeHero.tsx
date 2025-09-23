import s from "./hero.module.scss";

export default function WelcomeHero() {
  const goWhy = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#why");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={s.welcome} aria-label="Добро пожаловать">
      <div className={s.content}>
        <span className={s.badge}>Демо-запуск</span>

        <div className={s.avatarWrap}>
          <img className={s.avatar} src="/ya.jpg" alt="Гриша" loading="eager" />
        </div>

        <h1 className={s.title}>Добро пожаловать в&nbsp;мою маленькую цифровую вселенную</h1>
        <p className={s.subtitle}>Сегодня её первый день. Спасибо, что заглянули.</p>

        <div className={s.cta}>
          <a href="#why" className={s.btnPrimary} onClick={goWhy}>
            Зачем этот сайт?
          </a>
        </div>
      </div>
    </section>
  );
}
