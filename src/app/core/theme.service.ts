import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Dark ("Dev Dark") is the default look. Light mode is available via the nav
 * toggle and is remembered across visits.
 *
 * NOTE: the default is intentionally fixed rather than following
 * prefers-color-scheme, so every first-time visitor sees the same intended design.
 * The inline script in index.html applies the saved theme before first paint;
 * this service keeps it in sync after that.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.load());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.document.documentElement.setAttribute('data-theme', t);
      if (!this.isBrowser) return;
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
    // Pre-rendering has no visitor, so it always produces the default.
    if (!this.isBrowser) return 'dark';
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
