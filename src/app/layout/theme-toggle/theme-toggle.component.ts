import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);
  isDark = () => this.theme.theme() === 'dark';
}
