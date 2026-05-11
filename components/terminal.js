"use client";

import { useState, useRef, useEffect } from "react";

export function Terminal() {
  const [history, setHistory] = useState([
    { type: "system", content: "SYSTEM_ALPHA [Version 3.0.42]" },
    { type: "system", content: "Initializing neural handshake..." },
    { type: "system", content: "Neural Core: Gemma 3 [Gemini API]" },
    { type: "output", content: "Welcome, Operator. I am SYSTEM_ALPHA." },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "input", content: `> ${input}` }];
    setHistory(newHistory);
    setInput("");
    setIsProcessing(true);

    // Command Logic
    let response = "";
    
    if (cmd === "help") {
      response = "Available Protocols:\n" +
        "  \x1b[32mhelp\x1b[0m      - Display this directory\n" +
        "  \x1b[32mwhoami\x1b[0m    - Operator profile\n" +
        "  \x1b[32mprojects\x1b[0m  - Active research nodes\n" +
        "  \x1b[32mstatus\x1b[0m    - System health check\n" +
        "  \x1b[32mclear\x1b[0m     - Wipe session history\n" +
        "  \x1b[33m[any msg]\x1b[0m - Neural link with SYSTEM_ALPHA";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "whoami") {
      response = "\x1b[36mOPERATOR:\x1b[0m Ankit Bhardwaj\n" +
                 "\x1b[36mROLE:\x1b[0m Software Engineer (NSUT '25)\n" +
                 "\x1b[36mSTACK:\x1b[0m Next.js, AI/ML, Automation\n" +
                 "\x1b[36mSTATUS:\x1b[0m \x1b[32mOnline & Ready\x1b[0m";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "projects") {
      response = "\x1b[33mACTIVE_NODES:\x1b[0m\n" +
                 "- [01] The Wild Oasis \x1b[90m(Full-Stack)\x1b[0m\n" +
                 "- [02] CardXpert AI \x1b[90m(Gemini Integration)\x1b[0m\n" +
                 "- [03] Auto-Reach \x1b[90m(n8n Automation)\x1b[0m";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "status") {
      response = "\x1b[36mSYSTEM_HEALTH:\x1b[0m \x1b[32m100%\x1b[0m\n" +
                 "\x1b[36mCORE_TEMP:\x1b[0m Optimal\n" +
                 "\x1b[36mUPTIME:\x1b[0m 99.9%\n" +
                 "\x1b[36mAI_CORE:\x1b[0m \x1b[33mGemma 3 via Gemini API\x1b[0m";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "clear") {
      setHistory([]);
      setIsProcessing(false);
    } else {
      // Send to AI Core (Gemma via Gemini API)
      try {
        const rawQuery = input.trim();
        const query = rawQuery.toLowerCase().startsWith("ai ")
          ? rawQuery.slice(3).trim()
          : rawQuery;
        const res = await fetch("/api/terminal/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: query,
            history: history.slice(-5) 
          }),
        });
        
        const data = await res.json();
        
        if (data.error) {
          response = `\x1b[31m[CORE_ERROR]:\x1b[0m ${data.error}`;
        } else {
          response = data.response;
        }
      } catch (err) {
        response = "\x1b[31m[CONNECTION_ERROR]:\x1b[0m Neural link failed.";
      }
      
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    }
  };

  const getTagAccent = (tag) => {
    const tagColors = {
      "[NEURAL_LINK_ACTIVE]": "var(--mint)",
      "[DATA_RETRIEVED]": "var(--blue)",
      "[CORE_STATUS]": "var(--gold)",
      "[QUERY_PARSED]": "var(--orange)",
      "[ACCESS_NODE]": "var(--mint)",
      "[PROTOCOL_SYNC]": "var(--blue)",
      "[TRANSMISSION_ACK]": "var(--gold)",
      "[SECURE_CHANNEL]": "var(--mint)",
      "[EXECUTION_READY]": "var(--orange)",
      "[CORE_ERROR]": "var(--coral)",
      "[CONNECTION_ERROR]": "var(--coral)",
      "[SYSTEM_ALPHA_ERROR]": "var(--coral)",
      "[PROCESSING_HANDSHAKE...]": "var(--gold)",
    };

    return tagColors[tag] || "var(--orange)";
  };

  const formatPlainText = (text, baseColor, keyPrefix) =>
    String(text)
      .split(/(\[[A-Z0-9_./ -]+\])/g)
      .filter((part) => part.length > 0)
      .map((part, index) => {
        const isTag = /^\[[A-Z0-9_./ -]+\]$/.test(part);

        if (isTag) {
          return (
            <span
              key={`${keyPrefix}-tag-${index}`}
              className="terminal-tag"
              style={{ "--terminal-tag-color": getTagAccent(part) }}
            >
              {part}
            </span>
          );
        }

        return (
          <span key={`${keyPrefix}-text-${index}`} style={{ color: baseColor }}>
            {part}
          </span>
        );
      });

  // Helper to parse ANSI-like colors and terminal tags.
  const formatContent = (text) => {
    if (typeof text !== 'string') return text;
    
    const parts = text.split(/(\x1b\[\d+m)/);
    let currentColor = "";
    
    return parts.flatMap((part, i) => {
      if (part.startsWith("\x1b[")) {
        const code = part.match(/\d+/)[0];
        if (code === "0") currentColor = "";
        else if (code === "32") currentColor = "var(--forest)"; // Green
        else if (code === "33") currentColor = "var(--gold)";   // Gold
        else if (code === "36") currentColor = "var(--blue)";   // Cyan/Blue
        else if (code === "31") currentColor = "var(--coral)";  // Red/Coral
        else if (code === "90") currentColor = "rgba(255,255,255,0.3)"; // Muted
        return null;
      }
      return formatPlainText(part, currentColor, `part-${i}`);
    }).filter(Boolean);
  };

  return (
    <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-dot" style={{ background: "#FF5F56" }} />
          <div className="terminal-dot" style={{ background: "#FFBD2E" }} />
          <div className="terminal-dot" style={{ background: "#27C93F" }} />
        </div>
        <div className="terminal-title">SYSTEM_ALPHA v3.0 - CONSOLE</div>
        <div style={{ width: "40px" }} />
      </div>

      <div className="terminal-content" ref={scrollRef}>
        <div className="terminal-scanline" />
        {history.map((line, i) => (
          <div key={i} className={`terminal-line terminal-line--${line.type}`}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {line.type === "output" || line.type === "system" ? formatContent(line.content) : line.content}
            </pre>
          </div>
        ))}
        {isProcessing && (
          <div className="terminal-line terminal-line--system">
            <span className="terminal-cursor" /> {formatContent("[PROCESSING_HANDSHAKE...]")}
          </div>
        )}
        <form onSubmit={handleCommand} className="terminal-input-wrapper">
          <span className="terminal-prompt">SYS_ALPHA@ANKIT_HUB:~$</span>
          <div style={{ position: "relative", display: "flex", flex: 1, alignItems: "center" }}>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              style={{ width: "100%" }}
            />
            <span 
              className="terminal-cursor" 
              style={{ 
                position: "absolute", 
                left: `${input.length}ch`,
                display: isProcessing ? "none" : "inline-block",
                marginLeft: "2px"
              }} 
            />
          </div>
        </form>
      </div>
    </div>
  );
}
