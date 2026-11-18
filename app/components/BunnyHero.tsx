// The hero: my profile picture, big. Verdy Bunny's own mark (long ears over round glasses,
// one neon-lime line on near-black), as a tilted tile on the page. It's alive in small ways:
// it hops now and then, the ears flop as it lands, a shine sweeps across the glasses like a
// blink, and little sparkles twinkle around it. Motion is CSS (bh-*) and stops with reduced motion.
const sparkles: [number, number, number, number][] = [
  [36, 92, 10, 0], [372, 70, 13, 0.8], [384, 300, 9, 1.6], [24, 318, 12, 2.4], [330, 392, 8, 3.2], [92, 396, 7, 1.2],
];

const Sparkle = ({ x, y, s, d }: { x: number; y: number; s: number; d: number }) => (
  <path
    className="bh-sparkle"
    style={{ animationDelay: `${d}s` }}
    fill="var(--leaf)"
    d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`}
  />
);

export function BunnyHero() {
  return (
    <div data-hop-home className="relative mx-auto aspect-square w-full max-w-[360px]">
      <svg viewBox="0 0 410 410" className="h-full w-full overflow-visible" role="img" aria-label="Verdy Bunny: a bunny with long ears and round glasses">
        <defs>
          <clipPath id="lens-l"><circle cx="-17" cy="12" r="14" /></clipPath>
          <clipPath id="lens-r"><circle cx="17" cy="12" r="14" /></clipPath>
        </defs>

        {sparkles.map(([x, y, s, d], i) => (
          <Sparkle key={i} x={x} y={y} s={s} d={d} />
        ))}

        {/* my profile picture, round like an avatar */}
        <g className="bh-tile">
          <circle cx="205" cy="205" r="168" fill="#173b29" />
          <g className="bh-hop">
            <g transform="translate(205 262) scale(2.05)">
              <g clipPath="url(#lens-l)">
                <rect className="bh-glint" x="-36" y="-8" width="5" height="40" fill="#C6FF3D" opacity="0.35" transform="rotate(25 -17 12)" />
              </g>
              <g clipPath="url(#lens-r)">
                <rect className="bh-glint" x="-2" y="-8" width="5" height="40" fill="#C6FF3D" opacity="0.35" transform="rotate(25 17 12)" />
              </g>
              <g fill="none" stroke="#C6FF3D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path className="bh-ear-l" d="M-14 -6 C-30 -40 -30 -78 -18 -86 C-6 -78 -4 -40 -8 -6" />
                <path className="bh-ear-r" d="M14 -6 C30 -40 30 -78 18 -86 C6 -78 4 -40 8 -6" />
                <circle cx="-17" cy="12" r="14" />
                <circle cx="17" cy="12" r="14" />
                <path d="M-3 10 Q0 6 3 10" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
