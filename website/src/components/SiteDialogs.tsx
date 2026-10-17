"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Code2,
  Compass,
  GitBranch,
  Github,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Brand, repository } from "./Brand";
import { pages, docHref } from "@/lib/catalog";

export function SiteDialogs({ docs = false }: { docs?: boolean }) {
  const pathname = usePathname();
  const search = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    menu.current?.close();
    search.current?.close();
  }, [pathname]);
  const matches = pages.filter((page) =>
    `${page.title} ${page.description}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  function openSearch() {
    menu.current?.close();
    setQuery("");
    search.current?.showModal();
    setSearchOpen(true);
  }
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openSearch();
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (menuOpen || searchOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, searchOpen]);
  return (
    <>
      <button
        className="search-trigger"
        onClick={openSearch}
        aria-label="Search documentation"
      >
        <Search size={16} />
        <span>{docs ? "Search docs" : "Search"}</span>
        <kbd>⌘ K</kbd>
      </button>
      {!docs && (
        <Link prefetch={false} className="github-link" href={repository}>
          <Github size={18} />
          GitHub
        </Link>
      )}
      <button
        className="menu-toggle"
        onClick={() => {
          menu.current?.showModal();
          setMenuOpen(true);
        }}
        aria-expanded={menuOpen}
      >
        Menu <Menu size={18} />
      </button>
      <dialog
        ref={search}
        className="search-dialog"
        aria-labelledby="search-title"
        onClose={() => setSearchOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) search.current?.close();
        }}
      >
        <div className="overlay-heading">
          <div>
            <p className="eyebrow">The Glimpse documentation</p>
            <h2 id="search-title">Find your next step.</h2>
          </div>
          <button
            className="close-overlay"
            onClick={() => search.current?.close()}
            aria-label="Close search"
          >
            <X />
          </button>
        </div>
        <label className="panel-search">
          <Search size={20} />
          <span className="sr-only">Search documentation</span>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands, workflows, or API…"
          />
        </label>
        <p className="search-count" role="status">
          {matches.length} matching guides
        </p>
        <nav className="search-results" aria-label="Search results">
          {matches.map((page) => (
            <Link prefetch={false} key={page.slug} href={docHref(page.slug)}>
              <BookOpen size={20} />
              <span>
                <strong>{page.title}</strong>
                <small>{page.description}</small>
              </span>
            </Link>
          ))}
        </nav>
        {matches.length === 0 && (
          <div className="empty-search">
            <h3>No matches this time.</h3>
            <p>Try “install”, “comments”, or “GitHub”.</p>
            <button onClick={() => setQuery("")}>Reset search</button>
          </div>
        )}
        <div className="dialog-bottom">
          Use Tab to choose a guide. Escape to close.
        </div>
      </dialog>
      <dialog
        ref={menu}
        className="mobile-dialog"
        aria-labelledby="mobile-title"
        onClose={() => setMenuOpen(false)}
      >
        <div className="mobile-heading">
          <Brand />
          <button
            className="close-overlay"
            onClick={() => menu.current?.close()}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
        <div className="mobile-content">
          <p className="eyebrow">A little perspective goes a long way</p>
          <h2 id="mobile-title">What’s next?</h2>
          <button className="mobile-search" onClick={openSearch}>
            <Search />
            Search docs & guides <kbd>⌘ K</kbd>
          </button>
          <Link prefetch={false} className="mobile-feature" href="/docs/">
            <BookOpen />
            <span>
              <strong>Explore Glimpse</strong>
              <small>Find a clearer view of your changes.</small>
            </span>
          </Link>
          <div className="mobile-pair">
            <Link prefetch={false} href="/docs/">
              <BookOpen />
              <strong>Getting started</strong>
              <small>From install to your first review.</small>
            </Link>
            <Link prefetch={false} href="/docs/workflows/">
              <Compass />
              <strong>Our approach</strong>
              <small>Keep your agent. Own your review.</small>
            </Link>
          </div>
          <div className="mobile-section-title">
            <strong>Browse by task</strong>
            <small>Start with an outcome</small>
          </div>
          {[
            { title: "Compare changes", href: "/docs/cli/", icon: GitBranch },
            {
              title: "Review with an agent",
              href: "/docs/workflows/",
              icon: Compass,
            },
            { title: "Use the local API", href: "/docs/api/", icon: Code2 },
            { title: "Contribute", href: "/docs/development/", icon: BookOpen },
          ].map((item) => (
            <Link
              prefetch={false}
              className="mobile-task"
              href={item.href}
              key={item.href}
            >
              <item.icon size={22} />
              {item.title}
            </Link>
          ))}
          <div className="mobile-note">
            <h3>Not sure where to begin?</h3>
            <p>A changed file is a good start.</p>
            <Link prefetch={false} href="/docs/">
              Open your first diff
            </Link>
          </div>
        </div>
        <div className="mobile-bottom">
          <Link prefetch={false} href={repository}>
            <Github size={20} />
            GitHub
          </Link>
          <Link prefetch={false} href={`${repository}/issues`}>
            Feedback & issues
          </Link>
        </div>
      </dialog>
    </>
  );
}
