import { ArrowUpRight, Globe } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Disclosure } from "@/components/ui/disclosure";
import Image from "next/image";
import { projectsData } from "./data";
import { CarouselDemo } from "./carousel-demo";

const external = { target: "_blank", rel: "noopener noreferrer" };

function ProjectPreview({ project }) {
  return (
    <a
      className={`project-art min-w-0 overflow-hidden site-preview gap-6 flex flex-col items-stretch justify-center site-preview-${project.id}`}
      href={project.link}
      {...external}
      aria-label={`Visit ${project.title} (opens in a new tab)`}
    >
      <div className="site-preview-window w-full">
        <div
          className="browser-chrome gap-1 flex items-center"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <p>{new URL(project.link).hostname}</p>
          <span className="preview-arrow">
            <ArrowUpRight size={12} aria-hidden="true" />
          </span>
        </div>
        <div className="site-preview-image w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            className="block h-auto w-full"
            sizes="(max-width: 800px) 85vw, 45vw"
          />
        </div>
      </div>
      <span className="site-preview-caption gap-[15px] text-[10px] flex justify-between items-center">
        {project.title}
        <span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="work-section pt-[105px] section-shell mx-auto"
      aria-labelledby="work-title"
    >
      <div className="section-kicker gap-6 pt-[28px] flex justify-between text-muted">
        <span>Selected work</span>
        <span>Products, systems & small useful things</span>
      </div>
      <div className="section-heading gap-10 flex justify-between items-end">
        <h2 id="work-title">
          From idea
          <br />
          <em>to interaction.</em>
        </h2>
        <p>
          Some of the things I’ve built.
          <br />
          Different problems. The same attention.
        </p>
      </div>
      {projectsData.featured.map((project) => (
        <article
          className={`project-feature gap-[7%] grid items-center project-${project.id}`}
          key={project.id}
          aria-labelledby={`project-${project.id}-title`}
        >
          {project.id === "carousel" ? (
            <div className="project-art aspect-[1.13] min-w-0 overflow-hidden carousel-art p-[30px] grid place-items-center">
              <CarouselDemo />
            </div>
          ) : (
            <ProjectPreview project={project} />
          )}
          <div className="project-copy pr-[10px]">
            <span className="eyebrow text-muted">{project.category}</span>
            <h3 id={`project-${project.id}-title`}>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
            <p>{project.description}</p>
            <ul
              className="project-tags p-0 text-[10px] flex flex-wrap list-none text-muted"
              aria-label={`${project.title} technologies`}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className="project-links gap-[26px] text-[12px] inline-grid grid-cols-2 items-center">
              <a
                className="project-explore gap-4 py-[7px] text-[12px] leading-[1.5] inline-flex items-center"
                href={project.link}
                {...external}
              >
                <Globe size={15} aria-hidden="true" /> {project.linkLabel}
              </a>
              <a
                className="project-source inline-flex items-center gap-4 py-[7px] leading-[1.5]"
                href={project.source}
                {...external}
              >
                <BrandIcon
                  src="/brands/svg/github.svg"
                  className="h-[15px] w-[15px]"
                />
                Source{" "}
                <span className="sr-only">for {project.title}</span>
              </a>
            </div>
            <Disclosure
              className="project-note mt-[22px] pt-[13px]"
              summary="Under the surface"
            >
              <p>{project.detail}</p>
            </Disclosure>
          </div>
        </article>
      ))}
      <Disclosure
        className="project-archive"
        summary={
          <span>
            More from the workbench{" "}
            <small>Experiments, interfaces & useful little things</small>
          </span>
        }
      >
        <div className="archive-list">
          {projectsData.extras.map((project) => (
            <article
              key={project.id}
              className="archive-row gap-10 py-[25px] flex justify-between secondary-project"
            >
              <a
                className="secondary-preview aspect-[1.5] w-full relative overflow-hidden bg-surface"
                href={project.link}
                {...external}
                aria-label={`Visit ${project.title} (opens in a new tab)`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} website screenshot`}
                  fill
                  sizes="(max-width: 600px) 85vw, (max-width: 1000px) 180px, 220px"
                />
              </a>
              <div className="secondary-copy">
                <span className="eyebrow text-muted">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span>{project.technologies.join(" · ")}</span>
              </div>
              <div className="archive-links gap-[18px] text-[12px] flex shrink-0 items-start">
                <a
                  className="inline-flex items-center gap-2"
                  href={project.link}
                  {...external}
                >
                  <Globe size={15} aria-hidden="true" /> Explore{" "}
                  <span className="sr-only">{project.title}</span>
                </a>
                <a
                  className="inline-flex items-center gap-2"
                  href={project.source}
                  {...external}
                >
                  <BrandIcon
                    src="/brands/svg/github.svg"
                    className="h-[15px] w-[15px]"
                  />{" "}
                  {project.sourceLabel || "Source"}{" "}
                  <span className="sr-only">for {project.title}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Disclosure>
      <a
        className="all-repositories mt-6 text-link gap-4 py-[7px] text-[12px] leading-[1.5] inline-flex items-center"
        href={projectsData.more}
        {...external}
      >
        More from where they came from <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
