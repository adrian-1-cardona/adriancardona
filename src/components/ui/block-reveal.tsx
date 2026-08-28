import { useEffect, useRef, useState } from "react";

interface BlockRevealProps {
  children: string;
  className?: string;
  /** Delay offset in ms before this item starts (for staggering, default 0) */
  delay?: number;
  /** Duration of the wipe in ms (default 420) */
  duration?: number;
}

/**
 * Renders a single word/tag that begins as a solid filled block and wipes
 * left-to-right to reveal the text underneath as it enters the viewport.
 */
export function BlockReveal({
  children,
  className = "",
  delay = 0,
  duration = 420,
}: BlockRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"hidden" | "wiping" | "done">("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setTimeout(() => {
            setPhase("wiping");
            setTimeout(() => setPhase("done"), duration + 60);
          }, delay);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration]);

  const durationSec = `${duration}ms`;

  return (
    <span
      ref={ref}
      className={`block-reveal-root${className ? ` ${className}` : ""}`}
      aria-label={children}
      style={{ display: "inline-block", position: "relative", overflow: "hidden" }}
    >
      {/* The text — visible from the start but clipped by the overlay */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          opacity: phase === "hidden" ? 0 : 1,
          transition: phase === "hidden" ? "none" : `opacity 0ms`,
        }}
      >
        {children}
      </span>

      {/* The blocking overlay that slides away to the right */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--ink)",
          transformOrigin: "left center",
          transform:
            phase === "hidden"
              ? "scaleX(1)"
              : phase === "wiping"
              ? "scaleX(0)"
              : "scaleX(0)",
          transition:
            phase === "wiping"
              ? `transform ${durationSec} cubic-bezier(0.76, 0, 0.24, 1)`
              : "none",
        }}
      />
    </span>
  );
}
