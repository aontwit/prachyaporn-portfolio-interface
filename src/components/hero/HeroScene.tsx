"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { StaticStage } from "@/components/hero/StaticStage";
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

/** A renderer, texture or chunk that fails after the probe drops the canvas; the static stage stays. */
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The paper cut-out stage of the hero (DESIGN.md "3D hero"). The static stage is the server
 * render, the no-WebGL fallback and what shows until the canvas has drawn; the canvas mounts the
 * first time the stage is on screen and only loops while motion is not paused and it is on screen.
 * Fills its (relative, sized) parent.
 */
export function HeroScene() {
  const { paused } = useMotionPause();
  const webgl = useSyncExternalStore(subscribeNever, detectWebGL, () => false);
  const box = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = paused || !onScreen ? "demand" : "always";

  return (
    <div ref={box} aria-hidden="true" className="pointer-events-none absolute inset-0 @container">
      <div
        data-stage="static"
        className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <StaticStage />
      </div>
      {webgl && seen && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <SceneBoundary onError={() => setReady(false)}>
            <SceneCanvas frameloop={frameloop} onReady={setReady} />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
