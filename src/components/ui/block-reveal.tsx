import { useEffect, useRef, useState } from "react";

interface BlockRevealProps {
  children: string;
  className?: string;
  /** Stagger offset in ms — shifts when this item's wipe begins relative to others */
  delay?: number;
  /** Not used for timing anymore; kept for API compatibility */
  duration?: number;
}

/**
 * Scroll-driven block reveal.
 *
 * The overlay wipes left-to-right as the element travels from the bottom
 * edge of the viewport to ~40% up the screen. Progress is computed every
 * animation frame so the wipe tracks scroll velocity perfectly on every
 * screen size — no fixed durations, no IntersectionObserver snap.
 *
 * Reduced-motion: skips straight to revealed state.
 */
export function BlockReveal({
  children,
  className = "",
  delay = 0,
}: BlockRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // progress: 0 = fully covered, 1 = fully revealed
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const delayPassedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const computeProgress = (): number => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start wipe when bottom of element crosses viewport bottom (entry = 0)
      // Finish wipe when element's vertical centre reaches 40% from top (exit = 1)
      const entry = vh - rect.top;          // positive once element enters from bottom
      const range = vh * 0.6;              // wipe completes over 60% of viewport height
      return Math.min(Math.max(entry / range, 0), 1);
    };

    const tick = (time: number) => {
      if (!delayPassedRef.current) {
        if (startTimeRef.current === null) startTimeRef.current = time;
        if (time - startTimeRef.current < delay) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        delayPassedRef.current = true;
      }

      const p = computeProgress();
      setProgress(p);

      // Keep ticking until fully revealed
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const scheduleFrame = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Kick off on scroll and on resize
    window.addEventListener("scroll", scheduleFrame, { passive: true });
    window.addEventListener("resize", scheduleFrame, { passive: true });

    // Fire immediately so elements already in view on load don't wait for scroll
    scheduleFrame();

    return () => {
      window.removeEventListener("scroll", scheduleFrame);
      window.removeEventListener("resize", scheduleFrame);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [delay]);

  // Smooth the raw scroll progress through a cubic ease so fast scrolling
  // doesn't make it feel mechanical.
  const eased = smoothStep(progress);

  return (
    <span
      ref={ref}
      className={`block-reveal-root${className ? ` ${className}` : ""}`}
      aria-label={children}
      style={{ display: "inline-block", position: "relative", overflow: "hidden" }}
    >
      {/* Text layer — fades in just after the wipe starts */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          opacity: Math.min(Math.max((eased - 0.05) / 0.95, 0), 1),
        }}
      >
        {children}
      </span>

      {/* Overlay that wipes right as eased progress grows */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--ink)",
          transformOrigin: "right center",
          transform: `scaleX(${1 - eased})`,
          // willChange gives the browser a compositing hint for the transform
          willChange: "transform",
        }}
      />
    </span>
  );
}

/** Smooth-step (Ken Perlin) easing: 0→0, 1→1, smooth S-curve */
function smoothStep(t: number): number {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}
