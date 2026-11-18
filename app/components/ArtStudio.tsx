"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../asset";
import { INSTAGRAM, X_ART, songs, works, type Song, type Work } from "../content";

// VerdeArt as my studio, in the same style as the studio in my craft app: a sky-to-mint
// header card with film grain and a chrome STUDIO title, four picture tiles for the rooms,
// and one room at a time: happy moments (tilted sticker cards, a hover plays them silently),
// my MV, my gallery (paintings framed on a museum wall) and my music (my schWAAA artist
// banner and each song as a record sleeve whose vinyl slides out and spins while it plays).
type RoomId = "moments" | "mvs" | "gallery" | "music";
const TILTS = [-1, 1.2, -0.6, 0.8, -0.4];

export function ArtStudio() {
  const moments = works.filter((w) => w.kind === "Video");
  const mvs = works.filter((w) => w.kind === "MV");
  const paintings = works.filter((w) => w.kind === "Painting");
  const rooms: { id: RoomId; label: string; count: number; thumb: string }[] = [
    { id: "moments", label: "Moments", count: moments.length, thumb: "/studio/room-moments.svg" },
    { id: "mvs", label: "MVs", count: mvs.length, thumb: "/studio/room-mvs.svg" },
    { id: "gallery", label: "Gallery", count: paintings.length, thumb: "/studio/room-gallery.svg" },
    { id: "music", label: "Music", count: songs.length, thumb: "/studio/room-music.svg" },
  ];
  const [room, setRoom] = useState<RoomId>("moments");
  const [open, setOpen] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <div className="journal-page rounded-[2.25rem] border border-line p-3 md:p-5">
      <header className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_35%_0%,rgba(255,247,214,0.85),transparent_45%),linear-gradient(135deg,#dff3ff,#bfe3e8_50%,#8fd3b5)] p-5 md:p-7">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3] mix-blend-overlay">
          <filter id="studio-grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#studio-grain)" />
        </svg>
        <div className="relative grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/badges/bunny-mark.svg")} alt="" className="h-9 w-7" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-pine">Verde ✧ studio · by schWAAA</p>
            </div>
            <h2 className="studio-chrome mt-2 text-[clamp(3rem,9vw,7rem)] font-bold uppercase leading-[0.85] tracking-[-0.06em]">Studio</h2>
            <p className="mt-3 max-w-md text-sm text-pine">Little stories, songs and paintings, made with a lot of feeling.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full bg-pine px-4 py-1.5 text-xs font-semibold text-on-pine">
                @arty.verde on Instagram →
              </a>
              <a href={X_ART} target="_blank" rel="noreferrer" className="rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-pine backdrop-blur">
                @verdeArty on X
              </a>
            </div>
          </div>
          {/* the four rooms as picture tiles */}
          <nav aria-label="studio" className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {rooms.map((r) => {
              const on = r.id === room;
              return (
                <button key={r.id} type="button" onClick={() => setRoom(r.id)} aria-pressed={on} className="group text-left">
                  <span
                    className={`relative block aspect-square w-full overflow-hidden rounded-2xl bg-white/50 transition duration-300 sm:w-28 lg:w-32 ${
                      on ? "ring-[3px] ring-[#c6ff3d] shadow-[0_0_24px_rgba(198,255,61,0.55)]" : "opacity-80 ring-1 ring-white/60 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(r.thumb)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-black/45 px-1.5 text-[10px] font-bold tabular-nums text-white backdrop-blur">{r.count}</span>
                  </span>
                  <span className={`mt-1.5 block text-center text-[11px] font-semibold ${on ? "text-pine" : "text-pine/70"}`}>{r.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <div key={room} className="studio-room">
        {room === "moments" && (
          <div className="grid grid-cols-2 gap-3 p-2 pt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {moments.map((w, i) => (
              <div key={w.title} className="deal-in" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <Moment work={w} tilt={TILTS[i % TILTS.length]} onOpen={() => setOpen(w)} />
              </div>
            ))}
          </div>
        )}
        {room === "mvs" && (
          <div className="grid gap-4 p-2 pt-6 md:grid-cols-2">
            {mvs.map((w) => (
              <Moment key={w.title} work={w} tilt={0} wide onOpen={() => setOpen(w)} />
            ))}
          </div>
        )}
        {room === "gallery" && (
          <div className="gallery-wall mt-6 rounded-[1.75rem] px-4 pb-16 pt-12 md:px-10 md:pt-16">
            <div className="flex flex-wrap items-end justify-center gap-x-12 gap-y-16 md:gap-x-20">
              {paintings.map((w, i) => (
                <figure key={w.title} style={{ "--d": `${i * 140}ms` } as React.CSSProperties} className="deal-in flex w-full max-w-[min(100%,24rem)] flex-col items-center sm:w-auto">
                  <button type="button" onClick={() => setOpen(w)} aria-label={w.title} className="gallery-spot group relative block">
                    <span className="gallery-frame block transition-transform duration-500 group-hover:-translate-y-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset(w.poster)} alt={w.title} loading="lazy" className="block max-h-[52vh] w-full object-contain sm:w-auto sm:max-w-[20rem]" />
                    </span>
                  </button>
                  <figcaption className="gallery-label mt-6 w-full max-w-[16rem] text-left">
                    <p className="text-sm font-semibold leading-snug text-ink">{w.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">AI painting</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">{w.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
        {room === "music" && (
          <div className="p-2 pt-6">
            <ArtistBanner />
            <div className="mx-auto grid max-w-5xl justify-items-center gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {songs.map((s, i) => (
                <div key={s.file} className="deal-in w-full max-w-[19rem]" style={{ "--d": `${200 + i * 110}ms` } as React.CSSProperties}>
                  <Record song={s} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(92vw,960px)] rounded-2xl bg-sheet p-3 text-ink backdrop:bg-[#0e1a17]/70"
      >
        {open && (
          <>
            {open.video ? (
              <video src={asset(open.video)} poster={asset(open.poster)} controls autoPlay playsInline className="max-h-[76vh] w-full rounded-xl bg-[#0e1a17] object-contain" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(open.poster)} alt={open.title} className="max-h-[76vh] w-full rounded-xl object-contain" />
            )}
            <div className="flex items-start justify-between gap-4 px-1 pt-3">
              <div className="min-w-0">
                <p className="display text-xl">{open.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{open.caption}</p>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="shrink-0 rounded-full border border-line px-3 py-1 text-sm font-semibold text-forest">
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

/** a happy moment (9:16) or my MV (16:9): a tilted sticker card; a mouse hover plays it silently */
function Moment({ work, tilt, wide = false, onOpen }: { work: Work; tilt: number; wide?: boolean; onOpen: () => void }) {
  const [preview, setPreview] = useState(false);
  return (
    <figure className="studio-card p-2" style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}>
      <button
        type="button"
        onClick={onOpen}
        onPointerEnter={(e) => e.pointerType === "mouse" && !!work.video && setPreview(true)}
        onPointerLeave={() => setPreview(false)}
        aria-label={`Play: ${work.title}`}
        className={`group relative block w-full overflow-hidden rounded-md bg-sprout ${wide ? "aspect-video" : "aspect-[9/16]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(work.poster)} alt="" loading="lazy" className="h-full w-full object-cover" />
        {preview && work.video && (
          <video src={asset(work.video)} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        )}
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 pl-0.5 text-sm text-pine shadow transition-opacity group-hover:opacity-0">▶</span>
      </button>
      <figcaption className="px-1 pt-2">
        <p className="text-sm font-semibold leading-snug text-ink">{work.title}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink-soft">{work.caption}</p>
      </figcaption>
    </figure>
  );
}

/** my artist page, like a streaming profile: a grainy dark-green banner with a lime glow */
function ArtistBanner() {
  const playFirst = () => {
    const all = document.querySelectorAll<HTMLAudioElement>("audio[data-track]");
    all.forEach((a, i) => i > 0 && a.pause());
    void all[0]?.play();
  };
  return (
    <div className="relative mx-auto mb-12 max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-40px_rgba(31,107,69,0.9)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(198,255,61,0.35),transparent_45%),radial-gradient(circle_at_10%_100%,rgba(156,201,245,0.35),transparent_50%),linear-gradient(135deg,#0d1411,#14271d_45%,#1f6b45)]" />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-overlay">
        <filter id="artist-grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#artist-grain)" />
      </svg>
      <div className="relative flex flex-col items-center gap-5 px-6 py-8 text-center sm:flex-row sm:items-end sm:gap-7 sm:px-10 sm:py-10 sm:text-left">
        <span className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_0_0_6px_rgba(198,255,61,0.25),0_20px_40px_-18px_rgba(0,0,0,0.8)] sm:h-40 sm:w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/badges/verdy-bunny.svg")} alt="" className="h-full w-full" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#c6ff3d] sm:justify-start">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c6ff3d] text-[9px] text-[#0d1411]">✓</span>
            Artist · Verdy Bunny
          </p>
          <h3 className="mt-1 text-5xl font-bold tracking-tighter text-white md:text-7xl">schWAAA</h3>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {["UK garage", "Jersey club", "Y2K"].map((g) => (
              <span key={g} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur">{g}</span>
            ))}
            <span className="rounded-full bg-[#c6ff3d]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#c6ff3d]">{songs.length} songs</span>
          </div>
        </div>
        <button
          type="button"
          onClick={playFirst}
          aria-label="Play"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c6ff3d] pl-1 text-xl text-[#0d1411] shadow-[0_12px_30px_-10px_rgba(198,255,61,0.7)] transition-transform duration-300 hover:scale-105"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

/** a song as a record: the cover is the sleeve, the vinyl slides out and spins while it plays */
function Record({ song }: { song: Song }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      document.querySelectorAll<HTMLAudioElement>("audio[data-track]").forEach((o) => o !== a && o.pause());
      void a.play();
    } else a.pause();
  };
  return (
    <figure className="group w-full max-w-[19rem]">
      <div className="relative">
        <span
          aria-hidden="true"
          className={`absolute inset-y-[4%] left-[8%] aspect-square rounded-full bg-[repeating-radial-gradient(circle,#161c19_0_2px,#26302b_2px_3px)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 ${
            playing ? "translate-x-[38%]" : "translate-x-0 group-hover:translate-x-[18%]"
          }`}
        >
          <span className={`absolute inset-[34%] rounded-full bg-lime ${playing ? "record-spin" : ""}`}>
            <span className="absolute inset-[42%] rounded-full bg-[#161c19]" />
          </span>
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"}: ${song.title}`}
          className="relative block aspect-square w-[84%] overflow-hidden rounded-2xl bg-pine shadow-[0_22px_40px_-24px_rgba(31,107,69,0.9)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(song.cover)} alt="" className="h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-sm text-pine shadow-lg backdrop-blur">
            {playing ? "❚❚" : "▶"}
          </span>
        </button>
      </div>
      <figcaption className="mt-4 w-[84%]">
        <p className="truncate text-sm font-bold text-pine">{song.title}</p>
        <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{song.caption}</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-sprout">
          <div className="h-full rounded-full bg-forest transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      </figcaption>
      <audio
        ref={audio}
        data-track
        src={asset(song.file)}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => (setPlaying(false), setProgress(0))}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
      />
    </figure>
  );
}
