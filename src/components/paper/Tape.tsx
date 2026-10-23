/**
 * A strip of translucent yellow tape over the edge it holds. Absolutely positioned: the parent is
 * `relative`, and `className` places and rotates it (default: top edge, left).
 */
export function Tape({ className = "left-6 -rotate-4" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-3.5 z-10 h-7.5 w-24 bg-tape shadow-tape sm:w-[110px] ${className}`}
    />
  );
}
