import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useHorizontalScroll(): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canScrollX = () => el.scrollWidth - el.clientWidth > 1;

    const onWheel = (e: WheelEvent) => {
      if (!canScrollX()) return;
      // Vertical wheel → horizontal; never let the same gesture scroll the page vertically
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const max = Math.max(0, el.scrollWidth - el.clientWidth);
        el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + e.deltaY));
      }
    };

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0 || !canScrollX()) return;
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = el.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.pageX - startX;
      el.scrollLeft = startScrollLeft - dx;
    };

    const stopDragging = () => {
      isDragging = false;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  return ref;
}
