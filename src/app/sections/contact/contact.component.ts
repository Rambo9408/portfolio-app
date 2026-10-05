import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PORTFOLIO } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { ContactService } from '../../core/contact.service';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective, SectionHeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  protected contact = inject(ContactService);

  data = PORTFOLIO.profile;
  /** tel: links must not contain spaces — strip all of them, not just the first. */
  telHref = 'tel:' + this.data.phone.replace(/\s+/g, '');
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
