import { ArrowUpRight } from "lucide-react";
import { heroData } from "./data";
import { PortraitCarousel } from "./portrait-carousel";

export function Hero() {
  return (
    <section className="hero pt-[34px] section-shell mx-auto" aria-labelledby="hero-title">
      <div className="hero-topline gap-5 flex justify-between items-center">
        <span className="eyebrow text-muted">{heroData.role}</span>
        <a className="availability gap-[9px] inline-flex items-center" href="#contact">
          <span aria-hidden="true" />
          Open to opportunities
        </a>
      </div>
      <div className="hero-name gap-[2vw] leading-[1.3] tracking-[-0.09em] flex justify-between items-center font-semibold whitespace-nowrap" aria-hidden="true">
        <span>{heroData.firstName.toUpperCase()}</span>
        <span className="hero-name-last gap-[2vw] flex items-center">
          {heroData.lastName.toUpperCase()}
          <span className="name-arrow text-[0.95em] text-accent font-light">
            <ArrowUpRight size="1.5em" strokeWidth={1} className="inline-block align-middle" aria-hidden="true" />
          </span>
        </span>
      </div>
      <div className="hero-composition gap-[9%] relative grid bg-surface">
        <div className="hero-heading py-[15px]">
          <p className="hero-intro text-[12px] mb-[25px] text-muted">{heroData.intro}</p>
          <h1 id="hero-title">
            Turn the idea
            <br />
            into something
            <br />
            <em>people use.</em>
          </h1>
          <p className="hero-description text-[14px] leading-[1.8] max-w-[340px] text-muted">
            {heroData.description}
          </p>
          <div className="hero-actions gap-[22px] text-[12px] flex flex-wrap items-center">
            <a className="primary-link" href="#projects">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link gap-4 py-[7px] text-[12px] leading-[1.5] inline-flex items-center" href={heroData.resume}>
              Read my résumé <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <PortraitCarousel />
        <span className="hero-side-note right-[15px] top-[50%] text-[10px] tracking-[0.1em] absolute text-muted" aria-hidden="true">
          Idea ↔ Everyday use
        </span>
      </div>
      <div className="hero-bottom gap-8 py-[25px] flex text-muted">
        {heroData.principles.map((principle) => (
          <span key={principle}>{principle}</span>
        ))}
        <a href="#projects">Selected work below ↓</a>
      </div>
    </section>
  );
}
