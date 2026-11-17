import { ArrowUpRight } from "lucide-react";
import { aboutData } from "./data";

export function About() {
  return (
    <section
      id="about"
      className="about-section section-shell mx-auto"
      aria-labelledby="about-title"
    >
      <div className="section-kicker gap-6 pt-[28px] flex justify-between text-muted">
        <span>A little context</span>
        <span>Curiosity, put to work</span>
      </div>
      <div className="about-grid">
        <h2 id="about-title">
          I like knowing
          <br />
          <em>how it all fits.</em>
        </h2>
        <div className="about-copy">
          {aboutData.paragraphs.map((paragraph, index) => (
            <p className={index === 0 ? "large-copy" : undefined} key={paragraph}>
              {paragraph}
            </p>
          ))}
          <a
            className="text-link gap-4 py-[7px] text-[12px] leading-[1.5] inline-flex items-center"
            href={aboutData.resume}
          >
            The full story, in résumé form <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="experience-strip mt-[55px] grid">
        {aboutData.experience.map((item) => (
          <div key={item.name}>
            <span className="eyebrow text-muted">{item.period}</span>
            <h3>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.name}{" "}
                  <ArrowUpRight size={16} className="inline-block align-middle" aria-hidden="true" />
                </a>
              ) : item.name}
            </h3>
            <p>{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
