"use client";

import { useState } from "react";
import Image from "next/image";

export function Avatar({
  name = "",
  src,
  className = "h-10 w-10 bg-surface",
  sizes = "50px",
}) {
  const [failedSource, setFailedSource] = useState(null);
  const source = typeof src === "string" ? src : src?.src;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = [parts[0], parts.length > 1 ? parts.at(-1) : null]
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`avatar relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-mono text-accent ${className}`}
      aria-hidden="true"
    >
      {source && failedSource !== source ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          unoptimized={/^https?:\/\//.test(source)}
          onError={() => setFailedSource(source)}
        />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </span>
  );
}
