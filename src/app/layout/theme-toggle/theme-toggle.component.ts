import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  template: `
    <button
      class="toggle"
      type="button"
      (click)="theme.toggle()"
      [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      [title]="isDark() ? 'Light mode' : 'Dark mode'"
    >
      @if (isDark()) {
        <!-- Sun: click to go light -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      } @else {
        <!-- Moon: click to go dark -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      }
    </button>
  `,
  styles: [
    `
      .toggle {
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-dim);
        cursor: pointer;
        transition: color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
      }
      .toggle:hover {
        color: var(--accent-2);
        border-color: var(--accent-2);
        transform: translateY(-2px);
      }
      .toggle svg {
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);
  isDark = () => this.theme.theme() === 'dark';
}
