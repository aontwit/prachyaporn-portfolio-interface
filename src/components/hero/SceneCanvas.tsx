"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  Color,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  type Group,
  type Texture,
} from "three";
import {
  art,
  CAMERA,
  CAST,
  COMPACT_MAX_PX,
  GROUND,
  groundX,
  STICK_OVERLAP,
  type CutOut,
} from "@/components/hero/cast";

type Token = "paper" | "grid" | "grid-strong" | "ink" | "sheet" | "crayon-yellow";

/** Colours are the CSS tokens of src/app/globals.css, read at runtime (no copies in code). */
function token(name: Token) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

const DEG = Math.PI / 180;
/** DESIGN.md: the cut-outs sway at most 3° on their sticks. */
const SWAY = 3 * DEG;
/** Wide enough to run past both sides of any screen. */
const GROUND_WIDTH = 120;
const STICK_WIDTH = 0.07;
/** Sharper paper at grazing angles; three clamps it to what the GPU supports. */
const ANISOTROPY = 8;

/** Doodle textures arrive as sRGB, sharp at an angle (set before R3F caches them). */
class DoodleLoader extends TextureLoader {
  override load(...[url, onLoad, onProgress, onError]: Parameters<TextureLoader["load"]>) {
    return super.load(
      url,
      (texture) => {
        texture.colorSpace = SRGBColorSpace;
        texture.anisotropy = ANISOTROPY;
        onLoad?.(texture);
      },
      onProgress,
      onError,
    );
  }
}

/** One ground tile = one world unit = the page's 100px major square with five 20px minors. */
function gridTexture() {
  const px = 256;
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d")!;
  g.fillStyle = token("sheet");
  g.fillRect(0, 0, px, px);
  // Lines a little heavier than the page's: seen at an angle they thin out.
  g.fillStyle = token("grid");
  for (let i = 1; i < 5; i++) {
    g.fillRect((i * px) / 5 - 2, 0, 4, px);
    g.fillRect(0, (i * px) / 5 - 2, px, 4);
  }
  g.fillStyle = token("grid-strong");
  g.fillRect(0, 0, 6, px);
  g.fillRect(0, 0, px, 6);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(GROUND_WIDTH, GROUND.near - GROUND.far);
  t.anisotropy = ANISOTROPY;
  return t;
}

/** A soft round shadow for where each stick meets the ground. */
function shadowTexture() {
  const px = 64;
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d")!;
  // sRGB channels of the ink token, for a texture tagged sRGB below.
  const ink = new Color(token("ink")).getRGB({ r: 0, g: 0, b: 0 }, SRGBColorSpace);
  const rgb = `${Math.round(ink.r * 255)}, ${Math.round(ink.g * 255)}, ${Math.round(ink.b * 255)}`;
  const gradient = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  gradient.addColorStop(0, `rgba(${rgb}, 0.45)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = gradient;
  g.fillRect(0, 0, px, px);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** A strip of grid paper lying on the page, with a faint shadow along its front edge. */
function Ground() {
  const grid = useMemo(() => gridTexture(), []);
  const ink = useMemo(() => new Color(token("ink")), []);
  useEffect(() => () => grid.dispose(), [grid]);
  const depth = GROUND.near - GROUND.far;
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, -(GROUND.near + GROUND.far) / 2 - 0.06, -0.01]}>
        <planeGeometry args={[GROUND_WIDTH, depth]} />
        <meshBasicMaterial color={ink} transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[0, -(GROUND.near + GROUND.far) / 2, 0]}>
        <planeGeometry args={[GROUND_WIDTH, depth]} />
        <meshBasicMaterial map={grid} />
      </mesh>
    </group>
  );
}

type Pointer = { x: number; y: number };

function Stand({
  cut,
  texture,
  shadow,
  compact,
  time,
}: {
  cut: CutOut;
  texture: Texture;
  shadow: Texture;
  compact: boolean;
  time: { current: number };
}) {
  const group = useRef<Group>(null);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const a = art(cut);
  const at = compact ? cut.x.compact : cut.x.wide;
  const wood = useMemo(() => new Color(token("crayon-yellow")).lerp(new Color(token("ink")), 0.38), []);
  const inkShadow = useMemo(() => new Color(token("ink")), []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const s = time.current * (0.55 + (cut.phase % 1) * 0.3) + cut.phase;
    g.rotation.z = cut.lean * DEG + Math.sin(s) * SWAY;
    g.rotation.x = Math.sin(s * 0.6 + 1) * SWAY * 0.3;
  });

  if (at === null || width === 0 || height === 0) return null;
  const x = groundX(at, cut.z, width, height);
  const w = (cut.size * a.width) / a.height;
  const stickLength = cut.stick + cut.size * STICK_OVERLAP;

  return (
    <group position={[x, 0, cut.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[Math.max(w * 0.7, 0.5), 0.45]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>
      <group ref={group} rotation={[0, 0, cut.lean * DEG]}>
        <mesh position={[0, stickLength / 2, -0.03]}>
          <boxGeometry args={[STICK_WIDTH, stickLength, 0.03]} />
          <meshLambertMaterial color={wood} />
        </mesh>
        {/* a faint drop shadow behind the paper, like a cut-out held a little off the page */}
        <mesh position={[0.06, cut.stick + cut.size / 2 - 0.08, -0.06]}>
          <planeGeometry args={[w, cut.size]} />
          <meshBasicMaterial map={texture} color={inkShadow} transparent opacity={0.22} depthWrite={false} />
        </mesh>
        <mesh position={[0, cut.stick + cut.size / 2, 0]}>
          <planeGeometry args={[w, cut.size]} />
          <meshLambertMaterial map={texture} transparent alphaTest={0.05} />
        </mesh>
      </group>
    </group>
  );
}

/** Pointer parallax on desktop: the camera drifts a little, the depth does the rest. */
function Parallax({ pointer }: { pointer: { current: Pointer } }) {
  useFrame(({ camera }, delta) => {
    const tx = pointer.current.x * 0.35;
    const ty = CAMERA.y + pointer.current.y * 0.08;
    // Same easing speed at any refresh rate.
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 4);
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
  });
  return null;
}

function Stage({ onReady, pointer }: { onReady: (ready: boolean) => void; pointer: { current: Pointer } }) {
  const textures = useLoader(
    DoodleLoader,
    CAST.map((c) => art(c).src),
  );
  const invalidate = useThree((s) => s.invalidate);
  const compact = useThree((s) => s.size.width < COMPACT_MAX_PX);
  const shadow = useMemo(() => shadowTexture(), []);
  const time = useRef(0);

  useEffect(() => () => shadow.dispose(), [shadow]);

  // Everything is loaded once this commits: draw a frame, then let the canvas fade in.
  useEffect(() => {
    invalidate();
    const id = requestAnimationFrame(() => onReady(true));
    return () => cancelAnimationFrame(id);
  }, [invalidate, onReady]);

  useFrame((_, delta) => {
    // Clamp so the sway resumes smoothly after a pause instead of jumping.
    time.current += Math.min(delta, 0.1);
  });

  return (
    <>
      <Ground />
      {CAST.map((cut, i) => (
        <Stand key={cut.name} cut={cut} texture={textures[i]} shadow={shadow} compact={compact} time={time} />
      ))}
      <Parallax pointer={pointer} />
    </>
  );
}

export type SceneFrameloop = "always" | "demand";

export default function SceneCanvas({
  frameloop,
  onReady,
}: {
  frameloop: SceneFrameloop;
  /** true once the scene has drawn; false when the WebGL context is lost (the static stage returns). */
  onReady: (ready: boolean) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  // Exposed for checks: "demand" = no render loop (paused or off screen).
  useEffect(() => {
    if (canvas.current) canvas.current.dataset.frameloop = frameloop;
  }, [frameloop]);

  // Desktop only: a fine pointer that can hover. Read from the window, the canvas takes no events.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const warm = useMemo(() => new Color(token("sheet")).lerp(new Color(token("crayon-yellow")), 0.18), []);

  return (
    <Canvas
      ref={canvas}
      frameloop={frameloop}
      dpr={[1, 1.5]}
      flat
      camera={{ position: [0, CAMERA.y, CAMERA.z], rotation: [-CAMERA.pitch * DEG, 0, 0], fov: CAMERA.fov, near: 0.1, far: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      // Nothing in the scene is interactive; R3F's wrapper would otherwise take pointer events.
      style={{ pointerEvents: "none" }}
      onCreated={({ gl, invalidate }) => {
        gl.domElement.addEventListener("webglcontextlost", () => onReady(false));
        gl.domElement.addEventListener("webglcontextrestored", () => {
          // A paused loop would otherwise leave the restored canvas blank.
          invalidate();
          onReady(true);
        });
      }}
    >
      <ambientLight color={warm} intensity={2.6} />
      <directionalLight color={warm} position={[-4, 6, 8]} intensity={0.9} />
      <Suspense fallback={null}>
        <Stage onReady={onReady} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
