"use client";

import { useEffect, useRef } from "react";
import { asset } from "../asset";

type Tile = { href: string; label: string; badge: string };

// The three hero tiles on a 3 × 3 staircase, and a little copy of my profile logo that really
// hops around: out of the little logo in the menu, into the title (the glasses in "Bunny" appear
// under it), down the three tiles (each pops up under it with a puff of dust), and last one big
// leap to the right, where the big profile picture (hidden until then) pops in. Every jump leaves
// a fading copy of the logo behind, so it looks like it duplicates itself along the way.
// Without motion (or JS) the tiles are simply there and the logo doesn't come.
const SPOTS = ["col-start-1 row-start-1", "col-start-2 row-start-2", "col-start-3 row-start-3"];
const LOGO = asset("/badges/verdy-bunny.svg");
const SIZE = 40;

export function HeroTiles({ tiles, tileClass }: { tiles: Tile[]; tileClass: string }) {
  const box = useRef<HTMLDivElement>(null);
  const bunny = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = box.current;
    const me = bunny.current;
    if (!root || !me) return;
    const reveal = () => {
      root.classList.remove("hop-pending");
      document.querySelector("[data-hop-home]")?.classList.add("is-home");
      document.querySelector(".bunny-nn")?.classList.add("is-on");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return reveal();

    let alive = true;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".hop-tile"));
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // where her feet go: the top middle of a tile, or a point in the grid
    const onTile = (el: HTMLElement) => [el.offsetLeft + el.offsetWidth / 2, el.offsetTop + 2] as const;
    const place = (x: number, y: number) => `translate(${x - SIZE / 2}px, ${y - SIZE}px)`;

    // one jump along a little arc: crouch, fly (leaning forward), land with a squash
    const hop = async (from: readonly [number, number], to: readonly [number, number], high: number, ms: number) => {
      const frames: Keyframe[] = [];
      const lean = to[0] >= from[0] ? 1 : -1;
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const x = from[0] + (to[0] - from[0]) * t;
        const y = from[1] + (to[1] - from[1]) * t - high * 4 * t * (1 - t);
        const squash = i === 0 ? "scale(1.1, 0.85)" : i === 10 ? "scale(1.12, 0.82)" : "scale(0.94, 1.08)";
        const tilt = i === 0 || i === 10 ? 0 : (t < 0.5 ? -8 : 6) * lean;
        frames.push({ transform: `${place(x, y)} rotate(${tilt}deg) ${squash}`, offset: t });
      }
      // a fading copy of the logo at the top of the jump
      const apex = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - high] as const;
      const t = setTimeout(() => alive && ghost(apex), ms / 2);
      await me.animate(frames, { duration: ms, easing: "linear", fill: "forwards" }).finished;
      clearTimeout(t);
      await me.animate(
        [{ transform: `${place(...to)} scale(1.12, 0.82)` }, { transform: `${place(...to)} scale(1)` }],
        { duration: 160, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" },
      ).finished;
    };

    // a copy of the logo left behind, which fades away (and floats up a touch)
    const ghost = (at: readonly [number, number]) => {
      const g = document.createElement("img");
      g.src = LOGO;
      g.alt = "";
      g.className = "hop-ghost";
      g.style.transform = place(...at);
      root.appendChild(g);
      g.animate(
        [
          { opacity: 0.55, transform: `${place(...at)} scale(1)` },
          { opacity: 0, transform: `${place(at[0], at[1] - 8)} scale(0.85)` },
        ],
        { duration: 700, easing: "ease-out", fill: "forwards" },
      ).finished.then(() => g.remove());
    };

    // a little puff of dust on each side of a landing
    const puff = (at: readonly [number, number]) => {
      for (const side of [-1, 1]) {
        const d = document.createElement("span");
        d.className = "hop-dust";
        d.style.cssText = `left:${at[0]}px;top:${at[1]}px`;
        root.appendChild(d);
        d.animate(
          [
            { transform: "translate(-50%, -50%) scale(0.3)", opacity: 0.7 },
            { transform: `translate(calc(-50% + ${side * 22}px), calc(-50% - 6px)) scale(1.3)`, opacity: 0 },
          ],
          { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        ).finished.then(() => d.remove());
      }
    };

    // the tile pops up under her feet
    const pop = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.animate(
        [
          { transform: "translateY(10px) scale(0.6)", opacity: 0 },
          { transform: "translateY(0) scale(1.08, 0.88)", opacity: 1, offset: 0.55 },
          { transform: "scale(0.98, 1.04)", offset: 0.8 },
          { transform: "none" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    };

    (async () => {
      await wait(600);
      if (!alive) return;
      // it jumps out of the little logo in the menu; the big profile picture on the right stays
      // hidden until it leaps in there at the end
      const home = document.querySelector<HTMLElement>("[data-hop-home]");
      const rel = (el: Element | null, fy: number): readonly [number, number] | null => {
        if (!el) return null;
        const r = root.getBoundingClientRect();
        const b = el.getBoundingClientRect();
        return [b.left + b.width / 2 - r.left, b.top + b.height * fy - r.top];
      };
      const homeAt = () => rel(home, 0.62);
      const showHome = () => {
        if (!home) return;
        home.classList.add("is-home");
        home.animate(
          [
            { transform: "scale(0.5)", opacity: 0 },
            { transform: "scale(1.06, 0.95)", opacity: 1, offset: 0.55 },
            { transform: "scale(0.98, 1.03)", offset: 0.8 },
            { transform: "scale(1)" },
          ],
          { duration: 620, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
        );
      };
      const navLogo = document.querySelector(".nav-logo");
      const first = onTile(els[0]);
      const start = rel(navLogo, 1);
      let at: readonly [number, number] = start ?? [first[0] - 90, first[1] + 20];
      me.style.transform = place(...at);
      me.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: "forwards" });
      // first into the title: the "nn" of Bunny is empty until it lands there, and my
      // glasses (with their ears) pop in under its feet
      const nn = document.querySelector<SVGSVGElement>(".bunny-nn");
      const nnAt = rel(nn, 0.45);
      if (nn && nnAt) {
        await hop(at, nnAt, 50, 480);
        if (!alive) return;
        nn.classList.add("is-on");
        nn.animate(
          [
            { transform: "skewX(-9deg) scale(0.3)", opacity: 0 },
            { transform: "skewX(-9deg) scale(1.15, 0.85)", opacity: 1, offset: 0.55 },
            { transform: "skewX(-9deg) scale(0.97, 1.04)", offset: 0.8 },
            { transform: "skewX(-9deg) scale(1)" },
          ],
          { duration: 460, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
        );
        puff(nnAt);
        at = nnAt;
        await wait(200);
        if (!alive) return;
      }

      for (let i = 0; i < els.length && alive; i++) {
        // one jump onto the tile's spot
        const to = onTile(els[i]);
        await hop(at, to, 46, i === 0 ? 440 : 380);
        if (!alive) return;
        pop(els[i]);
        puff(to);
        at = to;
        await wait(i === els.length - 1 ? 180 : 90);
      }
      root.classList.remove("hop-pending");
      if (!alive) return;

      // last of all, one big leap home: into the big profile picture on the right
      const target = homeAt();
      if (!home || !target) {
        showHome();
        return me.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      }
      const grow = Math.max(1.5, (home.getBoundingClientRect().width * 0.55) / SIZE);
      const frames: Keyframe[] = [];
      for (let i = 0; i <= 14; i++) {
        const t = i / 14;
        const x = at[0] + (target[0] - at[0]) * t;
        const y = at[1] + (target[1] - at[1]) * t - 150 * 4 * t * (1 - t);
        // it grows as it flies and melts into the big picture as it arrives
        const sc = 1 + (grow - 1) * t * t;
        frames.push({
          transform: `${place(x, y)} rotate(${t < 0.5 ? -10 : 8}deg) scale(${i === 0 ? "1.1, 0.85" : sc})`,
          opacity: t < 0.75 ? 1 : 1 - (t - 0.75) / 0.25,
          offset: t,
        });
      }
      const flight = me.animate(frames, { duration: 640, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" });
      setTimeout(() => alive && ghost([at[0] + (target[0] - at[0]) * 0.3, at[1] - 110]), 190);
      await flight.finished;
      if (!alive) return;
      // and as it lands, the big profile picture pops in
      showHome();
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div ref={box} className="hop-pending relative mt-12 grid max-w-md grid-cols-3 grid-rows-3 gap-x-3 gap-y-2">
      {tiles.map((b, i) => (
        <a
          key={b.href}
          href={b.href}
          className={`${tileClass} ${SPOTS[i]} hop-tile hero-btn !flex-col !justify-center !gap-1 !px-2 !py-2 text-center !text-[13px] leading-tight sm:!text-sm`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(b.badge)} alt="" className="h-8 w-8" />
          {b.label}
        </a>
      ))}
      {/* the little copy of my profile logo that does the hopping */}
      <div ref={bunny} aria-hidden="true" className="hop-bunny">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="" width={SIZE} height={SIZE} className="h-full w-full rounded-full" />
      </div>
    </div>
  );
}
