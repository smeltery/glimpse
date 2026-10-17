"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Copy unavailable. Select the text to copy it.");
    }
  }
  return (
    <span className="copy-control">
      <button onClick={copy} type="button">
        <Copy size={14} />
        {label}
      </button>
      <span role="status">{status}</span>
    </span>
  );
}
