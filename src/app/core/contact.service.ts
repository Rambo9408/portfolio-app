import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timeout } from 'rxjs';
import { FORMSPREE_ENDPOINT } from './site.config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Give up after this long so the button never sits on "Sending…" forever. */
const SEND_TIMEOUT_MS = 20_000;

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  private warmed = false;

  get configured(): boolean {
    return FORMSPREE_ENDPOINT.trim().length > 0;
  }

  /**
   * Opens the DNS/TCP/TLS connection to Formspree while the visitor is still
   * typing, so pressing Send costs one round trip instead of several.
   */
  warmUp(): void {
    if (this.warmed || !this.configured) return;
    this.warmed = true;
    const link = this.document.createElement('link');
    link.rel = 'preconnect';
    link.href = new URL(FORMSPREE_ENDPOINT).origin;
    link.crossOrigin = 'anonymous';
    this.document.head.appendChild(link);
  }

  /**
   * POSTs the message to Formspree. Errors on a non-2xx response, a network
   * failure or a timeout — the caller must surface that rather than reporting success.
   */
  send(payload: ContactPayload): Observable<unknown> {
    if (!this.configured) {
      return throwError(
        () => new Error('Contact form is not configured: set FORMSPREE_ENDPOINT in site.config.ts')
      );
    }

    // FormData (not JSON) keeps this a CORS "simple request": no OPTIONS
    // preflight, so the browser makes one trip to Formspree instead of two.
    const body = new FormData();
    body.append('name', payload.name);
    body.append('email', payload.email);
    body.append('message', payload.message);

    return this.http
      .post(FORMSPREE_ENDPOINT, body, {
        // Without this header Formspree answers with a redirect instead of JSON.
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .pipe(timeout(SEND_TIMEOUT_MS));
  }
}
