import stickerImage from "../../../assets/images/sticker-note.png";
import heart from "../../../assets/icons/heart.svg";
import lineOne from "../../../assets/icons/Vector 2.svg";
import lineTwo from "../../../assets/icons/Vector 3.svg";

import "./HomeSticker.scss";

type HomeStickerProps = {
  className?: string;
};
export function HomeSticker({ className= ""}: HomeStickerProps){
  return(
<div className={`home-sticker ${className}`}>
  <img className="home-sticker__image" src={stickerImage} alt="" />

  <div className="home-sticker__content">
    <p className="home-sticker__text">
      Чаевые помогают жить,
      <br />
      развиваться
      <br />
      и делать новые проекты
    </p>

    <div className="home-sticker__bottom">
      <img className="home-sticker__heart" src={heart} alt="" />
          <img
            className="home-sticker__line home-sticker__line--one"
            src={lineOne}
            alt=""
          />

          <img
            className="home-sticker__line home-sticker__line--two"
            src={lineTwo}
            alt=""
          />
    </div>
  </div>
</div>
  )
}