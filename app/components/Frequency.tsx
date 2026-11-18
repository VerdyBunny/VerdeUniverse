// My frequency: the waves I vibrate at. Three layered sine waves drift sideways at different
// speeds (each path is two wavelengths wide, so the loop is seamless), and one brighter lime
// wave glows over them, like a signal tuning in. Motion is CSS (fq-*) and stops with reduced motion.
function wave(amp: number, len: number, y: number, width = 1200) {
  // a sine-ish wave made of quadratic curves, twice the drawn width so it can slide and loop
  let d = `M0 ${y}`;
  for (let x = 0; x < width * 2; x += len) {
    d += ` Q${x + len / 4} ${y - amp} ${x + len / 2} ${y} T${x + len} ${y}`;
  }
  return d;
}

export function Frequency() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem]" aria-hidden="true">
      <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="block h-28 w-full md:h-36">
        <g fill="none" strokeLinecap="round">
          <path className="fq fq-slow" d={wave(22, 240, 80)} stroke="var(--line)" strokeWidth="2" />
          <path className="fq fq-mid" d={wave(34, 180, 80)} stroke="var(--leaf)" strokeWidth="2.5" opacity="0.55" />
          <path className="fq fq-fast" d={wave(46, 300, 80)} stroke="var(--pine)" strokeWidth="2" opacity="0.35" />
          <path className="fq fq-me" d={wave(40, 200, 80)} stroke="#C6FF3D" strokeWidth="4" />
        </g>
      </svg>
      <p className="absolute bottom-3 right-5 text-xs font-bold uppercase tracking-[0.3em] text-forest">
        my <span className="fq-mark">frequency</span>
      </p>
    </div>
  );
}
