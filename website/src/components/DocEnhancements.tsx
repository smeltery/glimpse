"use client";
import { useEffect, useRef } from "react";

export function DocEnhancements() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const article = marker.current?.closest("article");
    if (!article) return;
    let cancelled = false;
    const diagrams = article.querySelectorAll<HTMLElement>(".mermaid");
    const observer = new IntersectionObserver(async (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "neutral",
          themeVariables: {
            fontFamily: "DM Sans Variable, sans-serif",
            primaryColor: "#e9effa",
            primaryTextColor: "#17263c",
            lineColor: "#3456a3",
          },
        });
        await mermaid.run({ nodes: Array.from(diagrams) });
      } catch {
        for (const node of diagrams)
          node.setAttribute(
            "aria-label",
            "Diagram source; visual rendering unavailable",
          );
      }
    });
    diagrams.forEach((node) => observer.observe(node));
    const buttons = Array.from(
      article.querySelectorAll<HTMLElement>(".doc-code"),
    ).map((block) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code");
      button.onclick = async () => {
        try {
          await navigator.clipboard.writeText(
            block.querySelector("code")?.textContent || "",
          );
          button.textContent = "Copied";
        } catch {
          button.textContent = "Select code to copy";
        }
      };
      block.querySelector(".code-label")?.append(button);
      return button;
    });
    return () => {
      cancelled = true;
      observer.disconnect();
      buttons.forEach((button) => button.remove());
    };
  }, []);
  return <span ref={marker} hidden />;
}
