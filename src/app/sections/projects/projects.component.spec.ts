import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { PORTFOLIO } from '../../data/portfolio.data';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const panel = () => el().querySelector('#case-study');
  const withCaseStudy = PORTFOLIO.projects.filter((p) => p.caseStudy);

  beforeEach(async () => {
    // jsdom has no layout, so no scrollIntoView.
    Element.prototype.scrollIntoView = vi.fn();
    fixture = TestBed.createComponent(ProjectsComponent);
    await fixture.whenStable();
  });

  /** The scroll is deferred with setTimeout until the panel exists. */
  const nextTick = () => new Promise((r) => setTimeout(r));

  async function clickCta(index = 0) {
    el().querySelectorAll<HTMLButtonElement>('.proj__cta')[index].click();
    await fixture.whenStable();
  }

  it('renders a card for every project', () => {
    const names = Array.from(el().querySelectorAll('.proj__name')).map((n) => n.textContent?.trim());
    expect(names).toEqual(PORTFOLIO.projects.map((p) => p.name));
  });

  it('offers "Read the case study" only on projects that have one', () => {
    expect(el().querySelectorAll('.proj__cta').length).toBe(withCaseStudy.length);
    expect(withCaseStudy.length).toBeGreaterThan(0);
  });

  it('starts with no case study open', () => {
    expect(panel()).toBeNull();
    const cta = el().querySelector('.proj__cta')!;
    expect(cta.getAttribute('aria-expanded')).toBe('false');
    expect(cta.hasAttribute('aria-controls')).toBe(false);
  });

  it('opens the case study, points aria-controls at it and scrolls it into view', async () => {
    await clickCta();

    const cs = withCaseStudy[0];
    expect(panel()).not.toBeNull();
    expect(panel()!.querySelector('.case__title')?.textContent).toBe(cs.name);
    expect(panel()!.querySelectorAll('.dc').length).toBe(cs.caseStudy!.cards.length);

    const cta = el().querySelector('.proj__cta')!;
    expect(cta.getAttribute('aria-expanded')).toBe('true');
    expect(cta.getAttribute('aria-controls')).toBe('case-study');
    expect(cta.textContent).toContain('Hide case study');

    await nextTick();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledOnce();
  });

  it('closes again from the same button, without scrolling', async () => {
    await clickCta();
    await nextTick();
    await clickCta();
    await nextTick();

    expect(panel()).toBeNull();
    expect(el().querySelector('.proj__cta')!.hasAttribute('aria-controls')).toBe(false);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledOnce();
  });

  it('closes from the panel\'s own close button', async () => {
    await clickCta();
    el().querySelector<HTMLButtonElement>('.case__close')!.click();
    await fixture.whenStable();
    expect(panel()).toBeNull();
  });
});
