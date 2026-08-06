/** The four platforms in the smoothui scrollable stack.
 *
 *  The stack owns the motion; this owns the card. Its body is the same content
 *  the grid and the Swiper deck carried — name, tagline, three bullets, four
 *  real agents with their seats, the true agent count and both links. No
 *  images, no avatars, and no invented people: the demo that ships with this
 *  component uses four fictional names and remote imagekit avatars, and
 *  DESIGN.md §16.2 makes "no fabricated customers or testimonials" one of the
 *  rules no section may scope away.
 *
 *  Data arrives as props from the Astro page rather than being imported here,
 *  so the client bundle carries only the fields that are rendered instead of
 *  the whole content module. */
import ScrollableCardStack from '@/components/ui/smoothui/scrollable-card-stack';

export interface StackPlatform {
  slug: string;
  name: string;
  subtitle: string;
  hue: string;
  agentCount: number;
  site: string;
  bullets: string[];
  agents: { name: string; audience: string }[];
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      style={{ flex: 'none', marginTop: '0.3rem' }}
      viewBox="0 0 16 16"
      width="14"
    >
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
  );
}

function Card({ p }: { p: StackPlatform }) {
  return (
    <div className="stack-card" style={{ '--card-hue': p.hue } as React.CSSProperties}>
      <span aria-hidden="true" className="stack-accent" />

      <div className="stack-head">
        <span aria-hidden="true" className="stack-dot" />
        <h3 className="t-h3">{p.name}</h3>
      </div>
      <p className="stack-tag t-sm">{p.subtitle}</p>

      <ul className="stack-feats">
        {p.bullets.map((b) => (
          <li className="t-sm" key={b}>
            <Check />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <ul className="stack-mods">
        {p.agents.map((a) => (
          <li className="stack-mod t-sm" key={a.name}>
            <span className="stack-mod-name">{a.name}</span>
            <span className="stack-mod-seat mono t-cap">{a.audience}</span>
          </li>
        ))}
      </ul>

      <div className="stack-foot">
        <p className="stack-count mono t-cap">{p.agentCount} AI agents</p>
        <div className="stack-links">
          <a className="link-accent" href={`/platforms/${p.slug}/`}>
            Explore {p.name} →
          </a>
          <a className="stack-site t-sm" href={p.site} rel="noopener" target="_blank">
            {p.site.replace('https://www.', '')} ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlatformCardStack({ platforms }: { platforms: StackPlatform[] }) {
  return (
    <ScrollableCardStack
      cardHeight={520}
      items={platforms.map((p) => ({
        content: <Card p={p} />,
        id: p.slug,
        label: p.name,
      }))}
      perspective={1200}
      transitionDuration={220}
    />
  );
}
