import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-stat-strip',
  imports: [RevealDirective],
  template: `
    <section class="strip section--alt">
      <div class="container strip__grid">
        @for (s of stats; track s.label; let i = $index) {
          <div class="stat" [appReveal]="i * 70">
            <b class="stat__value">{{ s.value }}</b>
            <span class="stat__label">{{ s.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .strip {
        padding: 3rem 0;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }
      .strip__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
      .stat {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        padding-left: 1.25rem;
        border-left: 2px solid var(--accent);
      }
      .stat__value {
        font-family: var(--font-head);
        font-size: clamp(1.6rem, 3.4vw, 2.3rem);
        font-weight: 800;
        line-height: 1.1;
        color: var(--heading);
        letter-spacing: -0.02em;
      }
      .stat__label {
        font-size: 0.84rem;
        color: var(--text-dim);
      }
      @media (max-width: 720px) {
        .strip__grid { grid-template-columns: 1fr 1fr; gap: 1.75rem 1.25rem; }
      }
    `,
  ],
})
export class StatStripComponent {
  stats = PORTFOLIO.profile.stats;
}
