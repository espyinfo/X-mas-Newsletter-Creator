"use client";

import React, { useEffect, useState } from "react";

/** Snowfall renders `count` tiny white circles that fall continuously. */
export const Snowfall = ({
  count = 80,
}: {
  /** Number of snowflakes */
  count?: number;
}) => {
  const [flakes, setFlakes] = useState<number[]>([]);

  // initialise array of indexes
  useEffect(() => {
    setFlakes(Array.from({ length: count }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((_, i) => {
        const size = Math.random() * 3 + 2; // 2‑5px
        const left = Math.random() * 100; // %
        const duration = Math.random() * 5 + 5; // 5‑10s
        const delay = Math.random() * 5; // 0‑5s
        const style: React.CSSProperties = {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animation: `fall ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          backgroundColor: "#fff",
          borderRadius: "50%",
        };
        return <div key={i} className="absolute" style={style} />;
      })}
    </div>
  );
};