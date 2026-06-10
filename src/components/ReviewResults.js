import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck, FaCode } from "react-icons/fa";
import ScoreCard from "./ScoreCard";
import IssueCard from "./IssueCard";

const ReviewResults = ({ result, language, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.correctedCode) {
      await navigator.clipboard.writeText(result.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "24px",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "3px solid #1e2433",
              borderTopColor: "#58a6ff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "8px",
              border: "3px solid #1e2433",
              borderTopColor: "#a78bfa",
              borderRadius: "50%",
              animation: "spin 1.2s linear infinite reverse",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0", marginBottom: "8px" }}>
            Analyzing your code...
          </div>
          <div style={{ fontSize: "13px", color: "#475569" }}>
            Running 15 years of expertise on your snippet
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Scanning for bugs", "Checking security", "Measuring performance"].map((label, i) => (
            <div
              key={i}
              style={{
                fontSize: "11px",
                color: "#58a6ff",
                background: "rgba(88,166,255,0.08)",
                border: "1px solid rgba(88,166,255,0.15)",
                padding: "5px 12px",
                borderRadius: "20px",
                animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "20px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "rgba(88,166,255,0.08)",
            border: "1px solid rgba(88,166,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaCode size={28} color="#58a6ff" style={{ opacity: 0.6 }} />
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "10px" }}>
            Ready to review your code
          </div>
          <div style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", maxWidth: "320px" }}>
            Paste your code in the editor, select the language, and click{" "}
            <span style={{ color: "#58a6ff", fontWeight: "600" }}>Review Code</span>.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "300px" }}>
          {[
            { icon: "🐛", label: "Bug detection" },
            { icon: "🔒", label: "Security analysis" },
            { icon: "⚡", label: "Performance review" },
            { icon: "✨", label: "Best practices check" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: "#0d1117",
                border: "1px solid #1e2433",
                borderRadius: "10px",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ overflowY: "auto", height: "100%", padding: "24px" }}>
      <ScoreCard score={result.score} />

      <IssueCard type="bugs" items={result.bugs} />
      <IssueCard type="security" items={result.security} />
      <IssueCard type="performance" items={result.performance} />
      <IssueCard type="bestPractices" items={result.bestPractices} />
      <IssueCard type="suggestions" items={result.suggestions} />

      {/* Corrected code */}
      <div
        style={{
          background: "rgba(56,189,248,0.04)",
          border: "1px solid rgba(56,189,248,0.15)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(56,189,248,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(56,189,248,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaCode size={14} color="#38bdf8" />
            </div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>
              Corrected Code
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#38bdf8",
                background: "rgba(56,189,248,0.1)",
                padding: "2px 9px",
                borderRadius: "20px",
                fontWeight: "600",
              }}
            >
              Fixed
            </span>
          </div>
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: copied ? "rgba(74,222,128,0.12)" : "rgba(56,189,248,0.1)",
              border: `1px solid ${copied ? "rgba(74,222,128,0.25)" : "rgba(56,189,248,0.2)"}`,
              borderRadius: "8px",
              color: copied ? "#4ade80" : "#38bdf8",
              padding: "7px 14px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              background: "#0a0e17",
              fontSize: "13px",
              fontFamily: "'JetBrains Mono', monospace",
              lineHeight: "1.75",
              padding: "20px",
            }}
            showLineNumbers
            lineNumberStyle={{ color: "#2d3748", minWidth: "36px" }}
          >
            {result.correctedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ReviewResults;
