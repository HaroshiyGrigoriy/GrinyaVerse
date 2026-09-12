import "./HomeSun.scss";

type HomeSunProps = {
  className?: string;
};

export function HomeSun({ className = "" }: HomeSunProps) {
  return (
    <div className={`home-sun ${className}`} aria-hidden="true">
      <svg
        className="home-sun__circle"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.28288 21.2531C14.668 22.4789 20.0272 19.1072 21.2531 13.7222C22.4789 8.33708 19.1072 2.97785 13.7222 1.75197C8.33708 0.5261 2.97784 3.8978 1.75197 9.28288C0.526095 14.668 3.8978 20.0272 9.28288 21.2531Z"
          stroke="#EA8A35"
          strokeOpacity="0.58"
          strokeWidth="3"
        />
      </svg>

      <svg className="home-sun__ray home-sun__ray--top" width="5" height="11" viewBox="0 0 5 11" fill="none">
        <path d="M3.27604 1.50034L1.50033 9.30077" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--bottom" width="5" height="11" viewBox="0 0 5 11" fill="none">
        <path d="M3.27604 1.50034L1.50033 9.30077" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--left" width="11" height="5" viewBox="0 0 11 5" fill="none">
        <path d="M1.50033 1.50034L9.30077 3.27605" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--right" width="11" height="5" viewBox="0 0 11 5" fill="none">
        <path d="M1.50033 1.50034L9.30077 3.27605" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--top-left" width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path d="M1.5002 1.5002L5.71751 8.2035" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--bottom-right" width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path d="M1.5002 1.5002L5.71751 8.20351" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--top-right" width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M8.2035 1.5002L1.5002 5.71751" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="home-sun__ray home-sun__ray--bottom-left" width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M8.2035 1.5002L1.5002 5.71751" stroke="#EA8A35" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}