import { Component, computed, input } from '@angular/core';
import { SECTIONS, SectionId } from '../data/portfolio.data';
import { RevealDirective } from './reveal.directive';

/** The "NN — Label" kicker, title and optional intro that open every numbered section. */
@Component({
  selector: 'app-section-header',
  imports: [RevealDirective],
  template: `
    <div class="section-head" appReveal>
      <span class="section-kicker">{{ kicker() }}</span>
      <h2 class="section-title">{{ meta().title }}</h2>
      @if (meta().intro; as intro) {
        <p>{{ intro }}</p>
      }
    </div>
  `,
  styles: [':host { display: block; }'],
})
export class SectionHeaderComponent {
  readonly section = input.required<SectionId>();

  private readonly index = computed(() => SECTIONS.findIndex((s) => s.id === this.section()));
  protected readonly meta = computed<{ title: string; intro?: string }>(() => SECTIONS[this.index()]);
  protected readonly kicker = computed(
    () => `${String(this.index() + 1).padStart(2, '0')} — ${SECTIONS[this.index()].label}`
  );
}
