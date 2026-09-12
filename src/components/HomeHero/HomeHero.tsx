import "./HomeHero.scss";
import { HomeSun } from "../HomeSun/HomeSun";
import { HomeHeroButton } from "./HomeHeroButton";
import { HomeSticker } from "./HomeSticker/HomeSticker";

const heroButtons = [
  {
    label: "Моя история",
    to: "/about",
    variant: "history",
  },
  {
    label: "Поддержать путь",
    to: "/tips",
    variant: "tips",
  },
  {
    label: "Что я делаю",
    to: "/services",
    variant: "services",
  },
] as const;

export function HomeHero() {
  return (
    <div className="home-hero">
      <p className="home-hero__thanks">
        Спасибо, что заглянули
        <br />
        после встречи в пабе
      </p>

      <HomeSun className="home-hero__sun" />

      <span className="home-hero__star home-hero__star--one" aria-hidden="true">
        ✧
      </span>

      <span className="home-hero__star home-hero__star--two" aria-hidden="true">
        ✧
      </span>

      <span className="home-hero__star home-hero__star--three" aria-hidden="true">
        ✧
      </span>

      <div className="home-hero__title-box">
        <h1 className="home-hero__title">
          <span className="home-hero__title-line">Привет,</span>
          <span className="home-hero__title-line home-hero__title-line--second">
            я Гриша
          </span>
        </h1>
      </div>

      <div className="home-hero__description-box">
        <p className="home-hero__description">
          Работаю с людьми в зале, а вне смены создаю сайты, интерфейсы и
          Telegram-ботов.
        </p>
      </div>

      <div className="home-hero__lower">
        <div className="home-hero__actions">
          {heroButtons.map((button) => (
            <HomeHeroButton
              key={button.to}
              to={button.to}
              label={button.label}
              variant={button.variant}
            />
          ))}
        </div>

        <HomeSticker className="home-hero__sticker" />
      </div>
    </div>
  );
}