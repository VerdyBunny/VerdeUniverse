import Link from "next/link";
import { asset } from "./asset";
import { BunnyHero } from "./components/BunnyHero";
import { ChapterMotion } from "./components/ChapterMotion";
import { FloatingNav } from "./components/FloatingNav";
import { HeroTiles } from "./components/HeroTiles";
import { Frequency } from "./components/Frequency";
import { ArtStudio } from "./components/ArtStudio";
import { Reveal } from "./components/Reveal";
import { SnapVideo } from "./components/SnapVideo";
import { SocialChips, type SocialLink } from "./components/Social";
import {
  EMAIL,
  GITHUB_PROFILE,
  INSTAGRAM,
  INSTAGRAM_SELF,
  SUBSTACK,
  VERDESNAP_RELEASE,
  VERDESNAP_REPO,
  VERDESNAP_VERSION,
  X_ART,
  essays,
} from "./content";

// buttons are little cards too: a card peeks out behind each one (btn-card in globals.css)
const solid =
  "btn-card btn-solid inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-on-pine";
const outline =
  "btn-card btn-outline inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-pine";

const features = [
  ["Alt + A", "Snip anything, the same shortcut as WeChat"],
  ["Adjust", "Resize the snip area after you draw it"],
  ["Mark", "Draw on it before you share it"],
  ["Read", "Pull the text out of any screenshot"],
  ["Translate", "With any AI you point it to, now faster"],
];

export default function Home() {
  return (
    <main>
      <FloatingNav />
      <ChapterMotion />

      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-14 pt-4 md:px-8 lg:grid-cols-[1fr_1fr] lg:pb-6 lg:pt-10"
      >
        <div>
          <p className="plate rise whitespace-nowrap" style={{ "--i": 0 } as React.CSSProperties}>
            你好 · hola · hi
          </p>
          <h1 className="display mt-6 text-[clamp(2.9rem,7.4vw,5.6rem)] font-semibold leading-[1.05] text-pine">
            <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>Hi, I&apos;m</span>
            <span className="rise block" style={{ "--i": 2 } as React.CSSProperties}>
              Verdy{" "}
              <span className="hero-bunny italic text-forest">
                <span className="sr-only">Bunny</span>
                {/* "Bunny" with its "nn" drawn as my round glasses, and bunny ears standing up from them */}
                <span aria-hidden="true">
                  Bu
                  <svg className="bunny-nn" viewBox="2 0 120 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <g strokeWidth="8.5">
                      <path className="bunny-ear-l" d="M24 48 C6 16 6 -40 20 -74 C38 -40 40 16 40 46" />
                      <path className="bunny-ear-r" d="M84 46 C84 16 86 -40 104 -74 C118 -40 118 16 100 48" />
                    </g>
                    <g strokeWidth="10.5">
                      <circle cx="31" cy="71" r="25" fill="#c6ff3d" fillOpacity="0.4" />
                      <circle cx="93" cy="71" r="25" fill="#c6ff3d" fillOpacity="0.4" />
                      <path d="M56 67 Q62 59 68 67" />
                    </g>
                    <path d="M20 66 L28 58 M82 66 L90 58" stroke="#f6faef" strokeWidth="4.5" />
                  </svg>
                  y
                </span>
              </span>
            </span>
          </h1>
          <HeroTiles
            tileClass={outline}
            tiles={[
              { href: "#toolkit", label: "See my tools", badge: "/badges/verde-toolkit.svg" },
              { href: "#art", label: "See my art", badge: "/badges/verde-art.svg" },
              { href: "#self", label: "Read my thoughts", badge: "/badges/verde-self.svg" },
            ]}
          />
        </div>
        <div className="rise" style={{ "--i": 2 } as React.CSSProperties}>
          <BunnyHero />
        </div>
      </section>

      {/* ── Chapter I · VerdeToolKit ── */}
      <section id="toolkit" className="chapter chapter-tools">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Chapter
            n="Chapter I"
            name="VerdeToolKit"
            badge="/badges/verde-toolkit.svg"
            line="Little tools I build for real everyday problems."
            social={[
              { kind: "github", label: "VerdyBunny", href: GITHUB_PROFILE },
              { kind: "github", label: "VerdeSnap releases", href: VERDESNAP_RELEASE },
            ]}
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <div className="deal" style={{ "--d": "180ms" } as React.CSSProperties}>
              <h3 className="display text-4xl font-semibold leading-tight text-pine md:text-5xl">VerdeSnap</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                My first tool. A Windows screenshot app that snips, marks up, reads the text and translates it.
              </p>
              <dl className="mt-6 max-w-md divide-y divide-line border-y border-line">
                {features.map(([name, text]) => (
                  <div key={name} className="flex gap-4 py-2.5 text-sm">
                    <dt className="w-20 shrink-0 font-semibold text-pine">{name}</dt>
                    <dd className="text-ink-soft">{text}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={VERDESNAP_RELEASE} target="_blank" rel="noreferrer" className={solid}>
                  Download {VERDESNAP_VERSION} →
                </a>
                <a href={`${VERDESNAP_REPO}/releases`} target="_blank" rel="noreferrer" className={outline}>
                  All releases
                </a>
              </div>
              <p className="mt-3 text-xs text-ink-soft">For Windows. To translate, connect any OpenAI-compatible AI.</p>
            </div>
            <div className="deal" style={{ "--d": "320ms" } as React.CSSProperties}>
              <SnapVideo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter II · VerdeArt ── */}
      <section id="art" className="chapter chapter-art">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Chapter
            n="Chapter II"
            name="VerdeArt"
            badge="/badges/verde-art.svg"
            line="Little stories, songs and paintings, made with a lot of feeling."
            social={[
              { kind: "instagram", label: "@arty.verde", href: INSTAGRAM },
              { kind: "x", label: "@verdeArty", href: X_ART },
            ]}
          />
          <div className="deal mt-12" style={{ "--d": "180ms" } as React.CSSProperties}>
            <ArtStudio />
          </div>
        </div>
      </section>

      {/* ── Chapter III · VerdeSelf ── */}
      <section id="self" className="chapter chapter-self">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Chapter
            n="Chapter III"
            name="VerdeSelf"
            badge="/badges/verde-self.svg"
            line="I write the thoughts I used to keep quiet. Somewhere, someone hums the same note, and finds their way here."
            social={[
              { kind: "substack", label: "@verdybunny", href: SUBSTACK },
              { kind: "instagram", label: "@verde.self", href: INSTAGRAM_SELF },
            ]}
          />
          <div className="deal" style={{ "--d": "160ms" } as React.CSSProperties}>
            <Frequency />
          </div>
          <p className="plate mt-12">Real me · some of my essays</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {essays.map((e, i) => {
              // the first essay is a wide card only when that leaves no gap beside the last one
              const wide = i === 0 && essays.length % 2 === 1;
              return (
              <li key={e.title} className={`deal ${wide ? "md:col-span-2" : ""}`} style={{ "--d": `${200 + i * 110}ms` } as React.CSSProperties}>
                <div className="h-full">
                  <Link href={`/essays/${e.slug}`} className={`essay-card group flex h-full flex-col ${wide ? "md:flex-row" : ""}`}>
                    {/* the cover: the essay's own picture, or my VerdeSelf bunny when it has none */}
                    <span className={`essay-cover ${wide ? "aspect-[16/9] md:aspect-auto md:w-[46%] md:shrink-0" : "aspect-[16/9]"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(e.cover ? `/essays/${e.slug}/${e.cover}` : "/badges/verde-self.svg")}
                        alt=""
                        loading="lazy"
                        className={e.cover ? "h-full w-full object-cover" : "h-20 w-20"}
                      />
                    </span>
                    <span className="essay-body flex min-w-0 flex-1 flex-col">
                    <span className="essay-date text-xs tabular-nums">{e.date}</span>
                    <span className={`essay-title display mt-1 block leading-snug ${wide ? "text-3xl md:text-4xl" : "text-2xl"}`}>{e.title}</span>
                    <span className="essay-line mt-2 block text-[15px] leading-relaxed">{e.line}</span>
                    <span className="essay-more mt-auto inline-flex pt-4 items-center gap-1 text-sm font-semibold">
                      Read the essay <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                    </span>
                  </Link>
                </div>
              </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* the fourth card of the deck: where to find me, as a plain list */}
      <footer id="hi" className="chapter chapter-hi">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "VerdeToolKit", badge: "/badges/verde-toolkit.svg", social: [{ kind: "github" as const, label: "GitHub", href: GITHUB_PROFILE }] },
              { name: "VerdeArt", badge: "/badges/verde-art.svg", social: [{ kind: "instagram" as const, label: "Instagram", href: INSTAGRAM }, { kind: "x" as const, label: "X", href: X_ART }] },
              { name: "VerdeSelf", badge: "/badges/verde-self.svg", social: [{ kind: "substack" as const, label: "Substack", href: SUBSTACK }, { kind: "instagram" as const, label: "Instagram", href: INSTAGRAM_SELF }] },
              { name: "Say hi", badge: "/badges/verdy-bunny.svg", social: [{ kind: "email" as const, label: "Email me", href: `mailto:${EMAIL}` }] },
            ].map((g) => (
              <div key={g.name}>
                <p className="flex items-center gap-2 font-semibold text-pine">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(g.badge)} alt="" className="h-7 w-7 rounded-full" />
                  {g.name}
                </p>
                <div className="mt-3">
                  <SocialChips links={g.social} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-soft">Made by me, Verdy Bunny ✧</p>
        </div>
      </footer>
    </main>
  );
}

/** the opening of each chapter: its bunny, its name, one line and its social media.
 *  The bunny hops when I land here from a button (the section is the URL #target). */
function Chapter({ n, name, badge, line, social }: { n: string; name: string; badge: string; line: string; social: SocialLink[] }) {
  return (
    <div className="deal flex flex-col gap-5 md:flex-row md:items-end md:justify-between" style={{ "--d": "60ms" } as React.CSSProperties}>
      <div className="contents">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(badge)} alt="" className="chapter-logo h-16 w-16 shrink-0 md:h-20 md:w-20" />
          <div className="min-w-0">
            <p className="plate">{n}</p>
            <h2 className="display text-4xl font-semibold leading-tight text-pine md:text-5xl">{name}</h2>
            <p className="mt-1 max-w-xl text-ink-soft">{line}</p>
          </div>
        </div>
        <SocialChips links={social} />
      </div>
    </div>
  );
}
