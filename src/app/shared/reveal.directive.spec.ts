import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `
    @if (shown()) {
      <div id="plain" appReveal></div>
      <div id="delayed" [appReveal]="delay"></div>
    }
  `,
})
class HostComponent {
  shown = signal(true);
  delay = 120;
}

/** A controllable stand-in for IntersectionObserver (jsdom doesn't have one). */
class FakeObserver {
  static instances: FakeObserver[] = [];
  observed: Element[] = [];
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(private cb: IntersectionObserverCallback) {
    FakeObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  enter(el: Element) {
    this.cb([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry], this as never);
  }
}

describe('RevealDirective', () => {
  const byId = (fixture: { nativeElement: HTMLElement }, id: string) =>
    fixture.nativeElement.querySelector<HTMLElement>(`#${id}`)!;

  beforeEach(() => {
    FakeObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeObserver);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('marks the element for revealing, applying any stagger delay', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    expect(byId(fixture, 'plain').classList).toContain('reveal');
    expect(byId(fixture, 'plain').style.transitionDelay).toBe('');
    expect(byId(fixture, 'delayed').style.transitionDelay).toBe('120ms');
  });

  it('stays hidden until scrolled into view, then stops watching', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const plain = byId(fixture, 'plain');
    const observer = FakeObserver.instances.find((o) => o.observed.includes(plain))!;

    expect(plain.classList).not.toContain('is-visible');
    observer.enter(plain);
    expect(plain.classList).toContain('is-visible');
    expect(observer.unobserve).toHaveBeenCalledWith(plain);
  });

  it('disconnects its observer when the element is destroyed', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(FakeObserver.instances.length).toBe(2);

    fixture.componentInstance.shown.set(false);
    await fixture.whenStable();
    for (const o of FakeObserver.instances) expect(o.disconnect).toHaveBeenCalled();
  });

  it('just shows the element in browsers without IntersectionObserver', async () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    Reflect.deleteProperty(window, 'IntersectionObserver');
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(byId(fixture, 'plain').classList).toContain('is-visible');
  });
});
