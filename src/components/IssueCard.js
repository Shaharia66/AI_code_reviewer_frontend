import React, { useState } from "react";
import {
  FaBug,
  FaShieldAlt,
  FaBolt,
  FaClipboardCheck,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CARD_CONFIGS = {
  bugs: {
    label: "Bugs Detected",
    icon: FaBug,
    accent: "#f87171",
    bg: "rgba(248,113,113,0.06)",
    border: "rgba(248,113,113,0.2)",
    emptyMsg: "No bugs detected.",
  },
  security: {
    label: "Security Issues",
    icon: FaShieldAlt,
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.06)",
    border: "rgba(251,146,60,0.2)",
    emptyMsg: "No security issues found.",
  },
  performance: {
    label: "Performance Issues",
    icon: FaBolt,
    accent: "#facc15",
    bg: "rgba(250,204,21,0.06)",
    border: "rgba(250,204,21,0.2)",
    emptyMsg: "No performance issues found.",
  },
  bestPractices: {
    label: "Best Practice Violations",
    icon: FaClipboardCheck,
    accent: "#c084fc",
    bg: "rgba(192,132,252,0.06)",
    border: "rgba(192,132,252,0.2)",
    emptyMsg: "All best practices followed.",
  },
  suggestions: {
    label: "Improvement Suggestions",
    icon: FaLightbulb,
    accent: "#38bdf8",
    bg: "rgba(56,189,248,0.06)",
    border: "rgba(56,189,248,0.2)",
    emptyMsg: "No additional suggestions.",
  },
};

const IssueCard = ({ type, items }) => {
  const [expanded, setExpanded] = useState(true);
  const config = CARD_CONFIGS[type];
  const Icon = config.icon;
  const count = items.length;

  return (
    <div
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: "14px",
        marginBottom: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: `${config.accent}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={15} color={config.accent} />
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#e2e8f0",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {config.label}
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: count === 0 ? "#4ade80" : config.accent,
              background: count === 0 ? "rgba(74,222,128,0.12)" : `${config.accent}18`,
              padding: "2px 9px",
              borderRadius: "20px",
            }}
          >
            {count === 0 ? "Clear" : count}
          </span>
        </div>
        <div style={{ color: "#475569", flexShrink: 0 }}>
          {expanded ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div style={{ padding: "0 20px 18px 20px" }}>
          {count === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.15)",
                borderRadius: "10px",
                color: "#4ade80",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              ✓ {config.emptyMsg}
            </div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "12px 14px",
                    background: "rgba(15,20,30,0.4)",
                    borderRadius: "10px",
                    borderLeft: `3px solid ${config.accent}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: config.accent,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;
