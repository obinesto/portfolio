"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Carousel } from "@obinesto/react-infinite-scroll-carousel";
import { Pause, Play } from "lucide-react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;

// The package owns scrolling and looping. This adapter supplies responsive widths
// and pauses autoplay for slide-content interaction and reduced motion.
export function ResponsiveCarousel({
  items,
  renderItem,
  keyExtractor,
  label,
  interval = 0,
}) {
  const rootRef = useRef(null);
  const [layout, setLayout] = useState({ width: 300, step: 300 });
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    getServerMotion,
  );

  useEffect(() => {
    const root = rootRef.current;
    const measure = () => {
      const style = getComputedStyle(root);
      const columns =
        Number.parseInt(style.getPropertyValue("--carousel-columns")) || 1;
      const gap = Number.parseFloat(style.getPropertyValue("--carousel-gap")) || 0;
      const width = Math.max(
        1,
        Math.floor((root.clientWidth - gap * (columns - 1)) / columns),
      );
      const step = width + gap;
      setLayout((current) =>
        current.width === width && current.step === step
          ? current
          : { width, step },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="portfolio-carousel min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      style={{ "--carousel-item-width": `${layout.width}px` }}
      onMouseOver={(event) =>
        setHovered(Boolean(event.target.closest(".portfolio-carousel-track")))
      }
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) =>
        setFocused(Boolean(event.target.closest(".portfolio-carousel-track")))
      }
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <Carousel
        items={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollAmount={layout.step}
        scrollInterval={
          playing && !reducedMotion && !hovered && !focused ? interval : 0
        }
        containerClassName="portfolio-carousel-track"
        itemClassName="w-[var(--carousel-item-width)] min-w-0"
        navigationButtonClassName="portfolio-carousel-button"
      />
      {interval > 0 && (
        <button
          type="button"
          className="carousel-playback inline-flex items-center gap-2 text-xs text-muted disabled:opacity-50"
          onClick={() => setPlaying((value) => !value)}
          disabled={reducedMotion}
          aria-label={
            reducedMotion
              ? "Autoplay is off for reduced motion"
              : playing
                ? `Pause ${label}`
                : `Play ${label}`
          }
        >
          {playing && !reducedMotion ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
          {reducedMotion ? "Autoplay off" : playing ? "Pause" : "Play"}
        </button>
      )}
    </div>
  );
}
