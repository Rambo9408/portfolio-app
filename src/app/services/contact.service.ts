import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FORMSPREE_ENDPOINT } from '../config/site.config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  get configured(): boolean {
    return FORMSPREE_ENDPOINT.trim().length > 0;
  }

  /**
   * POSTs the message to Formspree. Errors on a non-2xx response or a network
   * failure — the caller must surface that rather than reporting success.
   */
  send(payload: ContactPayload): Observable<unknown> {
    if (!this.configured) {
      return throwError(
        () => new Error('Contact form is not configured: set FORMSPREE_ENDPOINT in site.config.ts')
      );
    }

    return this.http.post(FORMSPREE_ENDPOINT, payload, {
      // Without this header Formspree answers with a redirect instead of JSON.
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }
}
