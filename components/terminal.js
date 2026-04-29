"use client";

import { useState, useRef, useEffect } from "react";

export function Terminal() {
  const [history, setHistory] = useState([
    { type: "system", content: "SYSTEM_ALPHA [Version 3.0.42]" },
    { type: "system", content: "Initializing neural handshake..." },
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
      response = "Available Commands:\n" +
        "  help      - Show this list\n" +
        "  whoami    - Operator profile\n" +
        "  projects  - Active nodes\n" +
        "  status    - System health check\n" +
        "  clear     - Clear terminal\n" +
        "  [msg]     - AI link";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "whoami") {
      response = "OPERATOR: Ankit Bhardwaj\nROLE: Software Engineer\nSTACK: Next.js, AI/ML, Automation";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "projects") {
      response = "ACTIVE RESEARCH NODES:\n- The Wild Oasis\n- CardXpert AI\n- Auto-Reach";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "status") {
      response = "SYSTEM_HEALTH: 100%\nCORE_TEMP: Optimal\nUPTIME: 99.9%";
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    } else if (cmd === "clear") {
      setHistory([]);
      setIsProcessing(false);
    } else {
      // Send to AI Core
      try {
        const res = await fetch("/api/terminal/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: cmd,
            history: history.slice(-5) 
          }),
        });
        
        const data = await res.json();
        
        if (data.error) {
          response = `[CORE_ERROR]: ${data.error}`;
        } else {
          response = data.response;
        }
      } catch (err) {
        response = "[CONNECTION_ERROR]: Neural link failed.";
      }
      
      setHistory(prev => [...prev, { type: "output", content: response }]);
      setIsProcessing(false);
    }
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
        {history.map((line, i) => (
          <div key={i} className={`terminal-line terminal-line--${line.type}`}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{line.content}</pre>
          </div>
        ))}
        {isProcessing && (
          <div className="terminal-line terminal-line--system">
            <span className="terminal-cursor" /> [PROCESSING...]
          </div>
        )}
        <form onSubmit={handleCommand} className="terminal-input-wrapper">
          <span className="terminal-prompt">SYS_ALPHA@ANKIT_HUB:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
