"use client";

import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";

export function Disclosure({ summary, children, className = "" }) {
  const detailsRef = useRef(null);
  const panelRef = useRef(null);
  const animationRef = useRef(null);
  const expandedRef = useRef(false);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function toggle(event) {
    event.preventDefault();
    const details = detailsRef.current;
    const panel = panelRef.current;
    const expanding = !expandedRef.current;
    const startHeight = details.open
      ? Number.parseFloat(getComputedStyle(panel).height) || 0
      : 0;

    expandedRef.current = expanding;
    details.dataset.expanded = String(expanding);
    event.currentTarget.setAttribute("aria-expanded", String(expanding));
    panel.inert = !expanding;
    animationRef.current?.cancel();
    animationRef.current = null;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !panel.animate
    ) {
      details.open = expanding;
      panel.style.height = "";
      panel.style.overflow = "";
      return;
    }

    // Keep native content mounted until its closing animation finishes.
    // Measure the current height first so rapid toggles reverse without jumping.
    details.open = true;
    panel.style.height = "auto";
    const endHeight = expanding ? panel.scrollHeight : 0;
    panel.style.height = `${startHeight}px`;
    panel.style.overflow = "hidden";

    const style = getComputedStyle(details);
    const duration = style.getPropertyValue("--disclosure-duration").trim();
    const milliseconds =
      Number.parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000);
    const animation = panel.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      {
        duration: milliseconds,
        easing: style.getPropertyValue("--disclosure-easing").trim(),
        fill: "both",
      },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (animationRef.current !== animation) return;
      animationRef.current = null;
      details.open = expanding;
      panel.style.height = "";
      panel.style.overflow = "";
      animation.cancel();
    };
  }

  function syncNativeToggle() {
    if (animationRef.current) return;
    const details = detailsRef.current;
    expandedRef.current = details.open;
    details.dataset.expanded = String(details.open);
    details.firstElementChild.setAttribute("aria-expanded", String(details.open));
    panelRef.current.inert = !details.open;
  }

  return (
    <details
      ref={detailsRef}
      className={`disclosure ${className}`}
      onToggle={syncNativeToggle}
    >
      <summary onClick={toggle}>
        {summary}
        <span className="disclosure-indicator" aria-hidden="true">
          <Plus className="disclosure-icon" size={20} strokeWidth={1.75} />
        </span>
      </summary>
      <div ref={panelRef} className="disclosure-panel">
        {children}
      </div>
    </details>
  );
}
