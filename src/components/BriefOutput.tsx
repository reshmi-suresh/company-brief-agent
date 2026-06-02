"use client";

interface Props {
  brief: string;
  company: string;
  onReset: () => void;
}

export default function BriefOutput({ brief, company, onReset }: Props) {
  const handleDownload = () => {
    const blob = new Blob([brief], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${company.toLowerCase().replace(/\s+/g, "-")}-brief.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="rounded-2xl p-8 space-y-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-[var(--text-muted)] uppercase mb-1">
            Agent 2 — Complete
          </p>
          <h2
            className="text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {company} Strategic Brief
          </h2>
        </div>
        <div
          className="text-xs px-2 py-1 rounded"
          style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
        >
          Ready
        </div>
      </div>

      <div
        className="rounded-lg p-4 text-sm leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          fontFamily: "var(--font-body)",
        }}
      >
        {brief}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 py-3 rounded-lg text-sm tracking-widest uppercase transition-all"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          Download Brief ↓
        </button>
        <button
          onClick={onReset}
          className="px-5 py-3 rounded-lg text-sm tracking-widest uppercase transition-all"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          New Brief
        </button>
      </div>
    </div>
  );
}
