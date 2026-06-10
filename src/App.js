import React, { useState } from "react";
import axios from "axios";
import CodeInput from "./components/CodeInput";
import ReviewResults from "./components/ReviewResults";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/review`, { code, language });
      setResult(response.data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080c14",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        textarea::placeholder { color: #2d3748; }
        textarea::-webkit-scrollbar { width: 6px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: #1e2433; border-radius: 3px; }
        div::-webkit-scrollbar { width: 6px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #1e2433; border-radius: 3px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #111827",
          padding: "0 32px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0e17",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #58a6ff, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🔍
          </div>
          <div>
            <span
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#e2e8f0",
                letterSpacing: "-0.02em",
              }}
            >
              Code
              <span
                style={{
                  background: "linear-gradient(135deg, #58a6ff, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Lens
              </span>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {["Python", "JavaScript", "Java"].map((lang) => (
              <span
                key={lang}
                style={{
                  fontSize: "11px",
                  color: "#475569",
                  background: "#111827",
                  border: "1px solid #1e2433",
                  padding: "3px 9px",
                  borderRadius: "5px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: "500",
                }}
              >
                {lang}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#4ade80",
              fontWeight: "500",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4ade80",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            Powered by Groq
          </div>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div
          style={{
            margin: "16px 32px 0",
            padding: "14px 20px",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: "10px",
            color: "#f87171",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <span style={{ fontSize: "16px" }}>⚠️</span>
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#f87171",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: "0 4px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Main layout */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          padding: "20px 24px",
          minHeight: 0,
          height: "calc(100vh - 60px)",
        }}
      >
        {/* Left: Code input */}
        <div
          style={{
            background: "#0d1117",
            border: "1px solid #1e2433",
            borderRadius: "16px",
            marginRight: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <CodeInput
            code={code}
            language={language}
            onCodeChange={setCode}
            onLanguageChange={(lang) => {
              setLanguage(lang);
              setResult(null);
              setError(null);
            }}
            onReview={handleReview}
            loading={loading}
          />
        </div>

        {/* Right: Results */}
        <div
          style={{
            background: "#0a0e17",
            border: "1px solid #1e2433",
            borderRadius: "16px",
            marginLeft: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Results header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid #1e2433",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", gap: "7px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1e2433" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1e2433" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1e2433" }} />
            </div>
            <span
              style={{
                marginLeft: "8px",
                fontSize: "13px",
                color: "#475569",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: "500",
              }}
            >
              review_results.json
            </span>
            {result && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.15)",
                  padding: "2px 9px",
                  borderRadius: "20px",
                  fontWeight: "600",
                }}
              >
                ✓ Review complete
              </span>
            )}
          </div>

          {/* Results body */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <ReviewResults result={result} language={language} loading={loading} />
          </div>
        </div>
      </main>

      {/* Responsive mobile styles via media query workaround */}
      <style>{`
        @media (max-width: 768px) {
          main {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            height: auto !important;
          }
          main > div:first-child {
            margin-right: 0 !important;
            margin-bottom: 16px;
            height: 50vh;
          }
          main > div:last-child {
            margin-left: 0 !important;
            min-height: 60vh;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
