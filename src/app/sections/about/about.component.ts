import { Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, SectionHeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  data = PORTFOLIO.profile;

  /** Falls back to the initials badge if the headshot is missing or fails to load. */
  photoFailed = signal(false);
}
