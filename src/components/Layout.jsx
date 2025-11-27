// src/components/Layout.jsx
import useReveal from "../lib/useReveal";

export default function Layout({ children }) {
   useReveal();
  return (
    <div className="layout">
      {children}
    </div>
  );
}
