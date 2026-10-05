import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { PORTFOLIO } from '../../data/portfolio.data';

const fullText = PORTFOLIO.terminal.map((l) => l.segments.map((s) => s.t).join('')).join('\n');
const typed = (el: HTMLElement) =>
  Array.from(el.querySelectorAll('.terminal__line'))
    .map((l) => l.textContent)
    .join('\n');

describe('HeroComponent typewriter', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('types the whole terminal out, line by line', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    vi.advanceTimersByTime(200);
    fixture.detectChanges();
    const partial = typed(el);
    expect(partial.length).toBeGreaterThan(0);
    expect(fullText.startsWith(partial)).toBe(true);
    expect(fixture.componentInstance.done()).toBe(false);

    vi.runAllTimers();
    fixture.detectChanges();
    expect(typed(el)).toBe(fullText);
    expect(fixture.componentInstance.done()).toBe(true);
  });

  it('shows everything at once for visitors who prefer reduced motion', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce') }) as MediaQueryList);
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    expect(typed(fixture.nativeElement)).toBe(fullText);
  });
});
