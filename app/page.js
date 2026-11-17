import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav/nav";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Toolkit } from "@/components/toolkit/toolkit";
import { Projects } from "@/components/projects/projects";
import { Contact } from "@/components/contact/contact";
import { Testimonials } from "@/components/testimonials/testimonials";

export default function Home() {
  return (
    <>
      <a className="skip-link left-4 top-[-100px] p-4 z-[100] fixed text-background" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Toolkit />
        <Testimonials />
        <Contact />
      </main>
      <footer className="site-footer section-shell mx-auto">
        <a href="#main" className="footer-name leading-[1.25] tracking-[-0.08em] flex justify-between font-medium">
          Cyprian Obi
          <span>
            <ArrowUpRight size="1.5em" strokeWidth={1} className="inline-block align-middle" aria-hidden="true" />
          </span>
        </a>
        <div>
          <span>Thoughtfully built. Always improving.</span>
          <span>© {new Date().getFullYear()} Cyprian Obi</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
