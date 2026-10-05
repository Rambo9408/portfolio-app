import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, SectionHeaderComponent],
  template: `
    <section id="experience" class="section">
      <div class="container">
        <app-section-header section="experience" />

        <div class="timeline">
          @for (job of experience; track job.company) {
            <article class="tl" appReveal="60">
              <span class="tl__dot"></span>
              <div class="tl__card card">
                <header class="tl__head">
                  <div>
                    <h3 class="tl__role">{{ job.role }}</h3>
                    <p class="tl__company">{{ job.company }}</p>
                  </div>
                  <span class="tl__period">{{ job.period }}</span>
                </header>
                <ul class="tl__list">
                  @for (b of job.bullets; track b) {
                    <li>{{ b }}</li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .timeline { position: relative; padding-left: 1.75rem; }
      .timeline::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 8px;
        bottom: 8px;
        width: 2px;
        background: linear-gradient(var(--accent), transparent);
      }
      .tl { position: relative; margin-bottom: 1.5rem; }
      .tl__dot {
        position: absolute;
        left: -1.75rem;
        top: 1.4rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 0 4px var(--accent-soft);
      }
      .tl__card { padding: 1.6rem 1.8rem; }
      .tl__head {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border);
      }
      .tl__role { font-family: var(--heading-font); font-size: 1.2rem; color: var(--heading); }
      .tl__company { color: var(--accent); font-weight: 600; font-size: 0.95rem; }
      .tl__period {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-dim);
        white-space: nowrap;
        padding-top: 0.25rem;
      }
      .tl__list { list-style: none; display: grid; gap: 0.7rem; }
      .tl__list li {
        position: relative;
        padding-left: 1.4rem;
        color: var(--text);
        font-size: 0.94rem;
      }
      .tl__list li::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--accent-2);
      }
      @media (max-width: 520px) {
        .tl__card { padding: 1.3rem; }
      }
    `,
  ],
})
export class ExperienceComponent {
  experience = PORTFOLIO.experience;
}
