import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { PORTFOLIO } from '../../data/portfolio.data';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  const el = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AboutComponent);
    await fixture.whenStable();
  });

  it('shows the summary', () => {
    expect(el().querySelector('.about__lead')?.textContent).toBe(PORTFOLIO.profile.summary);
  });

  it('shows the headshot when one is configured', () => {
    // This test only means something while a photo path is set in portfolio.data.ts.
    if (!PORTFOLIO.profile.photo) return;
    const img = el().querySelector('img.about__photo');
    expect(img?.getAttribute('src')).toBe(PORTFOLIO.profile.photo);
    expect(img?.getAttribute('alt')).toBe(PORTFOLIO.profile.name);
  });

  it('falls back to the initials badge when the photo fails to load', async () => {
    el().querySelector('img.about__photo')?.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(el().querySelector('img.about__photo')).toBeNull();
    expect(el().querySelector('.about__badge')?.textContent).toBe(PORTFOLIO.profile.initials);
  });
});
