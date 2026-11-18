"use client";

import { useRef, useState } from "react";
import { asset } from "../asset";
import { songs } from "../content";

// My songs: cover art you tap to play. Only one plays at a time; the playing cover spins
// slowly like a record and a little equaliser bounces next to its title.
export function Songs() {
  const [playing, setPlaying] = useState<string | null>(null);
  const players = useRef<Record<string, HTMLAudioElement | null>>({});

  const toggle = (file: string) => {
    Object.entries(players.current).forEach(([f, a]) => {
      if (a && f !== file) a.pause();
    });
    const a = players.current[file];
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(file);
    } else {
      a.pause();
      setPlaying(null);
    }
  };

  return (
    <div className="mt-14">
      <p className="plate">My songs ♪</p>
      <ul className="mt-5 grid gap-5 sm:grid-cols-3">
        {songs.map((s) => {
          const on = playing === s.file;
          return (
            <li key={s.file} className="rounded-3xl border border-line bg-sheet p-4 shadow-[0_14px_30px_-22px_rgb(31_107_69_/_0.55)]">
              <button
                type="button"
                onClick={() => toggle(s.file)}
                aria-pressed={on}
                aria-label={`${on ? "Pause" : "Play"} ${s.title}`}
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(s.cover)} alt="" className={`aspect-square w-full object-cover ${on ? "song-spin" : ""}`} />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sheet/90 text-xl text-pine shadow-lg transition-transform group-hover:scale-110">
                    {on ? "❚❚" : "▶"}
                  </span>
                </span>
              </button>
              <p className="display mt-3 flex items-center gap-2 text-lg text-pine">
                {s.title}
                {on && (
                  <span aria-hidden="true" className="song-eq flex h-3 items-end gap-[2px]">
                    <i /><i /><i /><i />
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-soft">{s.caption}</p>
              <audio
                ref={(el) => {
                  players.current[s.file] = el;
                }}
                src={asset(s.file)}
                preload="none"
                onEnded={() => setPlaying(null)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
