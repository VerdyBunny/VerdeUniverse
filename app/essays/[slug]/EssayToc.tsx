"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string; level: 2 | 3 };

// The side menu of an essay: its headings, with the one I'm reading lit up.
// On a phone it folds into a small "In this essay" list above the text.
export function EssayToc({ items, variant }: { items: TocItem[]; variant: "side" | "inline" }) {
  const [on, setOn] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (variant !== "side") return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(e.target.id)),
      { rootMargin: "0px 0px -70% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items, variant]);

  if (!items.length) return null;

  const list = (
    <ol className="space-y-1">
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} className={`toc-link ${i.level === 3 ? "pl-6" : ""} ${on === i.id && variant === "side" ? "is-on" : ""}`}>
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline")
    return (
      <details className="mb-8 rounded-2xl border border-line bg-sheet px-4 py-3 lg:hidden">
        <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">In this essay</summary>
        <div className="mt-3">{list}</div>
      </details>
    );

  return (
    <nav className="sticky top-8">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">In this essay</p>
      {list}
    </nav>
  );
}
