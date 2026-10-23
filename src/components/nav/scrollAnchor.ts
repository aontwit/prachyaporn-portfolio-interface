/**
 * Keeps the reader in place across a language switch: Thai and English wrap to different heights,
 * so the same pixel offset would land elsewhere. Remember which anchored block crosses a line a
 * third of the way down, and where; after the new text renders, scroll so it sits there again.
 */
export type ScrollAnchor = { id: string; top: number };

export function captureAnchor(): ScrollAnchor | null {
  const line = window.innerHeight / 3;
  let hit: Element | null = null;
  // Document order, so the deepest block that crosses the line (an activity inside a page) wins.
  for (const el of document.querySelectorAll("main [id]")) {
    const box = el.getBoundingClientRect();
    if (box.top <= line && box.bottom > line) hit = el;
  }
  return hit ? { id: hit.id, top: hit.getBoundingClientRect().top } : null;
}

export function restoreAnchor(anchor: ScrollAnchor) {
  const el = document.getElementById(anchor.id);
  if (!el) return;
  const shift = el.getBoundingClientRect().top - anchor.top;
  if (Math.abs(shift) >= 1) window.scrollTo({ top: window.scrollY + shift, behavior: "instant" });
}
