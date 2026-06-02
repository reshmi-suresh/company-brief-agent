"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";
import PromptReview from "@/components/PromptReview";
import BriefOutput from "@/components/BriefOutput";

type Stage = "input" | "review" | "generating" | "done";

export interface FormData {
  company: string;
  contact: string;
  role: string;
  additionalInfo: string;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("input");
  const [formData, setFormData] = useState<FormData>({
    company: "",
    contact: "",
    role: "",
    additionalInfo: "",
  });
  const [prompt, setPrompt] = useState("");
  const [brief, setBrief] = useState("");

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setStage("review");

    const res = await fetch("/api/generate-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setPrompt(json.prompt);
  };

  const handlePromptApprove = async (finalPrompt: string) => {
    setStage("generating");
    const res = await fetch("/api/generate-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalPrompt, ...formData }),
    });
    const json = await res.json();
    setBrief(json.brief);
    setStage("done");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-3">
          Two-Agent Research System
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Company Brief
          <br />
          <span style={{ color: "var(--accent)" }}>Agent</span>
        </h1>
        <p className="mt-4 text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
          Turn a company name, contact, and role into a 20-page strategic briefing — powered by Claude.
        </p>
      </div>

      {/* Stages */}
      <div className="w-full max-w-2xl">
        {stage === "input" && <InputForm onSubmit={handleFormSubmit} />}
        {stage === "review" && (
          <PromptReview
            prompt={prompt}
            onApprove={handlePromptApprove}
            onBack={() => setStage("input")}
          />
        )}
        {stage === "generating" && (
          <div className="text-center py-16">
            <div className="inline-block w-6 h-6 border border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-[var(--text-muted)]">
              Agent 2 is researching {formData.company}…
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1 opacity-60">
              This takes 30–60 seconds
            </p>
          </div>
        )}
        {stage === "done" && (
          <BriefOutput
            brief={brief}
            company={formData.company}
            onReset={() => {
              setStage("input");
              setFormData({ company: "", contact: "", role: "", additionalInfo: "" });
              setPrompt("");
              setBrief("");
            }}
          />
        )}
      </div>

      {/* Step indicator */}
      <div className="mt-16 flex items-center gap-3">
        {(["input", "review", "generating", "done"] as Stage[]).map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3"
          >
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: stage === s ? "var(--accent)" : "var(--border)",
              }}
            />
            {i < 3 && (
              <div className="w-6 h-px" style={{ background: "var(--border)" }} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
