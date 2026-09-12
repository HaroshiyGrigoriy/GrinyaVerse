import heroImage from "../assets/images/hero-page.webp"
import { HomeHero } from "../components/HomeHero/HomeHero"
import { HomePaperSection } from "../components/HomeBottom/HomePaperSection"
import  "./HomePage.scss"
export function HomePage(){
  return(
  <>
   <section className="home-page">
      <img  className="home-page__image" src={heroImage} alt="" />
      <HomeHero />
      <HomePaperSection/>
    </section>
  </>
  )
}