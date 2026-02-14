"use client";
import { useEffect, useState } from "react";

export default function FloatingDots({ count = 50 }) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 6 + 3,
      color: ["bg-pink-200", "bg-blue-200", "bg-yellow-200", "bg-white"][
        Math.floor(Math.random() * 4)
      ],
    }));

    setDots(generated);
  }, [count]);

  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${dot.color}`}
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
        />
      ))}
    </>
  );
}
