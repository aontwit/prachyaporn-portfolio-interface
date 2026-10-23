import Image from "next/image";
import type { CSSProperties } from "react";
import { art, CAST, GROUND, lift, STICK_OVERLAP, type CutOut } from "@/components/hero/cast";

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

/** Where one cut-out sits, from the same camera math as the 3D scene (fractions of the stage height). */
function place(c: CutOut) {
  const base = lift(0, c.z);
  const top = lift(c.stick + c.size, c.z);
  const total = top - base;
  return {
    base,
    total,
    /** Share of the cut-out's height taken by the drawing, and by the stick from the ground up. */
    drawing: (top - lift(c.stick, c.z)) / total,
    stick: (lift(c.stick + c.size * STICK_OVERLAP, c.z) - base) / total,
  };
}

const GRID_PAPER =
  "bg-[linear-gradient(var(--grid-strong)_2px,transparent_2px),linear-gradient(90deg,var(--grid-strong)_2px,transparent_2px),linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] bg-size-[100px_100px,100px_100px,20px_20px,20px_20px] bg-bottom";

/**
 * The stage without WebGL: the same cut-outs as positioned `<img>`s on a strip of grid-paper
 * ground. It is the server render, the no-WebGL fallback and what shows until the canvas has
 * drawn. Fills its parent; the cast follows the parent's `@container` width like the scene does.
 */
export function StaticStage() {
  const ground = { bottom: lift(0, GROUND.near), top: lift(0, GROUND.far) };
  return (
    <>
      {/* A strip of grid paper lying on the page, tipped back in perspective (eye above the strip). */}
      <div
        className="absolute inset-x-0 overflow-hidden bg-sheet shadow-[0_3px_0_color-mix(in_srgb,var(--ink)_10%,transparent)] perspective-[300px] perspective-origin-[50%_-200%]"
        style={{ bottom: pct(ground.bottom), height: pct(ground.top - ground.bottom) }}
      >
        <div className={`absolute -inset-x-full bottom-0 h-[400%] origin-bottom transform-[rotateX(70deg)] ${GRID_PAPER}`} />
      </div>
      <div className="absolute inset-y-0 left-1/2 w-full max-w-6xl -translate-x-1/2">
        {CAST.map((c) => {
          const a = art(c);
          const { base, total, drawing, stick } = place(c);
          return (
            <div
              key={c.name}
              className={`absolute left-(--x-compact) -translate-x-1/2 @xl:left-(--x-wide) ${
                c.x.compact === null ? "@max-xl:hidden" : ""
              }`}
              style={
                {
                  "--x-wide": pct(c.x.wide),
                  "--x-compact": pct(c.x.compact ?? 0),
                  bottom: pct(base),
                  height: pct(total),
                  // Rounded like every other value here, so server and browser maths print the same string.
                  aspectRatio: `${a.width} / ${(a.height / drawing).toFixed(2)}`,
                  // CSS turns clockwise, three.js counter-clockwise: negate so both lean the same way.
                  rotate: `${-c.lean}deg`,
                  transformOrigin: "50% 100%",
                } as CSSProperties
              }
            >
              {/* soft contact shadow where the stick meets the ground */}
              <span className="absolute -bottom-[3%] left-1/2 h-[6%] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ink)_28%,transparent),transparent)]" />
              <span
                className="absolute bottom-0 left-1/2 w-[3%] min-w-1 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--crayon-yellow)_62%,var(--ink))]"
                style={{ height: pct(stick) }}
              />
              <Image
                src={a.src}
                alt=""
                width={a.width}
                height={a.height}
                unoptimized
                draggable={false}
                className="absolute top-0 left-0 w-full drop-shadow-[2px_4px_3px_color-mix(in_srgb,var(--ink)_22%,transparent)] select-none"
                style={{ height: pct(drawing) }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
