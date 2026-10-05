import { Component, OnDestroy, afterNextRender, computed, signal } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

/** Milliseconds per character. Newlines pause a little longer. */
const CHAR_MS = 18;
const LINE_PAUSE_MS = 190;

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy {
  data = PORTFOLIO.profile;
  lines = PORTFOLIO.terminal;

  /** How many characters of the terminal have been typed so far. */
  private revealed = signal(0);
  private timer?: ReturnType<typeof setTimeout>;

  /**
   * Character offsets, computed once: where each line starts, where each segment
   * starts, and which indices are line breaks (a newline counts as one character).
   */
  private readonly lineStart: number[] = [];
  private readonly segStart: number[][] = [];
  private readonly lineBreaks = new Set<number>();
  private readonly total: number;

  constructor() {
    let cursor = 0;
    for (const line of this.lines) {
      this.lineStart.push(cursor);
      this.segStart.push(
        line.segments.map((seg) => {
          const start = cursor;
          cursor += seg.t.length;
          return start;
        })
      );
      cursor += 1; // the newline
      this.lineBreaks.add(cursor);
    }
    this.total = cursor;

    // Browser only: pre-rendering ships an empty terminal, and typing starts once hydrated.
    afterNextRender(() => this.start());
  }

  /** True once the whole thing is typed — used to park the cursor at the end. */
  readonly done = computed(() => this.revealed() >= this.total);

  private start(): void {
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
    const atLineBreak = this.lineBreaks.has(next);
    this.timer = setTimeout(() => this.tick(), atLineBreak ? LINE_PAUSE_MS : CHAR_MS);
  }

  /**
   * How much of `segment` (the segIndex-th segment of the lineIndex-th line) is
   * currently visible, given how many characters have been revealed overall.
   */
  visible(lineIndex: number, segIndex: number): string {
    const seg = this.lines[lineIndex].segments[segIndex];
    const remaining = this.revealed() - this.segStart[lineIndex][segIndex];
    if (remaining <= 0) return '';
    return remaining >= seg.t.length ? seg.t : seg.t.slice(0, remaining);
  }

  /** A line only renders once the typewriter has reached it. */
  lineStarted(lineIndex: number): boolean {
    return this.revealed() > this.lineStart[lineIndex];
  }
}
