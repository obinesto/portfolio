"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone, RotateCcw } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { sendContact } from "@/server/contact";
import { contactData } from "./data";

const initialState = { status: "idle", message: "", errors: {} };

export function Contact() {
  const [formVersion, setFormVersion] = useState(0);

  return (
    <ContactSection
      key={formVersion}
      focusForm={formVersion > 0}
      onDismissSuccess={() => setFormVersion((version) => version + 1)}
    />
  );
}

function ContactSection({ focusForm, onDismissSuccess }) {
  const [state, action, pending] = useActionState(sendContact, initialState);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    const firstError = Object.keys(state.errors)[0];
    if (firstError) formRef.current?.elements.namedItem(firstError)?.focus();
  }, [state]);

  function updateValue(event) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <section
      id="contact"
      className="contact-section section-shell mx-auto"
      aria-labelledby="contact-title"
    >
      <div className="section-kicker gap-6 pt-[28px] flex justify-between text-muted">
        <span>Contact</span>
        <span>Open to the next exciting challenge</span>
      </div>
      <div className="contact-grid gap-[9%] grid">
        <div>
          <h2 id="contact-title">
            What are
            <br />
            you building?
          </h2>
          <p className="contact-intro max-w-[330px] text-[13px] leading-[1.8] text-muted">
            {contactData.intro}
          </p>
          <a
            className="email-link gap-[15px] tracking-[-0.03em] py-2 inline-flex items-center"
            href={`mailto:${contactData.email}`}
          >
            {contactData.email} <ArrowUpRight aria-hidden="true" size={20} />
          </a>
          <div className="contact-socials gap-5 mt-6 flex flex-wrap">
            {contactData.socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel={
                  href.startsWith("https") ? "noopener noreferrer" : undefined
                }
              >
                {icon ? (
                  <BrandIcon src={icon} className="h-3.5 w-3.5" />
                ) : (
                  <Phone className="h-3.5 w-3.5" />
                )}
                {label}
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
          <p className="contact-location mt-[36px] text-[10px] leading-[1.9] text-muted">
            Nigeria · UTC +1
            <br />
            Available for local and remote opportunities.
          </p>
        </div>
        {state.status === "success" ? (
          <div
            ref={successRef}
            className="contact-success p-8 bg-surface"
            role="status"
            tabIndex={-1}
          >
            <span className="eyebrow text-muted">In the inbox</span>
            <h3>
              Thank you for
              <br />
              getting in touch.
            </h3>
            <p>{state.message}</p>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                className="text-link inline-flex items-center gap-4 py-[7px] text-[12px] leading-[1.5]"
                onClick={onDismissSuccess}
              >
                Send another message <RotateCcw size={16} aria-hidden="true" />
              </button>
              <a
                className="text-link gap-4 py-[7px] text-[12px] leading-[1.5] inline-flex items-center"
                href="#projects"
              >
                Explore the work <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            action={action}
            className="contact-form pt-[5px]"
            aria-busy={pending}
          >
            <div className="form-pair gap-6 grid">
              <div className="form-field mb-[27px]">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  autoFocus={focusForm}
                  required
                  minLength={2}
                  maxLength={100}
                  value={values.name}
                  onChange={updateValue}
                  aria-invalid={Boolean(state.errors.name)}
                  aria-describedby={
                    state.errors.name ? "name-error" : undefined
                  }
                  placeholder="Alex Morgan…"
                />
                {state.errors.name && (
                  <p id="name-error" className="field-error">
                    {state.errors.name}
                  </p>
                )}
              </div>
              <div className="form-field mb-[27px]">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={updateValue}
                  aria-invalid={Boolean(state.errors.email)}
                  aria-describedby={
                    state.errors.email ? "email-error" : undefined
                  }
                  placeholder="alex@company.com…"
                />
                {state.errors.email && (
                  <p id="email-error" className="field-error">
                    {state.errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="form-field mb-[27px]">
              <label htmlFor="contact-message">Tell me a little about it</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={20}
                maxLength={5000}
                value={values.message}
                onChange={updateValue}
                aria-invalid={Boolean(state.errors.message)}
                aria-describedby={
                  state.errors.message ? "message-error" : undefined
                }
                placeholder="The role, the idea, or the problem you’re working on…"
              />
              {state.errors.message && (
                <p id="message-error" className="field-error">
                  {state.errors.message}
                </p>
              )}
            </div>
            <div
              className="contact-trap w-[1px] h-[1px] absolute overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <p className="form-status" role="status" aria-live="polite">
              {pending ? "Sending your message…" : state.message}
            </p>
            <div className="form-bottom gap-[30px] mt-[25px] flex justify-between items-center">
              <p>Your details are used only to respond to your message.</p>
              <button
                type="submit"
                className="send-button text-[11px] whitespace-nowrap"
                disabled={pending}
              >
                {pending ? "Sending…" : "Send message"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
