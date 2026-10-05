import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';

/** Milliseconds per character. Newlines pause a little longer. */
const CHAR_MS = 18;
const LINE_PAUSE_MS = 190;

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  data = PORTFOLIO.profile;
  lines = PORTFOLIO.terminal;

  /** How many characters of the terminal have been typed so far. */
  private revealed = signal(0);
  private timer?: ReturnType<typeof setTimeout>;

  /** Total characters across every line (newline between lines counts as one). */
  private readonly total = this.lines.reduce(
    (sum, line) => sum + line.segments.reduce((s, seg) => s + seg.t.length, 0) + 1,
    0
  );

  /** True once the whole thing is typed — used to park the cursor at the end. */
  readonly done = computed(() => this.revealed() >= this.total);

  ngOnInit(): void {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      this.revealed.set(this.total);
      return;
    }
    this.tick();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private tick(): void {
    if (this.revealed() >= this.total) return;

    const next = this.revealed() + 1;
    this.revealed.set(next);

    // Pause a beat at line breaks so it reads like someone typing.
    const atLineBreak = this.isLineBreak(next);
    this.timer = setTimeout(() => this.tick(), atLineBreak ? LINE_PAUSE_MS : CHAR_MS);
  }

  /** Character index `n` lands on the newline that terminates a line. */
  private isLineBreak(n: number): boolean {
    let cursor = 0;
    for (const line of this.lines) {
      cursor += line.segments.reduce((s, seg) => s + seg.t.length, 0) + 1;
      if (cursor === n) return true;
      if (cursor > n) return false;
    }
    return false;
  }

  /**
   * How much of `segment` (the segIndex-th segment of the lineIndex-th line) is
   * currently visible, given how many characters have been revealed overall.
   */
  visible(lineIndex: number, segIndex: number): string {
    const seg = this.lines[lineIndex].segments[segIndex];

    // Characters consumed by all earlier lines (+1 each for their newline).
    let before = 0;
    for (let i = 0; i < lineIndex; i++) {
      before += this.lines[i].segments.reduce((s, x) => s + x.t.length, 0) + 1;
    }
    // ...plus earlier segments on this line.
    for (let j = 0; j < segIndex; j++) {
      before += this.lines[lineIndex].segments[j].t.length;
    }

    const remaining = this.revealed() - before;
    if (remaining <= 0) return '';
    if (remaining >= seg.t.length) return seg.t;
    return seg.t.slice(0, remaining);
  }

  /** A line only renders once the typewriter has reached it. */
  lineStarted(lineIndex: number): boolean {
    let before = 0;
    for (let i = 0; i < lineIndex; i++) {
      before += this.lines[i].segments.reduce((s, x) => s + x.t.length, 0) + 1;
    }
    return this.revealed() > before;
  }
}
