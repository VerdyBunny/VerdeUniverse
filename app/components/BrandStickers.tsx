import { asset } from "../asset";

// My brands as stickers on the page: each one tilted a little, with a bit of washi tape.
// They hop when I hover them (bs-* in globals.css). VerdeCraft stays off until it's public.
const brands = [
  { name: "VerdeKit", line: "Little tools I build. VerdeSnap v0.2.0 is out", badge: "/badges/verde-toolkit.svg", href: "#toolkit", tilt: -3 },
  { name: "VerdeArt", line: "Little stories, songs and paintings ♪", badge: "/badges/verde-art.svg", href: "#art", tilt: 2 },
  { name: "VerdeSelf", line: "My real thoughts and essays", badge: "/badges/verde-self.svg", href: "#self", tilt: -1.5 },
];

export function BrandStickers() {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 pb-16 sm:grid-cols-3 md:gap-6 md:px-8">
      {brands.map((b, i) => {
        const body = (
          <>
            <span aria-hidden="true" className="bs-tape" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(b.badge)} alt="" className="bs-logo h-14 w-14" />
            <span className="display mt-3 block text-xl text-pine">{b.name}</span>
            <span className="mt-1 block text-sm leading-snug text-ink-soft">{b.line}</span>
          </>
        );
        return (
          <li key={b.name} className="bs-in" style={{ "--i": i, "--tilt": `${b.tilt}deg` } as React.CSSProperties}>
            {b.href ? (
              <a href={b.href} className="bs-card">
                {body}
              </a>
            ) : (
              <div className="bs-card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
