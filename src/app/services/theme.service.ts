import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Dark ("Dev Dark") is the default look. Light mode is available via the nav
 * toggle and is remembered across visits.
 *
 * NOTE: the default is intentionally fixed rather than following
 * prefers-color-scheme, so every first-time visitor sees the same intended design.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.load());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, t);
      } catch {
        /* storage unavailable — ignore */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  private load(): Theme {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
