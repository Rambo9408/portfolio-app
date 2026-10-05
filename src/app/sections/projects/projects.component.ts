import { Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, SectionHeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
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
