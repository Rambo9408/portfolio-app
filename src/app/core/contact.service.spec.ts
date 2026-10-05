import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { FORMSPREE_ENDPOINT } from './site.config';

describe('ContactService', () => {
  let service: ContactService;
  let http: HttpTestingController;

  const payload = { name: 'Ada', email: 'ada@example.com', message: 'Hello there, nice site!' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.useRealTimers();
  });

  it('posts the fields as FormData so the browser skips the CORS preflight', () => {
    service.send(payload).subscribe();

    const req = http.expectOne(FORMSPREE_ENDPOINT);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeInstanceOf(FormData);
    const body = req.request.body as FormData;
    expect(body.get('name')).toBe(payload.name);
    expect(body.get('email')).toBe(payload.email);
    expect(body.get('message')).toBe(payload.message);
    req.flush({ ok: true });
  });

  it('asks Formspree for JSON rather than a redirect', () => {
    service.send(payload).subscribe();
    const req = http.expectOne(FORMSPREE_ENDPOINT);
    expect(req.request.headers.get('Accept')).toBe('application/json');
    req.flush({ ok: true });
  });

  it('errors when Formspree rejects the message', () => {
    let failed = false;
    service.send(payload).subscribe({ error: () => (failed = true) });

    http.expectOne(FORMSPREE_ENDPOINT).flush({ errors: [] }, { status: 422, statusText: 'Unprocessable' });
    expect(failed).toBe(true);
  });

  it('gives up instead of hanging on "Sending…" forever', () => {
    vi.useFakeTimers();
    let failed = false;
    service.send(payload).subscribe({ error: () => (failed = true) });
    const req = http.expectOne(FORMSPREE_ENDPOINT);

    vi.advanceTimersByTime(19_999);
    expect(failed).toBe(false);
    vi.advanceTimersByTime(1);
    expect(failed).toBe(true);
    expect(req.cancelled).toBe(true);
  });

  it('adds a preconnect hint for Formspree only once', () => {
    const count = () =>
      document.head.querySelectorAll(`link[rel="preconnect"][href="${new URL(FORMSPREE_ENDPOINT).origin}"]`).length;
    const before = count();
    service.warmUp();
    service.warmUp();
    expect(count()).toBe(before + 1);
  });
});
