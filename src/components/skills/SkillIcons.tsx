import type { ReactNode } from "react";

/**
 * Small line icons for the skill cards, drawn like notebook doodles:
 * slightly uneven paths, `currentColor`, stroke 1.5, decorative only.
 */
function Doodle({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Early years & child psychology: a small child's face. */
export function ChildIcon() {
  return (
    <Doodle>
      <path d="M12.1 4.6c4.1-.2 7.3 3.1 7.2 7.3-.1 4.1-3.4 7.3-7.4 7.2-4.1-.1-7.2-3.3-7.1-7.4.1-4 3.3-6.9 7.3-7.1Z" />
      <path d="M10.4 4.9c.2-1.3 1.3-2 2.6-1.8M13 4.7c.6-.7 1.6-.9 2.4-.4" />
      <path d="M9.5 10.9v.4M14.6 10.8v.4" />
      <path d="M9.2 14.2c1.6 1.7 4.2 1.6 5.6-.2" />
    </Doodle>
  );
}

/** Mental arithmetic: an abacus. */
export function AbacusIcon() {
  return (
    <Doodle>
      <path d="M4.3 4.4c5.2-.3 10.3-.2 15.5.1.2 5 .3 10-.1 15-5.1.3-10.3.3-15.4 0-.3-5-.3-10 0-15.1Z" />
      <path d="M4.5 9.2c5-.2 10-.1 15.1 0M4.5 14.9c5-.1 10 0 15.1-.1" />
      <ellipse cx="7.9" cy="9.2" rx="1.1" ry="1.5" />
      <ellipse cx="10.6" cy="9.2" rx="1.1" ry="1.5" />
      <ellipse cx="16.1" cy="9.2" rx="1.1" ry="1.5" />
      <ellipse cx="7.6" cy="14.9" rx="1.1" ry="1.5" />
      <ellipse cx="13.4" cy="14.9" rx="1.1" ry="1.5" />
      <ellipse cx="16.1" cy="14.9" rx="1.1" ry="1.5" />
    </Doodle>
  );
}

/** Academic tutoring: an open book with a pencil resting on it. */
export function BookIcon() {
  return (
    <Doodle>
      <path d="M11.9 8.1C9.9 6.7 7.3 6.2 4.3 6.6l.1 11.6c2.9-.3 5.5.2 7.5 1.6 2-1.4 4.6-1.9 7.5-1.6V12" />
      <path d="M11.9 8.1v11.6" />
      <path d="M6.6 10.3c1.2-.1 2.4.1 3.4.5M6.6 13.3c1.2-.1 2.4.1 3.4.5" />
      <path d="M14.3 11.3 19.6 3.8c.4-.5 1.1-.6 1.6-.2.5.4.6 1.1.2 1.6l-5.3 7.4-2.2 1.1.4-2.4Z" />
    </Doodle>
  );
}

/** Parent communication: two speech bubbles. */
export function BubblesIcon() {
  return (
    <Doodle>
      <path d="M4 6.6c0-1.5 1.1-2.5 2.6-2.5h7c1.5 0 2.5 1.1 2.5 2.5v4c0 1.5-1 2.5-2.5 2.5H9.3l-3.2 2.6v-2.6C4.9 12.9 4 12 4 10.6Z" />
      <path d="M18.6 10.1c.9.3 1.5 1.1 1.5 2.1v3.4c0 1.2-.9 2.1-2 2.2v2.3l-2.8-2.2h-4c-1.2 0-2.1-.8-2.2-1.9" />
      <path d="M7.9 8.6h.01M10.1 8.6h.01M12.3 8.6h.01" />
    </Doodle>
  );
}
