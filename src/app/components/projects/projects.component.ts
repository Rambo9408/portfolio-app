import { Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective],
  template: `
    <section id="projects" class="section section--alt">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="section-kicker">04 — Projects</span>
          <h2 class="section-title">Things I've built</h2>
          <p>Selected work from production platforms to cross-platform apps.</p>
        </div>

        <div class="projects">
          @for (p of projects; track p.name; let i = $index) {
            <article class="proj card" [appReveal]="i * 80">
              <div class="proj__top">
                <div class="proj__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M4 7h16M4 7l1.5 12a2 2 0 0 0 2 1.8h9a2 2 0 0 0 2-1.8L20 7M9 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                </div>
                @if (p.highlight) {
                  <span class="proj__badge">{{ p.highlight }}</span>
                }
              </div>
              <h3 class="proj__name">{{ p.name }}</h3>
              <p class="proj__desc">{{ p.description }}</p>
              <div class="proj__tech">
                @for (t of p.tech; track t) {
                  <span class="chip">{{ t }}</span>
                }
              </div>

              @if (p.caseStudy) {
                <button
                  class="proj__cta"
                  type="button"
                  (click)="toggle(p.name)"
                  [attr.aria-expanded]="open() === p.name"
                  aria-controls="case-study"
                >
                  {{ open() === p.name ? 'Hide case study' : 'Read the case study' }}
                  <svg
                    class="proj__chev"
                    [class.up]="open() === p.name"
                    width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2.2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              }
            </article>
          }
        </div>

        @if (active(); as cs) {
          <div class="case card" id="case-study" appReveal>
            <header class="case__head">
              <div>
                <span class="case__kicker">Case study</span>
                <h3 class="case__title">{{ open() }}</h3>
              </div>
              <button class="case__close" type="button" (click)="open.set(null)" aria-label="Close case study">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            <p class="case__summary">{{ cs.summary }}</p>

            <div class="case__grid">
              @for (c of cs.cards; track c.decision; let i = $index) {
                <article class="dc">
                  <span class="dc__num">{{ i + 1 < 10 ? '0' : '' }}{{ i + 1 }}</span>
                  <h4 class="dc__decision">{{ c.decision }}</h4>

                  <div class="dc__row">
                    <span class="dc__label">Why</span>
                    <p>{{ c.why }}</p>
                  </div>
                  <div class="dc__row">
                    <span class="dc__label dc__label--trade">Trade-off</span>
                    <p>{{ c.tradeoff }}</p>
                  </div>
                  <div class="dc__row">
                    <span class="dc__label dc__label--result">Result</span>
                    <p>{{ c.result }}</p>
                  </div>
                </article>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.4rem;
      }
      .proj {
        display: flex;
        flex-direction: column;
        padding: 1.7rem;
        transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
      }
      .proj:hover {
        transform: translateY(-6px);
        border-color: var(--accent);
        box-shadow: var(--shadow);
      }
      .proj__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.1rem; }
      .proj__icon {
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        color: var(--accent);
        background: var(--accent-soft);
      }
      .proj__badge {
        font-size: 0.72rem;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        color: var(--accent-2);
        background: color-mix(in srgb, var(--accent-2) 14%, transparent);
      }
      .proj__name { font-family: var(--heading-font); font-size: 1.25rem; color: var(--heading); margin-bottom: 0.6rem; }
      .proj__desc { color: var(--text-dim); font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.2rem; flex: 1; }
      .proj__tech { display: flex; flex-wrap: wrap; gap: 0.45rem; }

      .proj__cta {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-top: 1.2rem;
        padding: 0;
        border: none;
        background: none;
        color: var(--accent);
        font-family: var(--font-body);
        font-size: 0.88rem;
        font-weight: 600;
        cursor: pointer;
        align-self: flex-start;
      }
      .proj__cta:hover { text-decoration: underline; }
      .proj__chev { transition: transform 0.2s ease; }
      .proj__chev.up { transform: rotate(180deg); }

      /* ---- Case study panel ---- */
      /* scroll-margin clears the fixed nav when we scroll the panel into view */
      .case { margin-top: 1.6rem; padding: 2rem; scroll-margin-top: 90px; }
      .case__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .case__kicker {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent-2);
      }
      .case__title {
        font-family: var(--heading-font);
        font-size: 1.5rem;
        color: var(--heading);
        margin-top: 0.25rem;
      }
      .case__close {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        flex: none;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-dim);
        cursor: pointer;
        transition: color 0.18s ease, border-color 0.18s ease;
      }
      .case__close:hover { color: var(--accent); border-color: var(--accent); }

      .case__summary {
        color: var(--text);
        max-width: 68ch;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border);
      }

      .case__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.2rem;
      }

      .dc {
        position: relative;
        padding: 1.4rem 1.5rem;
        border-radius: var(--radius-sm);
        background: var(--bg-alt);
        border: 1px solid var(--border);
        border-top: 2px solid var(--accent);
      }
      .dc__num {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--accent);
      }
      .dc__decision {
        font-family: var(--heading-font);
        font-size: 1.02rem;
        line-height: 1.4;
        color: var(--heading);
        margin: 0.3rem 0 1rem;
      }
      .dc__row { display: grid; gap: 0.2rem; margin-bottom: 0.85rem; }
      .dc__row:last-child { margin-bottom: 0; }
      .dc__row p { font-size: 0.88rem; line-height: 1.65; color: var(--text-dim); }

      .dc__label {
        font-family: var(--font-mono);
        font-size: 0.66rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-dim);
      }
      .dc__label--trade { color: #e0a458; }
      .dc__label--result { color: var(--accent-2); }

      @media (max-width: 560px) {
        .case { padding: 1.4rem; }
        .case__grid { grid-template-columns: 1fr; }
      }
    `,
  ],
})
export class ProjectsComponent {
  projects = PORTFOLIO.projects;

  /** Name of the project whose case study is open, or null. */
  open = signal<string | null>(null);

  toggle(name: string): void {
    const opening = this.open() !== name;
    this.open.update((cur) => (cur === name ? null : name));

    // The panel renders below the grid, so bring it into view once it exists.
    if (opening) {
      setTimeout(() => {
        document.getElementById('case-study')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }

  active() {
    const name = this.open();
    return name ? this.projects.find((p) => p.name === name)?.caseStudy ?? null : null;
  }
}
