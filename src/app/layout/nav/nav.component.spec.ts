import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { PORTFOLIO, SECTIONS } from '../../data/portfolio.data';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const burger = () => el().querySelector<HTMLButtonElement>('.nav__burger')!;
  const links = () => el().querySelector('#nav-links')!;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(NavComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    Reflect.deleteProperty(window, 'scrollY');
  });

  it('links to every section, in page order, plus the résumé', () => {
    const anchors = Array.from(el().querySelectorAll<HTMLAnchorElement>('#nav-links a'));
    expect(anchors.map((a) => a.getAttribute('href'))).toEqual([
      ...SECTIONS.map((s) => `#${s.id}`),
      PORTFOLIO.profile.resumeUrl,
    ]);
    expect(el().querySelector('.nav__resume')!.hasAttribute('download')).toBe(true);
  });

  it('opens and closes the mobile menu, keeping aria-expanded in sync', async () => {
    expect(burger().getAttribute('aria-expanded')).toBe('false');
    expect(burger().getAttribute('aria-label')).toBe('Open menu');
    expect(burger().getAttribute('aria-controls')).toBe('nav-links');

    burger().click();
    await fixture.whenStable();
    expect(links().classList).toContain('open');
    expect(burger().getAttribute('aria-expanded')).toBe('true');
    expect(burger().getAttribute('aria-label')).toBe('Close menu');

    burger().click();
    await fixture.whenStable();
    expect(links().classList).not.toContain('open');
    expect(burger().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu when a section link is chosen', async () => {
    burger().click();
    await fixture.whenStable();

    el().querySelector<HTMLAnchorElement>('#nav-links a[href="#projects"]')!.click();
    await fixture.whenStable();
    expect(links().classList).not.toContain('open');
  });

  it('gets a solid background once the page is scrolled', async () => {
    const header = () => el().querySelector('.nav')!;
    expect(header().classList).not.toContain('nav--scrolled');

    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(header().classList).toContain('nav--scrolled');

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(header().classList).not.toContain('nav--scrolled');
  });
});
