import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-education',
  imports: [RevealDirective, SectionHeaderComponent],
  template: `
    <section id="education" class="section">
      <div class="container">
        <app-section-header section="education" />

        <div class="edu">
          @for (e of education; track e.institution; let i = $index) {
            <article class="edu__item card" [appReveal]="i * 70">
              <span class="edu__year">{{ e.period }}</span>
              <div>
                <h3 class="edu__degree">{{ e.degree }}</h3>
                <p class="edu__inst">{{ e.institution }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .edu { display: grid; gap: 1rem; }
      .edu__item {
        display: grid;
        grid-template-columns: 130px 1fr;
        align-items: center;
        gap: 1.25rem;
        padding: 1.3rem 1.6rem;
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .edu__item:hover { transform: translateX(6px); border-color: var(--accent); }
      .edu__year {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--accent);
        font-weight: 500;
      }
      .edu__degree { font-family: var(--heading-font); font-size: 1.08rem; color: var(--heading); }
      .edu__inst { color: var(--text-dim); font-size: 0.9rem; }
      @media (max-width: 520px) {
        .edu__item { grid-template-columns: 1fr; gap: 0.4rem; }
      }
    `,
  ],
})
export class EducationComponent {
  education = PORTFOLIO.education;
}
