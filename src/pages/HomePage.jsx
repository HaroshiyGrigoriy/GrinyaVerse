import Hero from "../components/Hero";
import MapNav from "../components/MapNav";
import About from "../components/About";
import Help from "../components/Help";
import Projects from "../components/Projects";
import Philosophy from "../components/Philosophy";
import Feedback from "../components/Feedback"; // проверь имя файла!
import Support from "../components/Support";
import Footer from "../components/Footer";
import Starfield from "../components/Starfield";
import Layout from "../components/Layout";
import WhatIsGVerse from "../components/WhatIsGVerse";
import "../styles/tokens.scss";
import "../styles/base.scss";
import "../styles/layout.scss";
import "../styles/components.scss";

export default function HomePage(){
  return (
    <div className="app-root">
      {/* космос */}
      <Starfield/>

      {/* ОДИН главный контейнер */}
        <Hero />
        <Layout>
        <WhatIsGVerse />   {/* ← твой манифест тут */}
        <MapNav />         {/* id="mapnav" чтобы прыгать из Hero */}
        <About />
        <Help />
        <Projects />
        <Philosophy />
        <Feedback />
        <Support />
      </Layout>

      <Footer />
    </div>
  );
}