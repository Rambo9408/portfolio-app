import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { PORTFOLIO, SECTIONS } from './data/portfolio.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renders the visitor-facing name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Ram Kumar');
  });

  it('renders every section the nav links to', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.nav__links a[href^="#"]'));
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      const id = a.getAttribute('href')!.slice(1);
      expect(el.querySelector(`#${id}`), `section #${id}`).not.toBeNull();
    }
  });

  it('lays the sections out in SECTIONS order, so the kicker numbers match the page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const onPage = Array.from(el.querySelectorAll('main section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTIONS.some((s) => s.id === id));
    expect(onPage).toEqual(SECTIONS.map((s) => s.id));

    const kickers = Array.from(el.querySelectorAll('.section-kicker')).map((k) => k.textContent?.trim());
    expect(kickers).toEqual(SECTIONS.map((s, i) => `0${i + 1} — ${s.label}`));
  });

  it('links to the résumé from the nav', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.nav__resume')?.getAttribute('href')).toBe(PORTFOLIO.profile.resumeUrl);
  });
});
