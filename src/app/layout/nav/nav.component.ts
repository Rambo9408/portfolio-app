import { Component, HostListener, signal } from '@angular/core';
import { PORTFOLIO, SECTIONS } from '../../data/portfolio.data';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-nav',
  imports: [ThemeToggleComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  data = PORTFOLIO.profile;
  scrolled = signal(false);
  menu = signal(false);

  links = SECTIONS;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
