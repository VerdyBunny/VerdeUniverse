import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { asset } from "../../asset";
import { essays } from "../../content";
import { getEssay, slugify } from "../data";
import { EssayToc } from "./EssayToc";
import type { ReactNode } from "react";

// plain text of a heading, for its id
const textOf = (n: ReactNode): string =>
  typeof n === "string" || typeof n === "number" ? String(n) : Array.isArray(n) ? n.map(textOf).join("") : n && typeof n === "object" && "props" in n ? textOf((n.props as { children?: ReactNode }).children) : "";

// One "Real me" essay: the same quiet long-read look as the essay pages in my craft app.
// Serif text, understated headings, quiet pull-quotes, pictures as captioned figures.

export const dynamicParams = false;
export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = essays.find((x) => x.slug === slug);
  return e ? { title: `${e.title} · VerdeSelf`, description: e.line } : {};
}

const PROSE = [
  "font-serif text-[17px] leading-[1.9] text-[#1c2a22]",
  "[&_p]:my-5",
  "[&_h2]:scroll-mt-8 [&_h3]:scroll-mt-8 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-[1.35rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#14261c]",
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-base [&_h3]:uppercase [&_h3]:tracking-[0.14em] [&_h3]:text-forest",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5",
  "[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-pine [&_blockquote]:pl-6 [&_blockquote]:text-[1.15rem] [&_blockquote]:italic [&_blockquote]:text-[#2f4a3a]",
  "[&_strong]:font-semibold [&_em]:italic",
  "[&_a]:text-forest [&_a]:underline [&_a]:decoration-pine/40 [&_a]:underline-offset-2",
  "[&_hr]:mx-auto [&_hr]:my-12 [&_hr]:w-16 [&_hr]:border-pine/30",
].join(" ");

const pill =
  "inline-flex items-center gap-1 rounded-full bg-sprout px-3 py-1 text-xs font-semibold text-forest transition-colors hover:bg-[#cfe8b4]";

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getEssay(slug);
  if (!found) notFound();
  const { meta, topic, body, toc } = found;

  const at = essays.findIndex((e) => e.slug === slug);
  const newer = at > 0 ? essays[at - 1] : null;
  const older = at < essays.length - 1 ? essays[at + 1] : null;

  // pictures next to the essay live in public/essays/<slug>/
  const toFile = (url: string) =>
    /^([a-z]+:|\/|#)/i.test(url) ? defaultUrlTransform(url) : asset(`/essays/${slug}/${url.replace(/^\.\//, "")}`);

  return (
    <main className="min-h-screen overflow-x-clip bg-paper">
      <article className="px-5 pb-20 pt-8 md:px-10 lg:px-16">
        <Link href="/#self" className={pill}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/badges/verde-self.svg")} alt="" className="-ml-1 h-5 w-5" />← VerdeSelf
        </Link>

        <header className="essay-rise mt-10 border-b border-line pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-forest">
            Real me
            {topic && <span className="text-ink-soft/70"> · {topic}</span>}
          </p>
          <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#14261c] sm:text-[2.6rem]">
            {meta.title}
          </h1>
          <p className="mt-6 text-[13px] text-ink-soft">{meta.date} · Verdy Bunny</p>
        </header>

        <div className={`mt-10 ${toc.length ? "lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16" : ""}`}>
        <div className="essay-rise min-w-0 break-words" style={{ animationDelay: "120ms" }}>
          <EssayToc items={toc} variant="inline" />
          <div className={PROSE}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              urlTransform={toFile}
              components={{
                // a picture is a figure with its caption (the alt text) underneath
                img: ({ src, alt }) => (
                  <span className="my-10 block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="max-h-[420px] w-full rounded-sm object-cover" />
                    {alt && <span className="mt-2.5 block text-center font-serif text-[13px] italic text-ink-soft">{alt}</span>}
                  </span>
                ),
                a: ({ href, children }) => <a href={href}>{children}</a>,
                h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
                h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
              }}
            >
              {body}
            </ReactMarkdown>
          </div>
          <p className="mt-12 text-center font-serif text-pine/50">✧</p>
        </div>
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <EssayToc items={toc} variant="side" />
          </aside>
        )}
        </div>

        {/* older / newer */}
        <nav className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {newer ? (
            <Link href={`/essays/${newer.slug}`} className="essay-next group">
              <span className="text-xs text-ink-soft">← Newer</span>
              <span className="mt-1 block font-serif text-lg leading-snug text-pine">{newer.title}</span>
            </Link>
          ) : <span />}
          {older && (
            <Link href={`/essays/${older.slug}`} className="essay-next group sm:text-right">
              <span className="text-xs text-ink-soft">Older →</span>
              <span className="mt-1 block font-serif text-lg leading-snug text-pine">{older.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
