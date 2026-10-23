"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, ExtrudeGeometry, Shape, SphereGeometry, type Mesh } from "three";

type Token = "sky" | "accent-soft" | "sand";

type ShapeSpec = {
  kind: "pebble" | "leaf";
  token: Token;
  /** Position as a fraction of the half viewport: -1 = left / bottom edge, 1 = right / top edge. */
  at: readonly [x: number, y: number, z: number];
  /** Size as a fraction of the viewport's shorter side. */
  size: number;
  /** Starting rotation in radians. */
  tilt: readonly [x: number, y: number, z: number];
  /** Offsets the float so the shapes never move in step. */
  phase: number;
};

// A few shapes peeking out around the portrait (which covers the middle of the canvas),
// each kept inside the canvas so no edge cuts a shape.
const SHAPES: readonly ShapeSpec[] = [
  { kind: "pebble", token: "sky", at: [0.66, 0.74, -0.3], size: 0.13, tilt: [0.3, 0.2, 0.5], phase: 0 },
  { kind: "leaf", token: "accent-soft", at: [-0.66, -0.6, 0], size: 0.16, tilt: [0.5, -0.4, -0.6], phase: 1.7 },
  { kind: "pebble", token: "sand", at: [0.7, -0.72, 0.2], size: 0.11, tilt: [-0.2, 0.4, -0.3], phase: 3.1 },
  { kind: "pebble", token: "sky", at: [-0.78, 0.7, -0.4], size: 0.07, tilt: [0.1, 0.6, 0.2], phase: 4.4 },
  { kind: "leaf", token: "sky", at: [0.8, 0.08, -0.5], size: 0.11, tilt: [-0.4, 0.5, 0.9], phase: 5.6 },
];

/** Colours are the CSS tokens of src/app/globals.css, read at runtime (no copies in code). */
function tokenColor(token: Token) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim();
  return value ? new Color(value) : new Color();
}

function leafGeometry() {
  const outline = new Shape();
  outline.moveTo(0, -1);
  outline.bezierCurveTo(0.75, -0.55, 0.62, 0.55, 0, 1);
  outline.bezierCurveTo(-0.62, 0.55, -0.75, -0.55, 0, -1);
  const geometry = new ExtrudeGeometry(outline, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 6,
    curveSegments: 32,
  });
  geometry.center();
  return geometry;
}

function FloatingShape({ spec }: { spec: ShapeSpec }) {
  const mesh = useRef<Mesh>(null);
  const time = useRef(0);
  const viewport = useThree((state) => state.viewport);
  const geometry = useMemo(
    () => (spec.kind === "leaf" ? leafGeometry() : new SphereGeometry(1, 48, 32)),
    [spec.kind],
  );
  const color = useMemo(() => tokenColor(spec.token), [spec.token]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const unit = Math.min(viewport.width, viewport.height) * spec.size;
  const x = (spec.at[0] * viewport.width) / 2;
  const y = (spec.at[1] * viewport.height) / 2;

  useFrame((_, delta) => {
    // Clamp so the float resumes smoothly after a pause instead of jumping.
    time.current += Math.min(delta, 0.1);
    const m = mesh.current;
    if (!m) return;
    const s = time.current * 0.3 + spec.phase;
    m.position.y = y + Math.sin(s) * unit * 0.12;
    m.rotation.x = spec.tilt[0] + Math.sin(s * 0.7) * 0.12;
    m.rotation.y = spec.tilt[1] + time.current * 0.05;
    m.rotation.z = spec.tilt[2] + Math.cos(s * 0.5) * 0.08;
  });

  const scale: [number, number, number] =
    spec.kind === "leaf" ? [unit * 0.62, unit, unit] : [unit, unit * 0.74, unit * 0.86];

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={[x, y, spec.at[2]]}
      rotation={[...spec.tilt]}
      scale={scale}
    >
      <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
    </mesh>
  );
}

export type SceneFrameloop = "always" | "demand";

export default function SceneCanvas({
  frameloop,
  onReady,
}: {
  frameloop: SceneFrameloop;
  /** true once the renderer exists; false when the WebGL context is lost (the CSS shapes return). */
  onReady: (ready: boolean) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  // Exposed for checks: "demand" = no render loop (paused or off screen).
  useEffect(() => {
    if (canvas.current) canvas.current.dataset.frameloop = frameloop;
  }, [frameloop]);

  return (
    <Canvas
      ref={canvas}
      frameloop={frameloop}
      dpr={[1, 1.5]}
      flat
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      // Nothing in the scene is interactive; R3F's wrapper would otherwise take pointer events.
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", () => onReady(false));
        gl.domElement.addEventListener("webglcontextrestored", () => onReady(true));
        onReady(true);
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[-3, 4, 5]} intensity={1.2} />
      {SHAPES.map((spec, i) => (
        <FloatingShape key={i} spec={spec} />
      ))}
    </Canvas>
  );
}
