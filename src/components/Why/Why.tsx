import { useEffect, useRef } from "react";
import s from "./why.module.scss";

type Block = { text: string; accent?: boolean };

const blocks: Block[] = [
  { text: "Этот сайт для нас с вами.", accent: true },
  { text: "Мне хочется многое вам сказать и рассказать, познакомить с собой, дать понять вам насколько вы важны, насколько важна ваша благодарность и то, чем я могу быть вам ещё полезен." },
  { text: "Может, вам захочется просто поговорить. Может, вы хотите рассказать." },
  { text: "Этот сайт будет масштабироваться в приключенческое фэнтези, фантастику, с философией, наукой и историей. Ждите обновлений." },
  { text: "Вы даже не представляете, как ваша благодарность помогает жить нам, простым ребяткам." },
  { text: "Вы не должны и не обязаны, но каждый раз, когда вы это делаете, вы помогаете, вы спасаете, вы выливаете на себя тонну благодарностей и обсуждений о том, как вы помогли." }
];

export default function WhySection() {
  const ref = useRef<HTMLElement | null>(null);

  // Плавное появление по мере прокрутки
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(`.${s.stanza}`));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add(s.reveal);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((el, i) => {
      (el as HTMLElement).style.setProperty("--delay", `${i * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section id="why" ref={ref} className={s.wrap} aria-labelledby="why-title">
      <div className={s.aura} aria-hidden />
      <h2 id="why-title" className={s.title}>Зачем этот сайт?</h2>

      <div className={s.flow}>
        {blocks.map((b, i) => (
          <article
            key={i}
            className={`${s.stanza} ${i % 2 ? s.right : s.left} ${b.accent ? s.isAccent : ""}`}
          >
            {/* боковая лента-свет */}
            <span className={s.ribbon} aria-hidden />
            <p className={s.text}>{b.text}</p>
          </article>
        ))}
      </div>

      <div className={s.footerNote}>…а дальше? Увидимся в новых приключениях!</div>
    </section>
  );
}
