"use client";

import { useEffect, useState } from "react";
import { asset } from "../asset";

// The menu as the top card of a deck (the page is a deck of chapter cards): my logo on the left,
// and each chapter a mini card with its bunny. The chapter I'm in lifts out of the deck in its colour.
const links = [
  { href: "#toolkit", label: "Tools", badge: "/badges/verde-toolkit.svg", tint: "#eef6e4" },
  { href: "#art", label: "Art", badge: "/badges/verde-art.svg", tint: "#e9f4f2" },
  { href: "#self", label: "Self", badge: "/badges/verde-self.svg", tint: "#e4efe2" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // light up the link of the section that's in the middle of the screen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    const top = document.querySelector("#top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setCurrent(null), { rootMargin: "-45% 0px -50% 0px" });
    if (top) topIo.observe(top);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  return (
    <>
    {/* keeps the page from sliding under the menu */}
    <div aria-hidden="true" className="h-24" />
    <div className="nav-drop pointer-events-none fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      {/* the menu as the top card of a deck: two more cards peek out behind it */}
      <header className={`nav-deck pointer-events-auto mx-auto flex items-center justify-between gap-3 transition-all duration-300 ${scrolled ? "is-scrolled max-w-3xl" : "max-w-4xl"}`}>
        <a href="#top" className="flex min-w-0 items-center gap-2.5 pl-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/badges/verdy-bunny.svg")} alt="Verdy Bunny" className="nav-logo h-10 w-10 shrink-0 rounded-full" />
          <span className="nav-name display truncate text-xl md:text-2xl">VerdeUniverse</span>
        </a>
        <nav className="flex items-center gap-2 text-[15px] font-semibold">
          {links.map((l) => {
            const on = current === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "location" : undefined}
                className={`nav-card flex items-center gap-2 px-3 py-2 ${on ? "is-on" : ""}`}
                style={{ "--tint": l.tint } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(l.badge)} alt="" className="h-6 w-6" />
                <span className="hidden sm:inline">{l.label}</span>
              </a>
            );
          })}
        </nav>
      </header>
    </div>
    </>
  );
}
