import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactComponent } from './contact.component';
import { FORMSPREE_ENDPOINT } from '../../core/site.config';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let http: HttpTestingController;

  const el = () => fixture.nativeElement as HTMLElement;
  const state = () => el().querySelector('.panel')?.getAttribute('data-state') ?? 'form';

  function fill(values: Partial<{ name: string; email: string; message: string; _gotcha: string }> = {}) {
    component.form.setValue({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I have a role you might like.',
      _gotcha: '',
      ...values,
    });
  }

  async function submit() {
    el().querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('does not send an invalid form, and shows the field errors', async () => {
    await submit();
    http.expectNone(FORMSPREE_ENDPOINT);
    expect(el().querySelectorAll('.err').length).toBe(3);
  });

  it('shows success only after Formspree accepts the message', async () => {
    fill();
    await submit();

    const req = http.expectOne(FORMSPREE_ENDPOINT);
    expect(el().querySelector<HTMLButtonElement>('button[type=submit]')!.disabled).toBe(true);
    expect(state()).toBe('form');

    req.flush({ ok: true });
    await fixture.whenStable();
    expect(state()).toBe('sent');
  });

  it('shows the error panel with a mailto fallback when sending fails', async () => {
    fill();
    await submit();
    http.expectOne(FORMSPREE_ENDPOINT).error(new ProgressEvent('error'));
    await fixture.whenStable();

    expect(state()).toBe('error');
    expect(el().querySelector('.panel__mail')?.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('keeps what the visitor typed when they retry', async () => {
    fill();
    await submit();
    http.expectOne(FORMSPREE_ENDPOINT).error(new ProgressEvent('error'));
    await fixture.whenStable();

    component.retry();
    await fixture.whenStable();
    expect(state()).toBe('form');
    expect(component.form.value.message).toBe('I have a role you might like.');
  });

  it('silently drops bot submissions caught by the honeypot', async () => {
    fill({ _gotcha: 'http://spam.example' });
    await submit();

    http.expectNone(FORMSPREE_ENDPOINT);
    expect(state()).toBe('sent');
  });
});
