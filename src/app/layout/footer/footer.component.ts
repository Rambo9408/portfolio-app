import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <span class="footer__name">{{ data.name }}</span>
        <p class="footer__note">
          Built with Angular · Designed &amp; developed by {{ data.firstName }}
        </p>
        <div class="footer__links">
          <a [href]="data.githubUrl" target="_blank" rel="noopener">GitHub</a>
          <a [href]="data.linkedinUrl" target="_blank" rel="noopener">LinkedIn</a>
          <a [href]="'mailto:' + data.email">Email</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer { border-top: 1px solid var(--border); padding: 2.5rem 0; background: var(--bg-alt); }
      .footer__inner { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; text-align: center; }
      .footer__name { font-family: var(--heading-font); font-weight: 700; color: var(--heading); font-size: 1.1rem; }
      .footer__note { color: var(--text-dim); font-size: 0.86rem; }
      .footer__links { display: flex; gap: 1.4rem; margin-top: 0.4rem; }
      .footer__links a { color: var(--text-dim); font-size: 0.88rem; transition: color 0.18s ease; }
      .footer__links a:hover { color: var(--accent); }
    `,
  ],
})
export class FooterComponent {
  data = PORTFOLIO.profile;
}
