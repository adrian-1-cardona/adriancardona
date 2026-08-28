import { useEffect, useRef, useState } from "react";
import React from "react";

interface ScrollTypewriterProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  /** ms per character (default 38) */
  charSpeed?: number;
  /** delay before typing starts once in view (ms, default 120) */
  startDelay?: number;
}

export function ScrollTypewriter({
  children,
  className = "",
  as: Tag = "p",
  charSpeed = 38,
  startDelay = 120,
}: ScrollTypewriterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const started = useRef(false);

  // Split into words, keeping spaces as separate tokens so spacing is preserved
  const words = children.split(/(\s+)/);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(words.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          // Delay before first character
          timerRef.current = setTimeout(() => {
            let idx = 0;
            // Type word by word, each word = one token (including whitespace tokens)
            const tick = () => {
              idx++;
              setVisibleCount(idx);
              if (idx < words.length) {
                // Vary speed slightly per token: words take charSpeed * length, spaces are instant
                const token = words[idx - 1];
                const isSpace = /^\s+$/.test(token);
                timerRef.current = setTimeout(tick, isSpace ? 0 : charSpeed * Math.max(1, token.length * 0.55));
              }
            };
            tick();
          }, startDelay);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words.length, charSpeed, startDelay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} aria-label={children}>
      {words.map((token, i) => {
        const visible = i < visibleCount;
        if (/^\s+$/.test(token)) {
          // Whitespace token — always render so layout stays correct
          return <span key={i} aria-hidden="true">{token}</span>;
        }
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.18em)",
              transition: visible
                ? "opacity 0.22s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)"
                : "none",
            }}
          >
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
