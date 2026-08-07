import { Warp } from '@paper-design/shaders-react';
import { governance } from '../../content/home';
import { iconPaths, type IconName } from '../../lib/icon-paths';

/** Astro island — hydrated with client:visible from index.astro. No
 *  "use client" here: that directive is Next.js App Router syntax and
 *  does nothing under Astro's island model.
 *
 *  Ported from a supplied reference component (WebGL shader cards via
 *  @paper-design/shaders-react), then pulled onto this site's actual
 *  surface: light Paper cards with Ink text — the shader now lives only
 *  inside the small icon badge, not as a full-bleed dark background, per
 *  the site's light-only, one-accent visual language. Colors imports use
 *  `style={{ color: 'var(--color-x)' }}` rather than Tailwind utility
 *  classes, matching how every other page on this site reaches for a
 *  design token (see contact.astro, index.astro) instead of a `bg-ink`-
 *  style class Tailwind could technically generate from theme.css's
 *  `@theme` block but that nothing else here relies on.
 *
 *  Adaptations from the original:
 *   - Content is the site's real `governance` array (content/home.ts),
 *     condensed to two short points per card instead of a full sentence.
 *   - Icons are this site's own 16px/1.5-stroke set (src/lib/icon-paths.ts),
 *     not a new lucide-react dependency — one icon system, not two.
 *   - Shader colors retinted to the Nexus Indigo family, the same move
 *     MagicBento.tsx documents making on its own upstream palette.
 *   - Dropped the "Learn more →" row — no per-control page exists to send
 *     it to, and a link to nowhere is worse than no link.
 *   - Dropped the original's own full-page wrapper and "Powerful Features"
 *     heading; index.astro's existing "How the AI is governed" heading
 *     already covers that role. */

/** Indexed, not keyed, same convention as roleIcons/roleFamilies in
 *  index.astro — length and order must track src/content/home.ts `governance`. */
const GOVERNANCE_ICONS: (IconName | 'rupee')[] = [
  'shield',
  'doc-check',
  'check',
  'user-check',
  'rupee',
  'toggle',
  'book',
  'stack',
];

const SHADER_CONFIGS = [
  { proportion: 0.32, softness: 0.85, distortion: 0.15, swirl: 0.6, swirlIterations: 8, shape: 'checks' as const, shapeScale: 0.22, colors: ['hsl(228,90%,28%)', 'hsl(222,100%,62%)', 'hsl(235,85%,38%)', 'hsl(220,100%,72%)'] },
  { proportion: 0.4, softness: 1.1, distortion: 0.19, swirl: 0.85, swirlIterations: 11, shape: 'stripes' as const, shapeScale: 0.26, colors: ['hsl(215,95%,25%)', 'hsl(200,100%,60%)', 'hsl(225,85%,35%)', 'hsl(210,100%,72%)'] },
  { proportion: 0.35, softness: 0.9, distortion: 0.17, swirl: 0.7, swirlIterations: 9, shape: 'checks' as const, shapeScale: 0.24, colors: ['hsl(240,90%,30%)', 'hsl(250,100%,65%)', 'hsl(235,80%,38%)', 'hsl(245,100%,72%)'] },
  { proportion: 0.44, softness: 1.05, distortion: 0.2, swirl: 0.75, swirlIterations: 12, shape: 'stripes' as const, shapeScale: 0.2, colors: ['hsl(220,95%,28%)', 'hsl(210,100%,62%)', 'hsl(230,85%,36%)', 'hsl(215,100%,74%)'] },
  { proportion: 0.37, softness: 0.95, distortion: 0.16, swirl: 0.8, swirlIterations: 10, shape: 'checks' as const, shapeScale: 0.25, colors: ['hsl(232,90%,26%)', 'hsl(240,100%,64%)', 'hsl(225,85%,34%)', 'hsl(238,100%,72%)'] },
  { proportion: 0.41, softness: 1.0, distortion: 0.18, swirl: 0.72, swirlIterations: 9, shape: 'stripes' as const, shapeScale: 0.27, colors: ['hsl(210,95%,27%)', 'hsl(195,100%,60%)', 'hsl(220,85%,35%)', 'hsl(205,100%,72%)'] },
  { proportion: 0.34, softness: 0.88, distortion: 0.15, swirl: 0.65, swirlIterations: 8, shape: 'checks' as const, shapeScale: 0.23, colors: ['hsl(245,90%,28%)', 'hsl(255,100%,64%)', 'hsl(238,85%,36%)', 'hsl(250,100%,74%)'] },
  { proportion: 0.42, softness: 1.05, distortion: 0.2, swirl: 0.78, swirlIterations: 11, shape: 'stripes' as const, shapeScale: 0.22, colors: ['hsl(218,95%,26%)', 'hsl(205,100%,60%)', 'hsl(228,85%,34%)', 'hsl(212,100%,72%)'] },
] as const;

function GovernanceIcon({ name }: { name: IconName | 'rupee' }) {
  if (name === 'rupee') {
    return <span className="text-base font-semibold leading-none">₹</span>;
  }
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}

export default function GovernanceShaderCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {governance.map((g, i) => {
        const shader = SHADER_CONFIGS[i % SHADER_CONFIGS.length];
        return (
          <div
            key={g.title}
            className="flex flex-col gap-4 p-5 rounded-2xl"
            style={{ background: 'var(--color-paper)', border: '1px solid var(--color-hairline)' }}
          >
            <span className="relative w-11 h-11 rounded-full overflow-hidden flex-none">
              <span className="absolute inset-0">
                <Warp
                  style={{ width: '100%', height: '100%' }}
                  proportion={shader.proportion}
                  softness={shader.softness}
                  distortion={shader.distortion}
                  swirl={shader.swirl}
                  swirlIterations={shader.swirlIterations}
                  shape={shader.shape}
                  shapeScale={shader.shapeScale}
                  scale={1}
                  rotation={0}
                  speed={0.5}
                  colors={[...shader.colors]}
                />
              </span>
              <span className="relative z-10 w-full h-full flex items-center justify-center text-white">
                <GovernanceIcon name={GOVERNANCE_ICONS[i]} />
              </span>
            </span>

            <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--color-ink)' }}>
              {g.title}
            </h3>

            <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
              {g.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-snug" style={{ color: 'var(--color-muted)' }}>
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] w-1 h-1 rounded-full flex-none"
                    style={{ background: 'var(--color-accent)' }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
