import React from "react";
import { FaCode, FaTrash } from "react-icons/fa";

const LANGUAGES = [
  { value: "python", label: "Python", icon: "🐍" },
  { value: "javascript", label: "JavaScript", icon: "⚡" },
  { value: "java", label: "Java", icon: "☕" },
];

const PLACEHOLDERS = {
  python: `# Paste your Python code here
def calculate_average(numbers):
    total = 0
    for n in numbers:
        total = total + n
    return total / len(numbers)`,
  javascript: `// Paste your JavaScript code here
function fetchUserData(userId) {
  var data = db.query("SELECT * FROM users WHERE id = " + userId);
  return data;
}`,
  java: `// Paste your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

const CodeInput = ({ code, language, onCodeChange, onLanguageChange, onReview, loading }) => {
  const lineCount = code ? code.split("\n").length : 1;
  const charCount = code.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid #1e2433",
          background: "#0d1117",
          borderRadius: "16px 16px 0 0",
          flexShrink: 0,
        }}
      >
        {/* Window dots */}
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
          <span
            style={{
              marginLeft: "10px",
              fontSize: "13px",
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: "500",
            }}
          >
            code_input.{language === "python" ? "py" : language === "javascript" ? "js" : "java"}
          </span>
        </div>

        {/* Language selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            style={{
              background: "#161b27",
              border: "1px solid #2d3748",
              borderRadius: "8px",
              color: "#e2e8f0",
              padding: "7px 12px",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              outline: "none",
              fontWeight: "500",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.icon} {l.label}
              </option>
            ))}
          </select>

          {code && (
            <button
              onClick={() => onCodeChange("")}
              title="Clear code"
              style={{
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "8px",
                color: "#f87171",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaTrash size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Editor area */}
      <div style={{ position: "relative", flex: 1, display: "flex", minHeight: 0 }}>
        {/* Line numbers */}
        <div
          style={{
            background: "#0d1117",
            borderRight: "1px solid #1a2030",
            padding: "20px 0",
            minWidth: "48px",
            textAlign: "right",
            userSelect: "none",
            overflowY: "hidden",
            flexShrink: 0,
          }}
        >
          {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
            <div
              key={i + 1}
              style={{
                padding: "0 12px",
                fontSize: "13px",
                lineHeight: "1.75",
                color: "#2d3748",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={PLACEHOLDERS[language]}
          spellCheck={false}
          style={{
            flex: 1,
            background: "#0d1117",
            border: "none",
            outline: "none",
            color: "#e2e8f0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            lineHeight: "1.75",
            padding: "20px 20px",
            resize: "none",
            caretColor: "#58a6ff",
            tabSize: 4,
          }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderTop: "1px solid #1e2433",
          background: "#0a0e17",
          borderRadius: "0 0 16px 16px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <span style={{ fontSize: "12px", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
            Ln {lineCount}
          </span>
          <span style={{ fontSize: "12px", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
            {charCount} chars
          </span>
          <span style={{ fontSize: "12px", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
            {LANGUAGES.find((l) => l.value === language)?.label}
          </span>
        </div>

        <button
          onClick={onReview}
          disabled={loading || !code.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            background: loading || !code.trim()
              ? "#1e2433"
              : "linear-gradient(135deg, #58a6ff 0%, #a78bfa 100%)",
            color: loading || !code.trim() ? "#475569" : "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading || !code.trim() ? "not-allowed" : "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.2s ease",
            letterSpacing: "0.02em",
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Analyzing...
            </>
          ) : (
            <>
              <FaCode size={13} />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
