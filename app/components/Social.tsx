// My accounts as little chips with their icons. Icons are simple shapes drawn here (no brand
// logos copied), in the current text colour.
type Kind = "instagram" | "x" | "substack" | "github" | "email";

function Icon({ kind }: { kind: Kind }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "instagram")
    return (
      <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
    );
  if (kind === "x") return <svg {...p}><path d="M4 4l16 16M20 4L4 20" /></svg>;
  if (kind === "substack")
    return (
      <svg {...p}><path d="M5 4h14M5 8h14" /><path d="M5 12h14v8l-7-4-7 4z" /></svg>
    );
  if (kind === "github")
    return (
      <svg {...p}><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.7 4.7 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.8 2.6 5.8 2.9 5.8 2.9a4.3 4.3 0 0 0-.1 3.2A4.7 4.7 0 0 0 4.4 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" /></svg>
    );
  return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
}

export type SocialLink = { kind: Kind; label: string; href: string };

export function SocialChips({ links, dark = false }: { links: SocialLink[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target={l.kind === "email" ? undefined : "_blank"}
            rel="noreferrer"
            className={`social-chip inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
              dark ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-line bg-sheet text-pine hover:bg-sprout"
            }`}
          >
            <Icon kind={l.kind} />
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
