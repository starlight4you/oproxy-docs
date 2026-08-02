"use client";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { marked } from "marked";
import { useEffect, useMemo, useRef, useState } from "react";

type PageEntry = {
  title: string;
  lang: "zh" | "en";
  section: string;
  route: string;
  source: string;
  order: number;
  excerpt: string;
  searchText: string;
};

type SiteIndex = { pages: PageEntry[] };
type TocItem = { depth: number; text: string; id: string };

const sectionLabels = {
  zh: {
    docs: "开始",
    apiKey: "API 与控制台",
    tokenflux: "账户与计费",
    agents: "Coding 工具",
    chatbot: "聊天/智能体",
    terms: "规则与支持",
  },
  en: {
    docs: "Get started",
    apiKey: "API & Console",
    tokenflux: "Account & Billing",
    agents: "Coding tools",
    chatbot: "Chat / Agents",
    terms: "Rules & Support",
  },
};

const sectionOrder = ["docs", "apiKey", "tokenflux", "agents", "chatbot", "terms"];

function stripInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[\*_~]/g, "")
    .trim();
}

function slugify(text: string) {
  return stripInlineMarkdown(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-") || "section";
}

function tocFromMarkdown(markdown: string): TocItem[] {
  const seen = new Map<string, number>();
  let inFence = false;
  const result: TocItem[] = [];

  for (const line of markdown.split("\n")) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const text = stripInlineMarkdown(match[2]);
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    result.push({ depth: match[1].length, text, id: count ? `${base}-${count}` : base });
  }
  return result;
}

let customBlockCounter = 0;

function expandCustomBlocks(markdown: string): string {
  let output = markdown.replace(
    /<DocsTabs\s+default-tab="([^"]+)"\s*>([\s\S]*?)<\/DocsTabs>/g,
    (_whole, defaultTab: string, body: string) => {
      const groupId = `tabs-${customBlockCounter++}`;
      const tabs = [...body.matchAll(/<DocsTab\s+title="([^"]+)"\s+name="([^"]+)"\s*>([\s\S]*?)<\/DocsTab>/g)];
      if (!tabs.length) return body;

      const radios = tabs
        .map((tab, index) => {
          const checked = tab[2] === defaultTab || (!tabs.some((item) => item[2] === defaultTab) && index === 0);
          return `<input class="tab-radio" type="radio" id="${groupId}-${index}" name="${groupId}"${checked ? " checked" : ""}>`;
        })
        .join("");
      const labels = tabs
        .map((tab, index) => `<label for="${groupId}-${index}">${tab[1]}</label>`)
        .join("");
      const panels = tabs
        .map((tab) => `<section class="tab-panel">${marked.parse(expandCustomBlocks(tab[3].trim()))}</section>`)
        .join("");

      return `\n\n<div class="docs-tabs">${radios}<div class="tab-labels" role="tablist">${labels}</div><div class="tab-panels">${panels}</div></div>\n\n`;
    },
  );

  output = output.replace(
    /^:::\s*(tip|warning|danger|info|details)(?:\s+([^\n]+))?\n([\s\S]*?)^:::\s*$/gm,
    (_whole, kind: string, suppliedTitle: string | undefined, body: string) => {
      const defaults: Record<string, string> = {
        tip: "TIP",
        warning: "WARNING",
        danger: "DANGER",
        info: "INFO",
        details: "Details",
      };
      const title = suppliedTitle?.trim() || defaults[kind];
      const inner = marked.parse(expandCustomBlocks(body.trim()));
      if (kind === "details") {
        return `\n\n<details class="custom-details"><summary>${title}</summary><div>${inner}</div></details>\n\n`;
      }
      return `\n\n<aside class="callout callout-${kind}"><p class="callout-title">${title}</p>${inner}</aside>\n\n`;
    },
  );

  return output;
}

function renderMarkdown(markdown: string) {
  customBlockCounter = 0;
  return marked.parse(expandCustomBlocks(markdown.replace(/^\uFEFF/, "")), {
    gfm: true,
    breaks: false,
  }) as string;
}

function resolveInternalHref(href: string) {
  try {
    const url = new URL(href, window.location.href);
    const isDocsHost = url.hostname === window.location.hostname;
    if (!isDocsHost) return null;
    if (url.pathname.endsWith(".md")) {
      if (url.pathname === "/index.md") return "/";
      if (url.pathname === "/en.md") return "/en/";
      return `${url.pathname.replace(/\.md$/, ".html")}${url.hash}`;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function Header({
  lang,
  onOpenMenu,
  onOpenSearch,
  dark,
  onToggleTheme,
}: {
  lang: "zh" | "en";
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  dark: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="icon-button mobile-only" onClick={onOpenMenu} aria-label={lang === "zh" ? "打开导航" : "Open navigation"}>
          <Menu size={20} />
        </button>
        <a className="brand" href={lang === "zh" ? "/" : "/en/"}>
          <img src="/logo.svg" alt="" />
          <span>Oproxy Docs</span>
        </a>
        <nav className="top-links" aria-label="Primary">
          <a href={lang === "zh" ? "/" : "/en/"}>{lang === "zh" ? "首页" : "Home"}</a>
          <a href={lang === "zh" ? "/docs/quickstart.html" : "/en/docs/quickstart.html"}>Docs</a>
          <a href="https://oproxy.world/dashboard" target="_blank" rel="noreferrer">{lang === "zh" ? "控制台" : "Console"}</a>
        </nav>
        <div className="header-actions">
          <button className="search-trigger" onClick={onOpenSearch}>
            <Search size={17} />
            <span>{lang === "zh" ? "搜索文档" : "Search docs"}</span>
            <kbd>⌘ K</kbd>
          </button>
          <a className="language-link" href={lang === "zh" ? "/en/docs/quickstart.html" : "/docs/quickstart.html"}>
            {lang === "zh" ? "English" : "简体中文"}
          </a>
          <button className="icon-button" onClick={onToggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ pages, lang, currentRoute, open, onClose }: { pages: PageEntry[]; lang: "zh" | "en"; currentRoute: string; open: boolean; onClose: () => void }) {
  const labels = sectionLabels[lang];
  const visible = pages.filter((page) => page.lang === lang && page.section !== "home");
  return (
    <>
      <button className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={onClose} aria-label="Close navigation" />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="mobile-sidebar-title">
          <span>Oproxy Docs</span>
          <button className="icon-button" onClick={onClose}><X size={19} /></button>
        </div>
        <nav aria-label="Documentation">
          {sectionOrder.map((section) => {
            const sectionPages = visible.filter((page) => page.section === section).sort((a, b) => a.order - b.order);
            if (!sectionPages.length) return null;
            return (
              <div className="sidebar-group" key={section}>
                <p>{labels[section as keyof typeof labels]}</p>
                {sectionPages.map((page) => (
                  <a className={page.route === currentRoute ? "active" : ""} href={page.route} key={page.route}>
                    {page.title.replace(/ 使用指南$/, "")}
                  </a>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function SearchDialog({ open, pages, lang, onClose }: { open: boolean; pages: PageEntry[]; lang: "zh" | "en"; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return pages.filter((page) => page.lang === lang && page.section !== "home").slice(0, 8);
    return pages
      .filter((page) => page.lang === lang && `${page.title} ${page.searchText}`.toLocaleLowerCase().includes(needle))
      .slice(0, 12);
  }, [lang, pages, query]);

  if (!open) return null;
  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label={lang === "zh" ? "搜索文档" : "Search documentation"}>
      <button className="search-backdrop" onClick={onClose} aria-label="Close search" />
      <div className="search-dialog">
        <div className="search-input-row">
          <Search size={20} />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "zh" ? "搜索文档…" : "Search documentation…"} />
          <button onClick={onClose}>ESC</button>
        </div>
        <div className="search-results">
          {results.length ? results.map((page) => (
            <a href={page.route} key={page.route}>
              <div><strong>{page.title}</strong><span>{page.excerpt}</span></div>
              <ChevronRight size={17} />
            </a>
          )) : <p className="empty-search">{lang === "zh" ? "没有找到匹配内容" : "No matching content"}</p>}
        </div>
      </div>
    </div>
  );
}

export function DocsApp({ sourcePath, currentRoute }: { sourcePath: string; currentRoute: string }) {
  const [markdown, setMarkdown] = useState("");
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const lang: "zh" | "en" = sourcePath === "/en.md" || sourcePath.startsWith("/en/") ? "en" : "zh";

  useEffect(() => {
    const stored = localStorage.getItem("oproxy-docs-theme");
    const useDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(useDark);
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(sourcePath).then(async (response) => {
        if (!response.ok) throw new Error("not-found");
        return response.text();
      }),
      fetch("/site-index.json").then((response) => response.json() as Promise<SiteIndex>),
    ])
      .then(([content, index]) => {
        setMarkdown(content);
        setPages(index.pages);
        setNotFound(false);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [sourcePath]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const toc = useMemo(() => tocFromMarkdown(markdown), [markdown]);
  const orderedPages = useMemo(() => pages.filter((page) => page.lang === lang && page.section !== "home").sort((a, b) => a.order - b.order), [lang, pages]);
  const pageIndex = orderedPages.findIndex((page) => page.route === currentRoute);
  const previous = pageIndex > 0 ? orderedPages[pageIndex - 1] : null;
  const next = pageIndex >= 0 && pageIndex < orderedPages.length - 1 ? orderedPages[pageIndex + 1] : null;

  useEffect(() => {
    const article = articleRef.current;
    if (!article || !html) return;

    const seen = new Map<string, number>();
    article.querySelectorAll("h2, h3").forEach((heading) => {
      const base = slugify(heading.textContent ?? "section");
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      heading.id = count ? `${base}-${count}` : base;
      heading.classList.add("anchored-heading");
    });

    article.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      const local = resolveInternalHref(href);
      if (local) {
        anchor.setAttribute("href", local);
      } else if (/^https?:/.test(href)) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noreferrer");
        if (!anchor.closest("pre, code") && !anchor.querySelector("svg")) {
          anchor.classList.add("external-link");
        }
      }
    });

    const cleanups: Array<() => void> = [];
    article.querySelectorAll("pre").forEach((pre) => {
      const button = document.createElement("button");
      button.className = "code-copy";
      button.type = "button";
      button.textContent = lang === "zh" ? "复制" : "Copy";
      const copy = async () => {
        await navigator.clipboard.writeText(pre.textContent ?? "");
        button.textContent = lang === "zh" ? "已复制" : "Copied";
        window.setTimeout(() => { button.textContent = lang === "zh" ? "复制" : "Copy"; }, 1400);
      };
      button.addEventListener("click", copy);
      pre.appendChild(button);
      cleanups.push(() => button.removeEventListener("click", copy));
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [html, lang]);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    localStorage.setItem("oproxy-docs-theme", nextDark ? "dark" : "light");
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="site-shell">
      <Header lang={lang} onOpenMenu={() => setMenuOpen(true)} onOpenSearch={() => setSearchOpen(true)} dark={dark} onToggleTheme={toggleTheme} />
      <Sidebar pages={pages} lang={lang} currentRoute={currentRoute} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-area">
        <div className="doc-column">
          {loading ? (
            <div className="loading-state"><span /><span /><span /><span /></div>
          ) : notFound ? (
            <div className="not-found"><strong>404</strong><h1>{lang === "zh" ? "没有找到这个页面" : "Page not found"}</h1><a href={lang === "zh" ? "/docs/quickstart.html" : "/en/docs/quickstart.html"}>{lang === "zh" ? "返回快速开始" : "Back to Quickstart"}</a></div>
          ) : (
            <>
              <div className="doc-tools">
                <button onClick={copyMarkdown}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? (lang === "zh" ? "已复制" : "Copied") : (lang === "zh" ? "复制 Markdown" : "Copy Markdown")}</button>
                <a href={sourcePath} target="_blank"><ExternalLink size={15} />Markdown</a>
              </div>
              <article ref={articleRef} className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
              {pageIndex >= 0 && (
                <nav className="pager" aria-label="Pagination">
                  {previous ? <a className="previous" href={previous.route}><span><ChevronLeft size={15} />{lang === "zh" ? "上一页" : "Previous page"}</span><strong>{previous.title}</strong></a> : <span />}
                  {next ? <a className="next" href={next.route}><span>{lang === "zh" ? "下一页" : "Next page"}<ChevronRight size={15} /></span><strong>{next.title}</strong></a> : <span />}
                </nav>
              )}
            </>
          )}
        </div>
        {toc.length > 0 && (
          <aside className="toc">
            <p>{lang === "zh" ? "本页内容" : "On this page"}</p>
            <nav>{toc.map((item) => <a className={item.depth === 3 ? "level-three" : ""} href={`#${item.id}`} key={`${item.id}-${item.text}`}>{item.text}</a>)}</nav>
          </aside>
        )}
      </main>
      <SearchDialog open={searchOpen} pages={pages} lang={lang} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
