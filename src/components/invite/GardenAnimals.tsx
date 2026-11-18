import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Animals of the opening garden scene (no butterflies — those belong to the transition).
 * All positions are percentages of the Journey "stage", so they stay aligned with the
 * garden image on every screen size. Everything is decorative and non-interactive.
 */

/* ---------- shared timeline helper (keyframes + times for framer loops) ---------- */
type Key = { t: number; v: number };
function track(keys: Key[], total: number) {
  return { values: keys.map((k) => k.v), times: keys.map((k) => k.t / total) };
}

/* ---------------------------------- birds ---------------------------------- */
function FlyingBird({ flap, style }: { flap: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 30" className="animal-rim absolute overflow-visible" style={style} aria-hidden>
      <path d="M20 17 L9 13.5 L12 18.5 L9.5 23 L21 20 Z" className="fill-wild-navy" />
      <ellipse cx="30" cy="18" rx="10.5" ry="4.2" className="fill-wild-navy" />
      <ellipse cx="34" cy="20" rx="5" ry="2.2" className="fill-wild-burgundy" />
      <circle cx="41" cy="16" r="3.4" className="fill-wild-navy" />
      <path d="M44 15.4 L48.5 16.4 L44 17.6 Z" className="fill-gold-deep" />
      <g className="wing-flap" style={{ ["--flap" as string]: flap }}>
        <path d="M29 17 Q21 3 10 3.5 Q20 9 26.5 18 Z" className="fill-wild-navy opacity-80" />
        <path d="M31 17 Q37 0 50 1.5 Q39 8.5 34 18 Z" className="fill-wild-navy" />
      </g>
    </svg>
  );
}

/** Two small flocks gliding across the sunset sky, in opposite directions. */
function Birds() {
  return (
    <div className="pointer-events-none absolute inset-0 motion-reduce:hidden" aria-hidden>
      <div className="bird-lane absolute left-0 top-[19%] h-[6%] w-full" style={{ ["--dur" as string]: "12s", animationDelay: "-5s" }}>
        <div className="bird-glide absolute left-0 top-0 h-full w-[30%]">
          <FlyingBird flap=".52s" style={{ left: "42%", top: "0%", width: "30%" }} />
          <FlyingBird flap=".6s" style={{ left: "6%", top: "55%", width: "25%" }} />
          <FlyingBird flap=".56s" style={{ left: "70%", top: "70%", width: "22%" }} />
        </div>
      </div>
      <div className="bird-lane-rev absolute left-0 top-[33%] h-[4%] w-full" style={{ ["--dur" as string]: "15s", animationDelay: "-3s" }}>
        <div className="bird-glide absolute left-0 top-0 h-full w-[18%]" style={{ ["--glide" as string]: "4.2s" }}>
          <div className="h-full w-full -scale-x-100">
            <FlyingBird flap=".62s" style={{ left: "10%", top: "0%", width: "38%" }} />
            <FlyingBird flap=".7s" style={{ left: "58%", top: "45%", width: "32%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A small songbird hopping and pecking on the stone bench. */
function BenchBird() {
  return (
    <div className="pointer-events-none absolute left-[11%] top-[67.2%] w-[6%] -translate-y-full" aria-hidden>
      <div className="perch-hop">
        <svg viewBox="0 0 30 24" className="animal-rim block w-full overflow-visible">
          <g className="peck">
            <g className="tail-flick"><path d="M10 13 L1 9 L3 13.5 L1.5 17 L11 16 Z" className="fill-wild-navy" /></g>
            <ellipse cx="14.5" cy="14" rx="7.5" ry="5.4" className="fill-wild-navy" />
            <ellipse cx="17.5" cy="16" rx="4.2" ry="3.2" className="fill-wild-burgundy" />
            <circle cx="21" cy="9.5" r="3.6" className="fill-wild-navy" />
            <path d="M24.2 9 L28 10 L24.2 11.2 Z" className="fill-gold-deep" />
            <circle cx="22" cy="8.8" r="0.7" className="fill-gold" />
          </g>
          <path d="M13 19 L12.5 23 M16 19 L16.5 23" className="stroke-wild-navy" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

/* ---------------------------------- deer ---------------------------------- */
const DEER_DUR = 14;
// walk right · graze · turn · walk left · graze · turn back
const deerX = track([{ t: 0, v: 0 }, { t: 5, v: 120 }, { t: 7.9, v: 120 }, { t: 12.4, v: 0 }, { t: 14, v: 0 }], DEER_DUR);
const deerFlip = track([{ t: 0, v: 1 }, { t: 7.4, v: 1 }, { t: 7.8, v: -1 }, { t: 13.5, v: -1 }, { t: 13.95, v: 1 }, { t: 14, v: 1 }], DEER_DUR);
const deerHead = track(
  [{ t: 0, v: 0 }, { t: 5.2, v: 0 }, { t: 5.8, v: 42 }, { t: 6.4, v: 36 }, { t: 7, v: 42 }, { t: 7.4, v: 0 }, { t: 12.6, v: 0 }, { t: 13.1, v: 40 }, { t: 13.5, v: 0 }, { t: 14, v: 0 }],
  DEER_DUR,
);
function legSwing(phase: number) {
  const keys: Key[] = [];
  const walks = [[0, 5], [7.9, 12.4]] as const;
  let t = 0;
  for (const [a, b] of walks) {
    keys.push({ t: Math.max(t, a), v: 0 });
    let i = 0;
    for (let s = a + 0.35; s < b; s += 0.35, i++) keys.push({ t: s, v: (i + phase) % 2 === 0 ? 14 : -14 });
    keys.push({ t: b, v: 0 });
    t = b;
  }
  keys.push({ t: DEER_DUR, v: 0 });
  return track(keys, DEER_DUR);
}
const LEGS = [
  { x: 27, phase: 0 }, { x: 31, phase: 1 }, // hind
  { x: 46, phase: 1 }, { x: 50, phase: 0 }, // fore
];

function Deer({ still }: { still: boolean }) {
  const loop = (times: number[]) => ({ duration: DEER_DUR, times, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div className="pointer-events-none absolute left-[27%] top-[49.8%] w-[12%] -translate-y-full opacity-90" aria-hidden>
      <motion.div
        animate={still ? {} : { x: deerX.values.map((v) => `${v}%`), scaleX: deerFlip.values }}
        transition={still ? {} : { x: loop(deerX.times), scaleX: loop(deerFlip.times) }}
      >
        <svg viewBox="0 0 80 66" className="animal-rim block w-full overflow-visible">
          {LEGS.map((l, i) => {
            const sw = legSwing(l.phase);
            return (
              <motion.rect key={i} x={l.x} y={36} width={3} height={27} rx={1.4} className="fill-wild-navy"
                style={{ originX: 0.5, originY: 0 }}
                animate={still ? {} : { rotate: sw.values }}
                transition={still ? {} : { duration: DEER_DUR, times: sw.times, repeat: Infinity, ease: "easeInOut" }} />
            );
          })}
          <path d="M20 30 Q16 26 18 24 Q21 27 22 29 Z" className="fill-wild-burgundy" />
          <ellipse cx="38" cy="33" rx="18" ry="8.5" className="fill-wild-navy" />
          <ellipse cx="38" cy="37" rx="13" ry="3.4" className="fill-wild-burgundy opacity-40" />
          <motion.g style={{ originX: 0.05, originY: 0.95 }}
            animate={still ? {} : { rotate: deerHead.values }}
            transition={still ? {} : { duration: DEER_DUR, times: deerHead.times, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M48 31 L56 13 L62 15 L56.5 34 Z" className="fill-wild-navy" />
            <ellipse cx="63" cy="13.5" rx="7" ry="3.8" transform="rotate(18 63 13.5)" className="fill-wild-navy" />
            <path d="M57 10 L53 5 L58.5 8.5 Z" className="fill-wild-navy" />
            <path d="M59.5 9 L59 2 M59 4.5 L56.5 2.5" className="stroke-wild-navy" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <circle cx="63" cy="12" r="0.9" className="fill-gold" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

/* --------------------------------- rabbit --------------------------------- */
const HOP = 0.55;
const REST = 0.22;
const HOPS = 11;
const LEN = 126 / HOPS; // lane runs from -13% to 113% of the stage
const PAUSE_AFTER = new Set([3, 7]); // sits, sniffs, ear twitch
const PAUSE = 1.6;
function rabbitTimeline() {
  const x: Key[] = [];
  const y: Key[] = [];
  const r: Key[] = [];
  let t = 0;
  let pos = -13;
  for (let i = 0; i < HOPS; i++) {
    x.push({ t, v: pos }); y.push({ t, v: 0 }); r.push({ t, v: 0 });
    y.push({ t: t + HOP / 2, v: -55 }); r.push({ t: t + HOP * 0.3, v: -10 });
    x.push({ t: t + HOP, v: pos + LEN }); y.push({ t: t + HOP, v: 0 }); r.push({ t: t + HOP * 0.8, v: 6 });
    t += HOP; pos += LEN;
    r.push({ t, v: 0 });
    t += PAUSE_AFTER.has(i + 1) ? PAUSE : REST;
  }
  x.push({ t, v: pos }); y.push({ t, v: 0 }); r.push({ t, v: 0 });
  return { total: t, x: track(x, t), y: track(y, t), r: track(r, t) };
}
const RABBIT = rabbitTimeline();

function RabbitSvg() {
  return (
    <svg viewBox="0 0 50 40" className="animal-rim block w-full overflow-visible">
      <circle cx="9" cy="25" r="3.6" className="fill-cream" />
      <circle cx="16" cy="28" r="9" className="fill-wild-navy" />
      <ellipse cx="23" cy="27" rx="12.5" ry="9" className="fill-wild-navy" />
      <ellipse cx="24" cy="30" rx="7" ry="4.5" className="fill-wild-burgundy opacity-75" />
      <ellipse cx="34" cy="35.5" rx="4.5" ry="2" className="fill-wild-navy" />
      <g className="ear-twitch">
        <ellipse cx="31.5" cy="6" rx="2.3" ry="8" transform="rotate(-18 31.5 6)" className="fill-wild-navy" />
        <ellipse cx="36" cy="6.5" rx="2.3" ry="8" transform="rotate(8 36 6.5)" className="fill-wild-navy" />
        <ellipse cx="36" cy="7" rx="0.9" ry="5" transform="rotate(8 36 7)" className="fill-wild-burgundy" />
      </g>
      <circle cx="36" cy="18.5" r="6.6" className="fill-wild-navy" />
      <circle cx="38.5" cy="17" r="1" className="fill-gold" />
      <circle cx="42.3" cy="20" r="0.9" className="fill-wild-burgundy" />
    </svg>
  );
}

/** A rabbit hopping along the foreground of the path, pausing now and then. */
function Rabbit({ still }: { still: boolean }) {
  if (still) {
    return (
      <div className="pointer-events-none absolute left-[18%] top-[90.5%] w-[11%] -translate-y-full" aria-hidden>
        <RabbitSvg />
      </div>
    );
  }
  const loop = (times: number[], ease: "linear" | "easeInOut" = "easeInOut") => ({ duration: RABBIT.total, times, repeat: Infinity, ease });
  return (
    <motion.div className="pointer-events-none absolute left-0 top-[90.5%] w-full" aria-hidden
      animate={{ x: RABBIT.x.values.map((v) => `${v}%`) }} transition={{ x: loop(RABBIT.x.times) }}>
      <div className="absolute bottom-0 left-0 w-[11%]">
        {/* soft ground shadow stays on the path while the rabbit is airborne */}
        <div className="absolute -bottom-[6%] left-[15%] h-[18%] w-[70%] rounded-[50%] bg-night/55 blur-[2px]" />
        <motion.div style={{ originX: 0.5, originY: 1 }}
          animate={{ y: RABBIT.y.values.map((v) => `${v}%`), rotate: RABBIT.r.values }}
          transition={{ y: loop(RABBIT.y.times), rotate: loop(RABBIT.r.times) }}>
          <RabbitSvg />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Animals behind the couple (sky, distant meadow, bench). */
export function GardenAnimalsBack() {
  const still = !!useReducedMotion();
  return (
    <>
      <Birds />
      <Deer still={still} />
      <BenchBird />
    </>
  );
}

/** Animals in front of the couple (foreground path). */
export function GardenAnimalsFront() {
  const still = !!useReducedMotion();
  return <Rabbit still={still} />;
}
