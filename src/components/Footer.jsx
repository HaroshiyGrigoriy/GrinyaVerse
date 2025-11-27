export default function Footer() {
  return (
    <footer className="footer">
      <div className="page footer__inner">
        <div>© {new Date().getFullYear()} G‑Verse</div>
        <nav className="footer__nav" aria-label="Нижняя навигация">
          <a href="#map">Карта</a>
          <a href="#projects">Проекты</a>
          <a href="#feedback">Общение</a>
        </nav>
      </div>
    </footer>
  );
}
