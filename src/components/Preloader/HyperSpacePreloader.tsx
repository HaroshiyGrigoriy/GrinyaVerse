import Preloader from "./Preloader";

export const HyperspacePreloader = ({ show,onFinish }: Props) => {
  return (
    <div className="preloader">
      <Starfield/>
      <ConsoleTyping/>
      <WarpFlash/>
    </div>
  );
};