"use client";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel";
import { testimonials } from "./data";

export function Testimonials() {
  return (
    <section
      className="testimonials section-shell mx-auto"
      aria-labelledby="testimonials-title"
    >
      <div className="section-kicker gap-6 pt-[28px] flex justify-between text-muted">
        <span>Kind words</span>
        <span>People behind the work</span>
      </div>
      <div className="section-heading gap-10 flex justify-between items-end">
        <h2 id="testimonials-title">
          Good work is<br /><em>a team effort.</em>
        </h2>
        <p>
          A space for the people I’ve built with.<br />
          Different perspectives. Shared work.
        </p>
      </div>
      <div className="testimonials-carousel">
        <ResponsiveCarousel
          items={testimonials}
          keyExtractor={(item) => item.id}
          label="Collaborator testimonials"
          interval={8000}
          renderItem={(item) => (
            <article className="testimonial-slide flex h-full flex-col">
              <span
                className="testimonial-quote-mark text-6xl leading-none text-accent"
                aria-hidden="true"
              >
                “
              </span>
              <div className="testimonial-content flex min-w-0 flex-1 flex-col">
                <blockquote>{item.quote}</blockquote>
                <div className="testimonial-person mt-auto flex min-w-0 flex-wrap items-center gap-3 pt-6">
                  <Avatar
                    name={item.name}
                    src={item.avatar}
                    className="testimonial-avatar h-[50px] w-[50px] bg-background text-[15px]"
                  />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.role}</span>
                  </div>
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn (opens in a new tab)"
                  >
                    <BrandIcon src="/brands/svg/linkedin.svg" className="h-3.5 w-3.5" />
                    LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  );
}
