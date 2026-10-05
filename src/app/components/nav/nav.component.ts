import { Component, HostListener, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-nav',
  imports: [ThemeToggleComponent],
  template: `
    <header class="nav" [class.nav--scrolled]="scrolled()">
      <div class="container nav__inner">
        <a href="#home" class="nav__brand">
          <span class="nav__mark">{{ data.initials }}</span>
          <span class="nav__brandtext">{{ data.firstName }}<b>.</b></span>
        </a>

        <nav class="nav__links" [class.open]="menu()">
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id" (click)="menu.set(false)">{{ link.label }}</a>
          }
          <a [href]="data.resumeUrl" download class="nav__resume">Resume</a>
        </nav>

        <div class="nav__actions">
          <app-theme-toggle />
          <button class="nav__burger" (click)="menu.set(!menu())" aria-label="Menu">
            <span [class.x]="menu()"></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .nav {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 150;
        transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
        border-bottom: 1px solid transparent;
      }
      .nav--scrolled {
        background: color-mix(in srgb, var(--bg) 80%, transparent);
        backdrop-filter: blur(14px);
        border-bottom-color: var(--border);
      }
      .nav__inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
      .nav__brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; }
      .nav__mark {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 9px;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--accent-contrast);
        background: var(--accent);
      }
      .nav__brandtext { color: var(--heading); font-family: var(--heading-font); }
      .nav__brandtext b { color: var(--accent); }

      .nav__links { display: flex; align-items: center; gap: 1.6rem; }
      .nav__links a { color: var(--text-dim); font-size: 0.92rem; font-weight: 500; transition: color 0.18s ease; }
      .nav__links a:hover { color: var(--heading); }
      .nav__resume {
        padding: 0.45rem 1rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--accent);
        color: var(--accent) !important;
      }
      .nav__resume:hover { background: var(--accent); color: var(--accent-contrast) !important; }

      .nav__actions { display: flex; align-items: center; gap: 0.6rem; }

      .nav__burger { display: none; background: none; border: none; cursor: pointer; width: 30px; height: 30px; position: relative; }
      .nav__burger span,
      .nav__burger span::before,
      .nav__burger span::after {
        content: '';
        position: absolute;
        left: 3px;
        width: 24px;
        height: 2px;
        background: var(--heading);
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
      }
      .nav__burger span { top: 14px; }
      .nav__burger span::before { top: -7px; }
      .nav__burger span::after { top: 7px; }
      .nav__burger span.x { background: transparent; }
      .nav__burger span.x::before { transform: translateY(7px) rotate(45deg); }
      .nav__burger span.x::after { transform: translateY(-7px) rotate(-45deg); }

      @media (max-width: 760px) {
        .nav__burger { display: block; }
        .nav__links {
          position: absolute;
          top: 68px;
          left: 0;
          right: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.3rem;
          padding: 1rem 1.5rem 1.5rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          transform: translateY(-120%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.28s ease, opacity 0.28s ease;
        }
        .nav__links.open { transform: none; opacity: 1; pointer-events: auto; }
        .nav__links a { padding: 0.6rem 0; width: 100%; }
      }
    `,
  ],
})
export class NavComponent {
  data = PORTFOLIO.profile;
  scrolled = signal(false);
  menu = signal(false);

  links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
