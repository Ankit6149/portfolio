"use client";

import React, { useEffect, useState } from 'react';

export function LiveStats() {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // GitHub Fetch with timeout
        const ghPromise = fetch("https://api.github.com/users/Ankit6149");
        const ghResponse = await Promise.race([
          ghPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error("GitHub Timeout")), 5000))
        ]);

        if (ghResponse.ok && isMounted) {
          const data = await ghResponse.json();
          setGithubData(data);
        }

        // LeetCode Fetch with timeout (Proxied through our server to bypass CORS)
        const lcPromise = fetch("/api/leetcode");
        const lcResponse = await Promise.race([
          lcPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error("LeetCode Timeout")), 5000))
        ]);

        if (lcResponse.ok && isMounted) {
          const data = await lcResponse.json();
          setLeetcodeData(data);
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Live stats fetch partial failure:", err.message);
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Safe access helpers
  const repos = githubData?.public_repos ?? "32+";
  const followers = githubData?.followers ?? "10+";
  const solved = leetcodeData?.totalSolved ?? "450+";
  const rank = leetcodeData?.ranking ? `#${leetcodeData.ranking}` : "Top 5%";

  return (
    <div className="dual-panel" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div className="panel">
        <div className="bento-label">
          {loading ? "FETCHING_DATA..." : "Live Metrics / GitHub"}
        </div>
        <h3 className="panel-title">Open Source Velocity</h3>
        <p className="bento-body" style={{ marginBottom: "1.5rem" }}>
          Real-time repository and social metrics.
        </p>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value" style={{ color: "var(--coral)" }}>
              {repos}
            </div>
            <div className="stat-label">Repositories</div>
            <div className="stat-bar"><div className="stat-fill" style={{ width: "80%", background: "var(--coral)" }}></div></div>
          </div>
          <div className="stat-item">
            <div className="stat-value" style={{ color: "var(--mint)" }}>
              {followers}
            </div>
            <div className="stat-label">Followers</div>
            <div className="stat-bar"><div className="stat-fill" style={{ width: "45%", background: "var(--mint)" }}></div></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="bento-label">
          {loading ? "FETCHING_DATA..." : "Live Metrics / LeetCode"}
        </div>
        <h3 className="panel-title">Algorithm Proficiency</h3>
        <p className="bento-body" style={{ marginBottom: "1.5rem" }}>
          Difficulty breakdown and global rank.
        </p>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value" style={{ color: "var(--gold)" }}>
              {solved}
            </div>
            <div className="stat-label">Problems Solved</div>
            <div className="stat-progress">
              <span style={{ color: "#00b8a3" }}>E: {leetcodeData?.easySolved || "200+"}</span>
              <span style={{ color: "#ffc01e" }}>M: {leetcodeData?.mediumSolved || "200+"}</span>
              <span style={{ color: "#ef4743" }}>H: {leetcodeData?.hardSolved || "50+"}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value" style={{ color: "var(--blue)", fontSize: "1.2rem", marginTop: "0.5rem" }}>
              {rank}
            </div>
            <div className="stat-label">Global Ranking</div>
            <div className="stat-bar"><div className="stat-fill" style={{ width: "85%", background: "var(--blue)" }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
