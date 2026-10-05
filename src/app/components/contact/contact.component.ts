import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';
import { ContactService } from '../../services/contact.service';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective],
  template: `
    <section id="contact" class="section section--alt">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="section-kicker">06 — Contact</span>
          <h2 class="section-title">Let's work together</h2>
          <p>Have a role or project in mind? I'd love to hear about it.</p>
        </div>

        <div class="contact">
          <div class="contact__info" appReveal>
            <a class="contact__row" [href]="'mailto:' + data.email">
              <span class="contact__ico">✉</span>
              <span><small>Email</small>{{ data.email }}</span>
            </a>
            <a class="contact__row" [href]="'tel:' + data.phone.replace(' ', '')">
              <span class="contact__ico">☎</span>
              <span><small>Phone</small>{{ data.phone }}</span>
            </a>
            <a class="contact__row" [href]="data.githubUrl" target="_blank" rel="noopener">
              <span class="contact__ico">⌘</span>
              <span><small>GitHub</small>{{ data.github }}</span>
            </a>
            <a class="contact__row" [href]="data.linkedinUrl" target="_blank" rel="noopener">
              <span class="contact__ico">in</span>
              <span><small>LinkedIn</small>{{ data.linkedin }}</span>
            </a>
          </div>

          <form class="contact__form card" [formGroup]="form" (ngSubmit)="submit()" appReveal="80">
            @switch (status()) {
              @case ('sent') {
                <div class="panel" data-state="sent">
                  <div class="panel__icon panel__icon--ok">✓</div>
                  <h3>Message sent</h3>
                  <p>Thanks for reaching out — I'll get back to you at the email you gave me.</p>
                  <button type="button" class="btn btn--ghost" (click)="reset()">Send another</button>
                </div>
              }

              @case ('error') {
                <!-- Never claim success we didn't get. Give them a path that actually works. -->
                <div class="panel" data-state="error">
                  <div class="panel__icon panel__icon--err">!</div>
                  <h3>Couldn't send your message</h3>
                  <p>
                    Something went wrong on the way. Please email me directly at
                    <a class="panel__mail" [href]="'mailto:' + data.email">{{ data.email }}</a>
                  </p>
                  <button type="button" class="btn btn--ghost" (click)="retry()">Try again</button>
                </div>
              }

              @default {
                <div class="field">
                  <label for="name">Name</label>
                  <input id="name" type="text" formControlName="name" placeholder="Your name" />
                  @if (invalid('name')) { <small class="err">Please enter your name.</small> }
                </div>
                <div class="field">
                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email" placeholder="you@example.com" />
                  @if (invalid('email')) { <small class="err">Enter a valid email.</small> }
                </div>
                <div class="field">
                  <label for="message">Message</label>
                  <textarea id="message" rows="4" formControlName="message" placeholder="Tell me about it…"></textarea>
                  @if (invalid('message')) { <small class="err">Message is a little short.</small> }
                </div>

                <!-- Honeypot: humans never see or tab to this; bots fill it in.
                     '_gotcha' is Formspree's own honeypot name, so it's dropped server-side too. -->
                <input
                  class="gotcha"
                  type="text"
                  formControlName="_gotcha"
                  tabindex="-1"
                  autocomplete="off"
                  aria-hidden="true"
                />

                <button type="submit" class="btn btn--primary" [disabled]="status() === 'sending'">
                  {{ status() === 'sending' ? 'Sending…' : 'Send Message' }}
                </button>
              }
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 2rem; }
      .contact__info { display: grid; gap: 0.9rem; align-content: start; }
      .contact__row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.2rem;
        border-radius: var(--radius-sm);
        background: var(--surface);
        border: 1px solid var(--border);
        transition: transform 0.18s ease, border-color 0.18s ease;
      }
      .contact__row:hover { transform: translateX(5px); border-color: var(--accent); }
      .contact__ico {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        flex: none;
        font-size: 0.95rem;
        color: var(--accent);
        background: var(--accent-soft);
      }
      .contact__row span:last-child { display: flex; flex-direction: column; color: var(--heading); font-size: 0.95rem; word-break: break-all; }
      .contact__row small { color: var(--text-dim); font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.08em; }

      .contact__form { padding: 1.8rem; display: grid; gap: 1.1rem; }
      .field { display: grid; gap: 0.4rem; }
      .field label { font-size: 0.85rem; font-weight: 600; color: var(--heading); }
      .field input,
      .field textarea {
        width: 100%;
        padding: 0.8rem 0.95rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
        background: var(--bg-alt);
        color: var(--text);
        font-family: var(--font-body);
        font-size: 0.95rem;
        resize: vertical;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
      }
      .field input:focus,
      .field textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-soft);
      }
      .err { color: #ef4444; font-size: 0.78rem; }

      .btn--primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

      /* Off-screen rather than display:none — some bots skip hidden fields. */
      .gotcha {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }

      .panel { text-align: center; padding: 1.5rem 0; display: grid; gap: 0.6rem; justify-items: center; }
      .panel__icon {
        width: 56px; height: 56px; border-radius: 50%;
        display: grid; place-items: center;
        font-size: 1.6rem; font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .panel__icon--ok { color: var(--accent-contrast); background: var(--accent); }
      .panel__icon--err { color: #fff; background: #ef4444; }
      .panel h3 { color: var(--heading); font-family: var(--heading-font); }
      .panel p { color: var(--text-dim); font-size: 0.9rem; max-width: 38ch; }
      .panel__mail { color: var(--accent); font-weight: 600; text-decoration: underline; }

      @media (max-width: 780px) { .contact { grid-template-columns: 1fr; } }
    `,
  ],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contact = inject(ContactService);

  data = PORTFOLIO.profile;
  status = signal<Status>('idle');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    _gotcha: [''], // honeypot — must stay empty
  });

  invalid(ctrl: string): boolean {
    const c = this.form.get(ctrl);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.status() === 'sending') return; // guard against double-submit

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message, _gotcha } = this.form.getRawValue();

    // Honeypot tripped: this is a bot. Show success but send nothing —
    // never tell a bot it was caught, or it just retries differently.
    if (_gotcha) {
      this.status.set('sent');
      return;
    }

    this.status.set('sending');
    this.contact.send({ name: name!, email: email!, message: message! }).subscribe({
      next: () => this.status.set('sent'),
      error: () => this.status.set('error'),
    });
  }

  /** Back to a blank form. */
  reset(): void {
    this.form.reset({ name: '', email: '', message: '', _gotcha: '' });
    this.status.set('idle');
  }

  /** Back to the form, keeping what they typed so they don't retype it. */
  retry(): void {
    this.status.set('idle');
  }
}
