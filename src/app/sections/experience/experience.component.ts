import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, SectionHeaderComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experience = PORTFOLIO.experience;
}
