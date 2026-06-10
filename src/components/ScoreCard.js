import React from "react";

const ScoreCard = ({ score }) => {
  const getScoreColor = (s) => {
    if (s >= 8) return { text: "#4ade80", bg: "rgba(74,222,128,0.08)", ring: "#4ade80" };
    if (s >= 6) return { text: "#facc15", bg: "rgba(250,204,21,0.08)", ring: "#facc15" };
    if (s >= 4) return { text: "#fb923c", bg: "rgba(251,146,60,0.08)", ring: "#fb923c" };
    return { text: "#f87171", bg: "rgba(248,113,113,0.08)", ring: "#f87171" };
  };

  const getScoreLabel = (s) => {
    if (s >= 9) return "Excellent";
    if (s >= 8) return "Very Good";
    if (s >= 7) return "Good";
    if (s >= 6) return "Fair";
    if (s >= 4) return "Needs Work";
    return "Poor";
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div
      style={{
        background: colors.bg,
        border: `1px solid ${colors.ring}30`,
        borderRadius: "16px",
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        marginBottom: "20px",
      }}
    >
      {/* Circular progress */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e2433" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={colors.ring}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "26px", fontWeight: "700", color: colors.text, fontFamily: "'JetBrains Mono', monospace" }}>
            {score}
          </span>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>/10</span>
        </div>
      </div>

      {/* Score details */}
      <div>
        <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500", marginBottom: "4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Code Quality Score
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: colors.text, marginBottom: "6px" }}>
          {getScoreLabel(score)}
        </div>
        <div style={{ fontSize: "13px", color: "#94a3b8" }}>
          {score >= 8
            ? "This code is well-written and follows best practices."
            : score >= 6
            ? "This code is functional but has room for improvement."
            : score >= 4
            ? "This code needs significant improvements before production use."
            : "This code has critical issues that must be fixed immediately."}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
