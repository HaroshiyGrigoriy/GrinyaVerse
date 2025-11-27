import { useEffect, useState } from "react";

export default function useLocalProgress(key) {
  const [map, setMap] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setMap(JSON.parse(raw));
    } catch {}
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(map));
    } catch {}
  }, [key, map]);

  function toggle(id) {
    setMap(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return [map, toggle];
}
