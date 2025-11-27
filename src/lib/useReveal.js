import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("reveal--visible");
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
