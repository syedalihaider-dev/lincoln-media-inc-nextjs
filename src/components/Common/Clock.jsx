"use client";
import { useEffect, useState } from "react";

// Live New York time; renders a placeholder on the server so hydration always matches
export default function Clock({ prefix = "NYC", className }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className={className}>{prefix} {t}</span>;
}
