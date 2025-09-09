import { useCountdown } from "../../hooks/Preload/useCountdown";
import styles from "./Preloader.module.scss";

export default function Preloader() {
  const count = useCountdown(5);
  return (
    <div className={styles.preloader}>
      <div className={styles.border}>
      <h1 className={styles.title}>Подготовка к перемещению в Grinyaverse</h1>
      <p className={styles.subtitle}>
        { count>0
          ?
        `Гиперпрыжок через: ${count}...`
        :"Гиперпрыжок активирован!"}
     </p>
     </div>
    </div>
  );
}