// Queue the crayon doodle set on the local inference engine, wait, copy results to <out>/<name>.png.
// Usage: ENGINE_TOKEN=<token> node batch.mjs <out_dir>   (the token the local ai-toolkit inference engine was started with)
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";

const out = process.argv[2];
mkdirSync(out, { recursive: true });
const API = "http://127.0.0.1:8866";
const TOKEN = process.env.ENGINE_TOKEN;
if (!TOKEN) throw new Error("set ENGINE_TOKEN to the local inference engine token");
const H = { "X-Engine-Token": TOKEN, "Content-Type": "application/json" };
const STYLE =
  "a child's wax crayon drawing, drawn by a kindergarten kid, thick wobbly black crayon outlines, visible waxy crayon texture and paper grain, soft pastel colors, simple and naive, single object centered with empty space around it, isolated on plain white paper, no text, no letters";
const SUBJECTS = {
  "bear-pencil": ["a cute little teddy bear holding a big yellow pencil", 7],
  crayons: ["a bundle of five colorful wax crayons", 11],
  abacus: ["a small wooden abacus with colorful beads", 12],
  "open-book": ["an open picture book", 13],
  "abc-blocks": ["three stacked wooden toy blocks", 14],
  sun: ["a smiling sun with short rays", 15],
  cloud: ["a fluffy smiling cloud", 16],
  flower: ["a pink flower with a green stem and two leaves", 17],
  star: ["a yellow star with a happy face", 18],
  "paper-plane": ["a blue paper airplane", 19],
  apple: ["a red apple with a leaf", 20],
  heart: ["a pink heart", 21],
  "school-bag": ["a small blue school backpack", 22],
  rainbow: ["a small rainbow", 23],
};

const jobs = [];
for (const [name, [subject, seed]] of Object.entries(SUBJECTS)) {
  const prompt = STYLE.replace("a child's wax crayon drawing", `a child's wax crayon drawing of ${subject}`);
  const res = await fetch(`${API}/generate`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ model: { arch: "flux2_klein_4b", quantize: true, quantize_te: true }, sample: { prompt, width: 1024, height: 1024, seed, num_inference_steps: 25 }, wait: true }),
  });
  if (!res.ok) { console.log("ERROR", name, res.status, await res.text()); continue; }
  // the result file sits somewhere in the response (`results[0].path`); take the first `path` found
  const findPath = (v) => (v && typeof v === "object" ? (typeof v.path === "string" ? v.path : Object.values(v).map(findPath).find(Boolean)) : undefined);
  const body = await res.json();
  const path = findPath(body);
  if (!path) { console.log("ERROR", name, JSON.stringify(body).slice(0, 300)); continue; }
  copyFileSync(path, `${out}/${name}.png`);
  jobs.push({ name, subject, seed, prompt });
  console.log("done", name, jobs.length);
}
writeFileSync(`${out}/jobs.json`, JSON.stringify(jobs, null, 2));
