import { Network } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Disclosure } from "@/components/ui/disclosure";
import { groups } from "./data";

export function Toolkit() {
  return (
    <section
      id="toolkit"
      className="toolkit-section section-shell mx-auto"
      aria-labelledby="toolkit-title"
    >
      <div className="section-kicker gap-6 pt-[28px] flex justify-between text-muted">
        <span>The toolkit</span>
        <span>Tools follow the problem</span>
      </div>
      <div className="toolkit-layout">
        <h2 id="toolkit-title">
          Across
          <br />
          <em>the stack.</em>
        </h2>
        <div className="toolkit-list">
          {groups.map((group) => (
            <Disclosure
              className="toolkit-disclosure"
              key={group.label}
              summary={
                <>
                  <span className="eyebrow min-w-0 break-words text-muted">
                    {group.label}
                  </span>
                  <span className="toolkit-title text-[19px] leading-[1.45] tracking-[-0.035em]">
                    {group.title}
                  </span>
                </>
              }
            >
              <div className="toolkit-detail">
                <p>{group.description}</p>
                <ul aria-label={`${group.label} tools`}>
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="inline-flex items-center gap-2">
                      {tool.image ? (
                        <BrandIcon src={tool.image} className="h-6 w-6" />
                      ) : (
                        <Network size={24} aria-hidden="true" />
                      )}
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
