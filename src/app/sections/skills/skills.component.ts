import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, SectionHeaderComponent],
  template: `
    <section id="skills" class="section section--alt">
      <div class="container">
        <app-section-header section="skills" />

        <div class="skills">
          @for (group of skills; track group.label; let i = $index) {
            <div class="skills__group card" [appReveal]="i * 60">
              <h3 class="skills__label">
                <span class="skills__num">0{{ i + 1 }}</span>{{ group.label }}
              </h3>
              <div class="skills__chips">
                @for (item of group.items; track item) {
                  <span class="chip">{{ item }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .skills {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.1rem;
      }
      .skills__group { padding: 1.4rem 1.5rem; transition: transform 0.2s ease, border-color 0.2s ease; }
      .skills__group:hover { transform: translateY(-4px); border-color: var(--accent); }
      .skills__label {
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
        font-family: var(--heading-font);
        font-size: 1.05rem;
        color: var(--heading);
        margin-bottom: 1rem;
      }
      .skills__num { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); }
      .skills__chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    `,
  ],
})
export class SkillsComponent {
  skills = PORTFOLIO.skills;
}
