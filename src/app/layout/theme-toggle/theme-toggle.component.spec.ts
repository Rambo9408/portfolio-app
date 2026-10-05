import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../core/theme.service';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  const button = () => (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.toggle')!;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(ThemeToggleComponent);
    await fixture.whenStable();
  });

  it('in dark mode, offers to switch to light', () => {
    expect(button().getAttribute('aria-label')).toBe('Switch to light mode');
    expect(button().title).toBe('Light mode');
  });

  it('switches the theme and its own label when clicked', async () => {
    const theme = TestBed.inject(ThemeService);
    const iconBefore = button().innerHTML;

    button().click();
    await fixture.whenStable();
    expect(theme.theme()).toBe('light');
    expect(button().getAttribute('aria-label')).toBe('Switch to dark mode');
    expect(button().innerHTML).not.toBe(iconBefore);

    button().click();
    await fixture.whenStable();
    expect(theme.theme()).toBe('dark');
    expect(button().getAttribute('aria-label')).toBe('Switch to light mode');
  });
});
