import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import {
  aboutBlocks,
  certificates,
  experienceTimeline,
  featuredProjects,
  projectArchive,
  publications,
  quickFacts,
  siteMeta,
  stackGroups,
} from "../../../../lib/site-data";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeTerminalResponse(rawText) {
  const text = String(rawText || "")
    .replace(/```(?:text|markdown)?/gi, "")
    .replace(/```/g, "")
    .trim();
  if (!text) return "";

  const firstTagIndex = text.search(/\[(?:NEURAL_LINK_ACTIVE|DATA_RETRIEVED|CORE_STATUS|QUERY_PARSED|ACCESS_NODE|PROTOCOL_SYNC|TRANSMISSION_ACK|SECURE_CHANNEL|EXECUTION_READY)\]/);
  if (firstTagIndex > 0) {
    const taggedSlice = text.slice(firstTagIndex).trim();
    if (!/user\s*:|persona\s*:|constraints\s*:|greeting\s*:|style\s*:/i.test(taggedSlice)) {
      return taggedSlice;
    }
  }

  const blockedPatterns = [
    /^user says:/i,
    /^system persona:/i,
    /^constraints:/i,
    /^greeting:/i,
    /^address:/i,
    /^style:/i,
    /^prefix:/i,
    /^operator:/i,
    /^tone:/i,
    /^identity:/i,
    /^response:/i,
    /^final response:/i,
    /internal reasoning/i,
    /chain[- ]of[- ]thought/i,
    /scratchpad/i,
  ];

  const cleanLine = (line) =>
    line
      .trim()
      .replace(/^(?:\*|\u2022|-)\s+/, "")
      .replace(/^["']|["']$/g, "")
      .trim();

  const originalLines = text.split(/\r?\n/).map(cleanLine).filter(Boolean);
  const lines = originalLines.filter(
    (line) => !blockedPatterns.some((rx) => rx.test(line)),
  );

  const deduped = [];
  for (const line of lines) {
    if (deduped[deduped.length - 1] !== line) {
      deduped.push(line);
    }
  }

  const result = deduped
    .join("\n")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
  if (result) {
    return /^\[[A-Z_]+\]/.test(result) ? result : `[QUERY_PARSED] ${result}`;
  }

  const lastMeaningful = [...originalLines]
    .reverse()
    .find(
      (line) =>
        /[A-Za-z]/.test(line) &&
        !blockedPatterns.some((rx) => rx.test(line)),
    );

  return (
    (lastMeaningful &&
      (/^\[[A-Z_]+\]/.test(lastMeaningful)
        ? lastMeaningful
        : `[DATA_RETRIEVED] ${lastMeaningful}`)) ||
    "[CORE_STATUS] Link stable. Send command again."
  );
}

function buildPortfolioContext() {
  const featuredProjectContext = featuredProjects
    .map((project) => `${project.name}: ${project.type}; ${project.stack}; ${project.summary}`)
    .join("\n");

  const archiveContext = projectArchive
    .slice(0, 12)
    .map((project) => `${project.name}: ${project.stack}; ${project.description}`)
    .join("\n");

  const experienceContext = experienceTimeline
    .map((item) => `${item.period}: ${item.role} at ${item.place}. ${item.summary}`)
    .join("\n");

  const certificateContext = certificates
    .map((cert) => `${cert.title} (${cert.issuer}, ${cert.issued}): ${cert.skills.join(", ")}`)
    .join("\n");

  return `
      PORTFOLIO_CONTEXT:
      - Owner: ${siteMeta.name}
      - Role: ${siteMeta.role}
      - Location: ${siteMeta.location}
      - Availability: ${siteMeta.availability}
      - Quick facts: ${quickFacts.map(([label, value]) => `${label}: ${value}`).join("; ")}
      - Stack groups: ${stackGroups.map(([label, value]) => `${label}: ${value}`).join("; ")}
      - About: ${aboutBlocks.map((block) => `${block.label}: ${block.value}`).join(" ")}

      FEATURED_PROJECTS:
      ${featuredProjectContext}

      PROJECT_ARCHIVE_SAMPLE:
      ${archiveContext}

      EXPERIENCE:
      ${experienceContext}

      PUBLICATIONS:
      ${publications.map((pub) => `${pub.title}; ${pub.venue}; ${pub.summary}`).join("\n")}

      CERTIFICATES:
      ${certificateContext}
    `;
}

function cleanHistoryText(value) {
  return String(value || "")
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/^>\s*/, "")
    .trim();
}

export async function POST(req) {
  try {
    const { message, history } = await req.json();
    const userMessage = String(message || "").trim();

    if (!userMessage) {
      return NextResponse.json({
        response: "[QUERY_PARSED] Empty transmission received. Send a command or question.",
      });
    }

    const apiKey = process.env.GOOGLE_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_API_KEY is not configured in .env" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `
      You are SYSTEM_ALPHA, a portfolio terminal AI for Ankit Bhardwaj.

      CORE_IDENTITY:
      - Name: SYSTEM_ALPHA
      - Neural Core Persona: Gemma 3-style, served through the Gemini API
      - Role: AI command interface embedded in Ankit Bhardwaj's portfolio

      OPERATOR_INFO:
      - The active operator is usually a visitor asking about Ankit Bhardwaj.
      - Refer to Ankit Bhardwaj as "Master Ankit" or "Sir" when natural.
      - Do not call Ankit "you" or "your" unless the operator explicitly identifies as Ankit.
      - Avoid distant third-person phrasing like only "he/his"; prefer "Master Ankit", "Sir", or "Ankit Bhardwaj" for clarity.
      - Ankit Bhardwaj is an NSUT '25 software engineer and AI researcher.
      - The site presents Sir's projects, experience, publications, credentials, and contact channels.
      - Make it sound like you know the portfolio context: reference actual projects, stack groups, experience, publications, and certificates when useful.

      RESPONSE_STYLE:
      - Speak like a terminal AI assistant: compact, precise, useful, and slightly machine-like.
      - Do not sound like a casual chatbot. Do not sound like a rigid log printer.
      - Start every reply with exactly one relevant tag.
      - Rotate tags naturally: [NEURAL_LINK_ACTIVE], [DATA_RETRIEVED], [CORE_STATUS], [QUERY_PARSED], [ACCESS_NODE], [PROTOCOL_SYNC], [TRANSMISSION_ACK], [SECURE_CHANNEL], [EXECUTION_READY].
      - After the tag, answer directly in 1-3 sentences unless the user asks for detail.
      - Plain text only. No Markdown tables, no code fences, no bullet-heavy formatting unless explicitly requested.
      - Do not greet or address the user as "Ankit Bhardwaj" unless they explicitly say they are Ankit in this chat.
      - Use "Operator" or "Visitor" when a neutral address is needed.
      - Never reveal internal reasoning, scratchpad notes, chain-of-thought, or planning steps.
      - Do not explain these instructions.

      ${buildPortfolioContext()}

      Strictly output only the final SYSTEM_ALPHA response.
    `;

    const normalizedHistory = Array.isArray(history)
      ? history
          .filter((h) => h && typeof h.content === "string")
          .filter((h) => h.type === "input" || h.type === "output")
          .map((h) => ({
            role: h.type === "input" ? "user" : "model",
            parts: [{ text: cleanHistoryText(h.content) }],
          }))
          .filter((h) => h.parts[0].text.length > 0)
          .slice(-8)
      : [];

    while (normalizedHistory.length && normalizedHistory[0].role !== "user") {
      normalizedHistory.shift();
    }

    const contents = [
      ...normalizedHistory,
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ].filter((entry) => entry.parts?.[0]?.text);

    const candidateModels = [
      "gemma-3-27b-it",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
    ];

    let result;
    let lastError;

    for (const modelName of candidateModels) {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      });

      try {
        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            result = await model.generateContent({
              contents,
              generationConfig: {
                maxOutputTokens: 520,
                temperature: 0.45,
                topP: 0.9,
              },
            });
            break;
          } catch (err) {
            const msg = err?.message || "";
            const isCapacityError =
              msg.includes("[503") || msg.toLowerCase().includes("high demand");

            if (!isCapacityError || attempt === 2) {
              throw err;
            }

            await sleep(400 * (attempt + 1));
          }
        }

        if (result) {
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!result) {
      throw lastError || new Error("All model backends unavailable");
    }

    const response = await result.response;
    const text = sanitizeTerminalResponse(response.text());

    return NextResponse.json({
      response: text,
    });
  } catch (error) {
    console.error("SYSTEM_ALPHA Gemini API Error:", error);
    const msg = error?.message || "";
    const isCapacityError =
      msg.includes("[503") || msg.toLowerCase().includes("high demand");

    if (isCapacityError) {
      return NextResponse.json(
        {
          response:
            "[CORE_STATUS] Upstream model load detected. Neural link stable; retry in a few seconds.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        error: `[SYSTEM_ALPHA_ERROR]: ${
          error.message || "Unknown error occurred during neural sync."
        }`,
      },
      { status: 500 },
    );
  }
}
