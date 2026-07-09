'use client';

import { useState } from 'react';
import { Mail, AtSign, ChevronRight, Loader2 } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/src/lib/contactus';
import { SuccessDialog } from '../thank-you-popup';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', message: '' };

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Udfyld venligst alle felter.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm(form);
      setForm(initialState);
      setShowSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Noget gik galt. Prøv venligst igen.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen w-full bg-[#fff9f5] px-6 py-10 sm:px-12 lg:px-20">
      <nav className="mb-16 flex items-center gap-1 text-xs text-[#8a7f74]">
        <span>Hjem</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#2e241b]">Kontakt os</span>
      </nav>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-[#2e241b] sm:text-5xl">
              Kontakt os
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-[#8a7f74]">
              Har du spørgsmål om produkter eller din ordre? Kontakt vores
              supportteam. Vi svarer inden for 24–48 timer.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[#e8ddd0] bg-white px-4 py-2.5 text-sm text-[#2e241b] shadow-sm">
            <Mail className="h-4 w-4 text-[#2e241b]" />
            <span>Kontakt os:</span>
            <a
              href="mailto:help@RestfulBlanket.inc"
              className="font-medium hover:underline"
            >
              help@RestfulBlanket.inc
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#2e241b]">
              Sociale medier
            </h2>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/restfulblanket/"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2e241b] text-white transition hover:opacity-90"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/restfulblanket/"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8ddd0] bg-white text-[#2e241b] transition hover:bg-[#f5ece1]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Threads"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8ddd0] bg-white text-[#2e241b] transition hover:bg-[#f5ece1]"
              >
                <AtSign className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#2e241b]"
              >
                Navn
              </label>

              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Dit navn"
                className="rounded-full border-[#e8ddd0] bg-[#fdfaf6] px-4 py-5 text-sm placeholder:text-[#b3a89c] focus-visible:ring-[#2e241b]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#2e241b]"
              >
                E-mail
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Din e-mail"
                className="rounded-full border-[#e8ddd0] bg-[#fdfaf6] px-4 py-5 text-sm placeholder:text-[#b3a89c] focus-visible:ring-[#2e241b]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[#2e241b]"
              >
                Besked
              </label>

              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Din besked"
                rows={5}
                className="resize-none rounded-2xl border-[#e8ddd0] bg-[#fdfaf6] px-4 py-3 text-sm placeholder:text-[#b3a89c] focus-visible:ring-[#2e241b]"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-[#3a2e22] py-6 text-sm font-medium text-white hover:bg-[#2e241b]"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Send besked'
              )}
            </Button>
          </form>
        </div>
      </div>

      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        heading="Besked sendt!"
        description="Tak fordi du kontaktede os. Vores supportteam vender tilbage til dig inden for 24–48 timer."
        redirectUrl="/"
      />
    </section>
  );
}
