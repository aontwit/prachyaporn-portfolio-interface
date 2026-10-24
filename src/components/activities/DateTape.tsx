/**
 * An activity's date written on a strip of tape (DESIGN.md "Paper system"): handwritten, in
 * ink-blue (5:1 on tape over white). `label` is already formatted in the reader's language.
 */
export function DateTape({ iso, label, className = "" }: { iso: string; label: string; className?: string }) {
  return (
    <time
      dateTime={iso}
      className={`inline-block -rotate-2 bg-tape px-3 font-hand text-sm leading-7 text-ink-blue shadow-tape ${className}`}
    >
      {label}
    </time>
  );
}
