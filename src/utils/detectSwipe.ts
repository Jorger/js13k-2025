// import { $on } from "./helpers";

import { $on } from "./helpers";

type SwipeDirection = "up" | "down" | "left" | "right" | null;

interface SwipeOptions {
  threshold?: number; // Distancia mínima para considerar swipe
  onSwipe: (direction: SwipeDirection) => void;
}

export function detectSwipe(element: HTMLElement, options: SwipeOptions) {
  const threshold = options.threshold ?? 30; // por defecto 50px
  let startX = 0;
  let startY = 0;
  let isMouseDown = false;

  // --- HANDLERS ---
  const start = (x: number, y: number) => {
    startX = x;
    startY = y;
    isMouseDown = true;
  };

  const end = (x: number, y: number) => {
    if (!isMouseDown) return;
    const dx = x - startX;
    const dy = y - startY;

    let direction: SwipeDirection = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > threshold) {
        direction = dx > 0 ? "right" : "left";
      }
    } else {
      if (Math.abs(dy) > threshold) {
        direction = dy > 0 ? "down" : "up";
      }
    }

    if (direction) options.onSwipe(direction);
    isMouseDown = false;
  };

  // --- EVENTOS ---
  // Desktop
  $on(element, "mousedown", (e) => start(e.clientX, e.clientY));
  $on(window, "mouseup", (e) => end(e.clientX, e.clientY));
  // element.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  // window.addEventListener("mouseup", (e) => end(e.clientX, e.clientY)); // ahora en window

  // Mobile
  $on(
    element,
    "touchstart",
    (e) => {
      const t = e.changedTouches[0];
      start(t.clientX, t.clientY);
    },
    { passive: true }
  );

  $on(
    element,
    "touchend",
    (e) => {
      const t = e.changedTouches[0];
      end(t.clientX, t.clientY);
    },
    { passive: true }
  );

  // element.addEventListener(
  //   "touchstart",
  //   (e) => {
  //     const t = e.changedTouches[0];
  //     start(t.clientX, t.clientY);
  //   },
  //   { passive: true }
  // );

  // element.addEventListener(
  //   "touchend",
  //   (e) => {
  //     const t = e.changedTouches[0];
  //     end(t.clientX, t.clientY);
  //   },
  //   { passive: true }
  // );
}
