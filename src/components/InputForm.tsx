"use client";

import { useState } from "react";
import type { FormData } from "@/app/page";

interface Props {
  onSubmit: (data: FormData) => void;
}

export default function InputForm({ onSubmit }: Props) {
  const [data, setData] = useState<FormData>({
    company: "",
    contact: "",
    role: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!data.company || !data.role) return;
    setLoading(true);
    await onSubmit(data);
  };

  return (
    <div
      className="rounded-2xl p-8 space-y-6"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div>
        <label className="block text-xs tracking-widest text-[var(--text-muted)] uppercase mb-2">
          Company <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
          placeholder="e.g. Ramp, Vercel, Linear"
          className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-all"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest text-[var(--text-muted)] uppercase mb-2">
          Target Contact <span className="opacity-40 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={data.contact}
          onChange={(e) => setData({ ...data, contact: e.target.value })}
          placeholder="e.g. Jane Smith, Head of Partnerships"
          className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-all"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest text-[var(--text-muted)] uppercase mb-2">
          Target Role <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          type="text"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          placeholder="e.g. Senior Product Manager, Sales Engineer"
          className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-all"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest text-[var(--text-muted)] uppercase mb-2">
          Anything else? <span className="opacity-40 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          value={data.additionalInfo}
          onChange={(e) => setData({ ...data, additionalInfo: e.target.value })}
          placeholder="e.g. Focus on their AI strategy, or context for an upcoming meeting"
          rows={3}
          className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-all resize-y min-h-[5rem]"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!data.company || !data.role || loading}
        className="w-full py-3 rounded-lg text-sm font-medium tracking-widest uppercase transition-all duration-200 disabled:opacity-30"
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          fontFamily: "var(--font-body)",
        }}
      >
        {loading ? "Generating Prompt…" : "Generate Research Prompt →"}
      </button>
    </div>
  );
}
