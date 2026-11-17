"use client";
import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Monitor, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Avatar } from "@/components/ui/avatar";
import { navData } from "./data";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const nextTheme = { light: "dark", dark: "system", system: "light" }[theme];
  const ThemeIcon = { light: Sun, dark: Moon, system: Monitor }[theme];
  return (
    <header className="site-header top-0 z-[30] sticky bg-background">
      <nav className="site-nav h-[82px] m-auto gap-8 flex items-center" aria-label="Main navigation">
        <Link
          className="wordmark inline-flex items-center gap-3 tracking-[-0.06em] text-[24px] mr-auto font-semibold"
          href="/"
          onClick={() => setOpen(false)}
        >
          {navData.name}
          <Avatar
            name={navData.name}
            src={navData.avatar}
            className="h-8 w-8 bg-surface text-xs"
            sizes="32px"
          />
        </Link>
        <div className="nav-controls flex">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Theme: ${theme}. Switch to ${nextTheme} theme`}
            title={`Theme: ${theme}. Switch to ${nextTheme}`}
          >
            <ThemeIcon size={18} aria-hidden="true" />
          </button>
          <span className="sr-only" role="status">
            Theme: {theme}
          </span>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
        <div
          id="nav-links"
          className={`nav-links gap-[29px] text-[13px] flex items-center ${open ? "is-open" : ""}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document.querySelector(".menu-toggle")?.focus();
            }
          }}
        >
          {navData.items.map(({ href, label }) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-resume"
            href={navData.resume}
            onClick={() => setOpen(false)}
          >
            Résumé <ArrowUpRight size={14} className="inline-block align-middle" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
