import FullCanvas from "./components/Canvas/FullCanvas";
import MilkyWayCanvas from "./components/Sky/StarCanvas";
import HeroOverlay from "./components/WelcomeHero";

export default function App() {
  return (
   <main>
{/* Фон */}
<div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -2 }}>
<FullCanvas/>
</div>


{/* Секция приветствия */}
<HeroOverlay />


{/* Следующий блок, чтобы было куда скроллить */}
<section id="why" style={{ minHeight: "120svh" }} />
</main>
  );
}