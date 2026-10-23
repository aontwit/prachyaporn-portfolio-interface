"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionPause } from "@/components/MotionPause";

// three + react-three-fiber stay out of the server render and the first client bundle.
const SceneCanvas = dynamic(() => import("@/components/hero/SceneCanvas"), { ssr: false });

let webglSupport: boolean | undefined;

/** Checked once per page; the probe context is released right away. */
function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
      webglSupport = gl !== null;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const subscribeNever = () => () => {};

/**
 * Soft floating shapes behind the portrait. The CSS shapes are the server render, the
 * no-WebGL fallback, and what shows until the canvas is ready; the canvas only loops while
 * motion is not paused and the box is on screen.
 */
export function HeroScene() {
  const { paused } = useMotionPause();
  const webgl = useSyncExternalStore(subscribeNever, detectWebGL, () => false);
  const box = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = paused || !onScreen ? "demand" : "always";

  return (
    <div ref={box} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <span className="absolute top-[3%] right-[2%] size-[34%] rotate-12 rounded-[46%_54%_52%_48%/58%_44%_56%_42%] bg-[radial-gradient(circle_at_32%_28%,var(--surface),var(--sky)_72%)]" />
        <span className="absolute bottom-[6%] left-[1%] h-[30%] w-[22%] -rotate-[28deg] rounded-[50%_50%_50%_50%/62%_62%_38%_38%] bg-[radial-gradient(circle_at_40%_30%,var(--surface),var(--accent-soft)_70%)]" />
        <span className="absolute right-[6%] bottom-[2%] size-[26%] rounded-[55%_45%_50%_50%/50%_55%_45%_50%] bg-[radial-gradient(circle_at_35%_30%,var(--surface),var(--sand)_75%)]" />
        <span className="absolute top-[14%] left-[3%] size-[16%] rounded-[50%_50%_46%_54%/56%_48%_52%_44%] bg-[radial-gradient(circle_at_35%_30%,var(--surface),var(--sky)_80%)]" />
      </div>
      {webgl && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <SceneCanvas frameloop={frameloop} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
