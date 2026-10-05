import { Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, SectionHeaderComponent],
  template: `
    <section id="about" class="section">
      <div class="container">
        <app-section-header section="about" />

        <div class="about" appReveal="80">
          <div class="about__intro">
            @if (data.photo && !photoFailed()) {
              <img
                class="about__photo"
                [src]="data.photo"
                [alt]="data.name"
                (error)="photoFailed.set(true)"
              />
            } @else {
              <div class="about__badge">{{ data.initials }}</div>
            }
            <p class="about__lead">{{ data.summary }}</p>
          </div>

          <div class="about__grid">
            <div class="about__pt">
              <b>Secure by design</b>
              <span>JWT, RBAC &amp; CSRF across 10+ production modules.</span>
            </div>
            <div class="about__pt">
              <b>Performance minded</b>
              <span>Caching &amp; query tuning cut API response times 20–25%.</span>
            </div>
            <div class="about__pt">
              <b>Quality driven</b>
              <span>Playwright E2E slashed regression effort 60–70%.</span>
            </div>
            <div class="about__pt">
              <b>Ships reliably</b>
              <span>Dockerized apps with CI/CD for consistent releases.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2.5rem; align-items: start; }
      .about__intro { display: flex; gap: 1.4rem; align-items: flex-start; }
      .about__lead { font-size: 1.05rem; line-height: 1.8; color: var(--text); }

      .about__photo,
      .about__badge {
        width: 108px;
        height: 108px;
        border-radius: 22px;
        flex: none;
      }
      .about__photo {
        object-fit: cover;
        border: 2px solid var(--accent);
        background: var(--surface-2);
      }
      .about__badge {
        display: grid;
        place-items: center;
        font-family: var(--font-head);
        font-size: 2.1rem;
        font-weight: 800;
        color: var(--accent-contrast);
        background: var(--accent);
      }

      .about__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      .about__pt {
        padding: 1.1rem 1.2rem;
        border-radius: var(--radius-sm);
        background: var(--surface);
        border: 1px solid var(--border);
        border-left: 3px solid var(--accent);
      }
      .about__pt b { display: block; color: var(--heading); margin-bottom: 0.25rem; font-size: 0.98rem; }
      .about__pt span { color: var(--text-dim); font-size: 0.88rem; }

      @media (max-width: 820px) {
        .about { grid-template-columns: 1fr; gap: 1.75rem; }
      }
      @media (max-width: 560px) {
        .about__intro { flex-direction: column; gap: 1.1rem; }
      }
      @media (max-width: 480px) {
        .about__grid { grid-template-columns: 1fr; }
      }
    `,
  ],
})
export class AboutComponent {
  data = PORTFOLIO.profile;

  /** Falls back to the initials badge if the headshot is missing or fails to load. */
  photoFailed = signal(false);
}
