// Everything the site says lives here, so changing a word never means touching a layout.
// This site is public: only finished work and my own words about it, nothing private.

export const VERDESNAP_REPO = "https://github.com/VerdyBunny/VerdeSnap";
export const VERDESNAP_VERSION = "v0.2.0";
export const VERDESNAP_RELEASE = `${VERDESNAP_REPO}/releases/tag/${VERDESNAP_VERSION}`;
export const GITHUB_PROFILE = "https://github.com/VerdyBunny";
/** VerdeArt: images and video */
export const INSTAGRAM = "https://www.instagram.com/arty.verde/";
export const X_ART = "https://x.com/verdeArty";
/** VerdeSelf: information and words */
export const INSTAGRAM_SELF = "https://www.instagram.com/verde.self/";
export const SUBSTACK = "https://substack.com/@verdybunny";
/** one contact for all of Verde */
export const EMAIL = "hello.verdeuniverse@gmail.com";

export type Work = {
  title: string;
  kind: "MV" | "Video" | "Painting";
  caption: string;
  poster: string;
  video?: string;
  /** the MV gets the wide spot */
  wide?: boolean;
};

export const works: Work[] = [
  {
    title: "行走的鱼 ✧",
    kind: "MV",
    caption:
      "My first MV! A little fish shadow walking on land, in its mask and its too-big coat.",
    poster: "/art/fish-on-land.jpg",
    video: "/art/fish-on-land.mp4",
    wide: true,
  },
  {
    title: "dentro de mí vive una pequeña yo ✧",
    kind: "Video",
    caption: "A little nature elf inside me always finds me and leads me to the sunshine.",
    poster: "/art/little-me.jpg",
  },
  {
    title: "Reading on a bench ✧",
    kind: "Video",
    caption: "手帐 style: golden leaves falling, a book and this view.",
    poster: "/art/bench-journal.jpg",
    video: "/art/bench-journal.mp4",
  },
  {
    title: "It's MAGIC ✧",
    kind: "Video",
    caption: "The website won't work. I breathe, I manifest, and leaves burst out. hehe",
    poster: "/art/magic.jpg",
    video: "/art/magic.mp4",
  },
  {
    title: "cambiando de look ✧",
    kind: "Video",
    caption: "4 outfits, 1 pose, 1 me. Every look changes on the beat.",
    poster: "/art/looks.jpg",
    video: "/art/looks.mp4",
  },
  {
    title: "mis pasos ✧",
    kind: "Painting",
    caption: "Every day the same view down at my feet, like a cozy naive oil painting.",
    poster: "/art/mis-pasos.jpg",
  },
  {
    title: "trucha y aguacate ✧",
    kind: "Painting",
    caption: "A cozy dinner of mine, painted in the same naive style.",
    poster: "/art/trucha.jpg",
  },
];

export const journey = [
  { date: "3 Nov 2026", text: "VerdeUniverse begins" },
  { date: "5 Nov 2026", text: "My first MV: 行走的鱼" },
  { date: "6 Nov 2026", text: "My first tool is out: VerdeSnap v0.1.0" },
  { date: "6 Nov 2026", text: "This website goes live" },
  { date: "16 Nov 2026", text: "Verdy Bunny 🐰👓 is born, and so is my Substack" },
  { date: "18 Nov 2026", text: "My first update: VerdeSnap v0.2.0" },
];

export type Song = { title: string; caption: string; cover: string; file: string };

/** my own songs (made 16 Nov 2026), as Verdy Bunny */
export const songs: Song[] = [
  {
    title: "Winter Freedom ✧",
    caption: "My first beat: UK garage meets K-pop, 132 BPM, swung hats and dreamy organ stabs. Made from pure code ❄️",
    cover: "/music/winter-freedom.svg",
    file: "/music/winter-freedom.mp3",
  },
  {
    title: "Winter Freedom (chop) ✧",
    caption: "Airy Y2K, a bouncy Jersey-club beat at 140 BPM, and the hook is my own voice, cut into syllables and tuned into a new melody 🐰💙",
    cover: "/music/winter-freedom-chop.svg",
    file: "/music/winter-freedom-chop.mp3",
  },
  {
    title: "WAAA (demo) ✧",
    caption: "My sarcastic anger song: sweet on the outside, savage on the inside. The WAAA screams in 中文, English and Español 哇! Wah! ¡Guaa!",
    cover: "/music/waaa.svg",
    file: "/music/waaa-demo.mp3",
  },
];

/** cover: the essay's picture in public/essays/<slug>/, if it has one */
export type Essay = { slug: string; title: string; date: string; line: string; cover?: string };

/** some of my "Real me" essays (VerdeSelf), newest first; each has its own page at /essays/<slug> */
export const essays: Essay[] = [
  { slug: "soil-and-the-house", cover: "image.jpg", title: "The Soil and the House", date: "11 Nov 2026", line: "What do I really want from a relationship? The soil first, then the house you build on it." },
  { slug: "defaults-not-destiny", cover: "image.jpg", title: "Defaults, Not Destiny: Love, Power, and Patriarchy", date: "11 Nov 2026", line: "Even a short, sweet relationship showed me something deep about the defaults we grow up with." },
];
