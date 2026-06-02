"use client";

import { useState } from "react";

interface Props {
  prompt: string;
  onApprove: (prompt: string) => void;
  onBack: () => void;
}

export default function PromptReview({ prompt, onApprove, onBack }: Props) {
  const [editedPrompt, setEditedPrompt] = useState(prompt || "");
  const [loading, setLoading] = useState(false);

  // Keep in sync if prompt loads async
  if (prompt && editedPrompt === "" ) {
    setEditedPrompt(prompt);
  }

  const handleApprove = async () => {
    setLoading(true);
    await onApprove(editedPrompt);
  };

  return (
    <div
      className="rounded-2xl p-8 space-y-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div>
        <p className="text-xs tracking-widest text-[var(--text-muted)] uppercase mb-1">
          Agent 1 — Prompt Review
        </p>
        <h2
          className="text-xl font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Review your research brief
        </h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Edit freely before sending to Agent 2
        </p>
      </div>

      {!prompt ? (
        <div className="flex items-center gap-3 py-8 justify-center">
          <div
            className="w-4 h-4 border border-[var(--accent)] border-t-transparent rounded-full animate-spin"
          />
          <span className="text-sm text-[var(--text-muted)]">Agent 1 is building your prompt…</span>
        </div>
      ) : (
        <textarea
          value={editedPrompt}
          onChange={(e) => setEditedPrompt(e.target.value)}
          rows={14}
          className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-all resize-none leading-relaxed"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-lg text-sm tracking-widest uppercase transition-all"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleApprove}
          disabled={!prompt || loading}
          className="flex-1 py-3 rounded-lg text-sm font-medium tracking-widest uppercase transition-all disabled:opacity-30"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          {loading ? "Starting Research…" : "Approve & Generate Brief →"}
        </button>
      </div>
    </div>
  );
}
