"use client";
import Image from "next/image";
import { useState } from "react";
import { repository } from "./Brand";

const paths = {
  copy: "M9 8h11v13H9zM5 16H3V3h12v2",
  up: "m5 10 7-7 7 7M12 3v18",
  chat: "M4 4h16v13H9l-5 4z",
  arrow: "M14 3h7v7m0-7L10 14M10 4H3v17h17v-7",
};
function ActionIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function DocActions({
  markdown,
  file,
}: {
  markdown: string;
  file: string;
}) {
  const [status, setStatus] = useState("Copy as Markdown");
  const [fallback, setFallback] = useState(false);
  const prompt = encodeURIComponent(
    `Help me use Glimpse based on this documentation:\n\n${markdown}`,
  );
  const providers = [
    {
      name: "ChatGPT",
      icon: "chatgpt",
      href: `https://chatgpt.com/?prompt=${prompt}`,
    },
    {
      name: "Claude",
      icon: "claude",
      href: `https://claude.ai/new?q=${prompt}`,
    },
    { name: "v0", icon: "v0", href: `https://v0.app/?q=${prompt}` },
    { name: "T3 Chat", icon: "t3", href: `https://t3.chat/new?q=${prompt}` },
    { name: "Scira", icon: "scira", href: `https://scira.ai/?q=${prompt}` },
    {
      name: "Cursor",
      icon: "cursor",
      href: `https://cursor.com/link/prompt?text=${prompt}`,
    },
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("Markdown copied");
      setFallback(false);
    } catch {
      setFallback(true);
      setStatus("Select Markdown below");
    }
  }
  return (
    <div className="doc-actions">
      <a
        href={`${repository}/edit/main/docs/${file}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/brands/github.svg" alt="" width={19} height={19} />
        Edit on GitHub
      </a>
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ActionIcon name="up" />
        Scroll to top
      </button>
      <button type="button" onClick={copy} aria-live="polite">
        <ActionIcon name="copy" />
        {status}
      </button>
      {fallback && (
        <textarea
          readOnly
          aria-label="Page Markdown"
          value={markdown}
          onFocus={(event) => event.target.select()}
        />
      )}
      <details>
        <summary>
          <ActionIcon name="chat" />
          Open in chat
          <span className="action-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="chat-providers">
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={provider.href}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="brand-icon"
                src={`/brands/chat/${provider.icon}.svg`}
                alt=""
                width={19}
                height={19}
              />
              <span>{provider.name}</span>
              <ActionIcon name="arrow" />
            </a>
          ))}
        </div>
        <p className="chat-note">
          Opens with this page’s documentation in the prompt.
        </p>
      </details>
    </div>
  );
}
