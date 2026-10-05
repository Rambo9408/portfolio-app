import { Directive, ElementRef, OnInit, OnDestroy, inject, input } from '@angular/core';

/**
 * Adds `.is-visible` when the element scrolls into view.
 * Pairs with the global `.reveal` styles for a fade/slide-in.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Optional stagger delay in ms (accepts a number or a string literal). */
  readonly appReveal = input<number | string>('');

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    host.classList.add('reveal');
    const raw = this.appReveal();
    const delay = typeof raw === 'string' ? parseInt(raw, 10) : raw;
    if (Number.isFinite(delay) && delay > 0) {
      host.style.transitionDelay = `${delay}ms`;
    }

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
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
