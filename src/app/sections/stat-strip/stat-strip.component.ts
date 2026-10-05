import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-stat-strip',
  imports: [RevealDirective],
  templateUrl: './stat-strip.component.html',
  styleUrl: './stat-strip.component.scss',
})
export class StatStripComponent {
  stats = PORTFOLIO.profile.stats;
}
