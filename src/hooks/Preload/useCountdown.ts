import { useEffect,useState } from "react";

export function useCountdown(start: number,onFinish?:()=>void) {
  const[count,setCount] = useState(start);

  useEffect(() => {
    if (count <=0 ) {
      return;
    }

    const timer= setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish?.();
          return 0;
        }
        return prev -1;
      })
    },1000);
return () => clearInterval(timer);
  },[count,onFinish]
);
return count;
}