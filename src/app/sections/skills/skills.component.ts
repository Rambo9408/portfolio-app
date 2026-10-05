import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, SectionHeaderComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = PORTFOLIO.skills;
}
