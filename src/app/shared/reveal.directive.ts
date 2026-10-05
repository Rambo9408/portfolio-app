import { Directive, ElementRef, OnDestroy, afterNextRender, computed, inject, input } from '@angular/core';

/**
 * Adds `.is-visible` when the element scrolls into view.
 * Pairs with the global `.reveal` styles for a fade/slide-in.
 *
 * The `reveal` class is a host binding so it is already in the pre-rendered HTML
 * (no flash of content that then hides itself); the observer only starts in the browser.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.transition-delay]': 'delay()',
  },
})
export class RevealDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Optional stagger delay in ms (accepts a number or a string literal). */
  readonly appReveal = input<number | string>('');

  protected readonly delay = computed(() => {
    const raw = this.appReveal();
    const ms = typeof raw === 'string' ? parseInt(raw, 10) : raw;
    return Number.isFinite(ms) && ms > 0 ? `${ms}ms` : null;
  });

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement as HTMLElement;

      if (!('IntersectionObserver' in window)) {
        host.classList.add('is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      this.observer.observe(host);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
