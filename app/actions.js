"use server";

import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

const requiredMailEnv = ["GMAIL_USER", "GMAIL_PASS"];
const allowedEnvironments = new Set([
  "Professional Inquiry",
  "Collaboration",
  "Feedback",
]);
const requestWindowMs = 60_000;
const maxRequestsPerWindow = 3;
const recentRequests = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function getRequiredMailConfig() {
  const missing = requiredMailEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing mail configuration: ${missing.join(", ")}`);
  }

  return {
    fromAddress: process.env.GMAIL_USER,
    notifyRecipient: process.env.NOTIFY_RECIPIENT || process.env.GMAIL_USER,
  };
}

function getField(formData, key, fallback = "") {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim() || fallback;
}

function truncate(value, maxLength) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function makeToken(length = 8) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

function checkRateLimit(email) {
  const key = email.toLowerCase();
  const now = Date.now();
  const record = recentRequests.get(key);

  if (!record || now - record.startedAt > requestWindowMs) {
    recentRequests.set(key, { count: 1, startedAt: now });
    return true;
  }

  if (record.count >= maxRequestsPerWindow) {
    return false;
  }

  record.count += 1;
  return true;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatError(error) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return String(error);
}

export async function submitIntegrationRequest(formData) {
  const honeypot = getField(formData, "website");
  const operator = truncate(getField(formData, "operator", "UNKNOWN_OPERATOR"), 80);
  const visitorEmail = truncate(getField(formData, "email").toLowerCase(), 120);
  const requestedEnvironment = getField(formData, "environment", "Feedback");
  const environment = allowedEnvironments.has(requestedEnvironment)
    ? requestedEnvironment
    : "Feedback";
  const message = truncate(
    getField(formData, "message", "NO_MESSAGE_CONTENT_PROVIDED"),
    2000,
  );

  if (honeypot) {
    return {
      success: true,
      message: "DUAL HANDSHAKE COMPLETE. TRANSMISSION LOGGED.",
    };
  }

  if (!isValidEmail(visitorEmail)) {
    return {
      success: false,
      message: "INVALID TERMINAL EMAIL. CHECK ADDRESS FORMAT.",
    };
  }

  if (!checkRateLimit(visitorEmail)) {
    return {
      success: false,
      message: "RATE LIMIT ACTIVE. RETRY AFTER 60 SECONDS.",
    };
  }

  // Logic for YOUR notification (Ankit)
  let subject = `System Update: ${operator}`;
  let headline = "SYSTEM INTEGRATION REQUEST";
  let context = "A new collaboration handshake has been initiated.";

  // Logic for VISITOR'S auto-reply
  let visitorSubject = "";
  let visitorHeadline = "";
  let visitorContext = "";
  let visitorTag = "";

  if (environment === "Professional Inquiry") {
    subject = `[SYSTEM_ALPHA] Professional Inquiry Ingested`;
    headline = "PRODUCTION NODE: PROFESSIONAL INQUIRY";
    context = "High-level professional discussion initiated.";
    
    visitorSubject = `[SYSTEM_ALPHA] Handshake Ingested`;
    visitorHeadline = "PROFESSIONAL HANDSHAKE";
    visitorContext = `The system has successfully ingested your inquiry, ${operator}. Data packets have been flagged for priority review. We have notified Ankit Bhardwaj of this transmission, and he will reach out shortly to discuss potential technical alignment.`;
    visitorTag = "PRIORITY_LEVEL: ALPHA";
  } else if (environment === "Collaboration") {
    subject = `[SYSTEM_ALPHA] Project Proposal Received`;
    headline = "STAGING ENVIRONMENT: COLLABORATION";
    context = "New project or technical partnership proposal.";
    
    visitorSubject = `[SYSTEM_ALPHA] Collaboration Relayed`;
    visitorHeadline = "COLLABORATION INITIALIZED";
    visitorContext = `Handshake acknowledged, ${operator}. Your project proposal has been logged in the staging environment. SYSTEM_ALPHA has relayed the technical scope to Ankit Bhardwaj for deep-dive analysis and stack evaluation.`;
    visitorTag = "TRANS_TYPE: PROJECT_PROPOSAL";
  } else {
    subject = `[SYSTEM_ALPHA] Feedback Logged`;
    headline = "LOCAL SANDBOX: SYSTEM FEEDBACK";
    context = "Diagnostic feedback or general query.";
    
    visitorSubject = `[SYSTEM_ALPHA] Feedback Acknowledged`;
    visitorHeadline = "FEEDBACK LOOP RECORDED";
    visitorContext = `Diagnostic data recorded, ${operator}. Your feedback has been successfully logged in the sandbox for optimization review. This input will be used by Ankit Bhardwaj to refine the technical architecture of this node.`;
    visitorTag = "LOG_TYPE: DIAGNOSTIC_DATA";
  }

  const htmlTemplate = (h, c, tag, isAutoReply = false) => {
    const palette = {
      page: "#e8e1d6",
      shell: "#f3ede1",
      panel: "#fbf8f1",
      header: "#ded6c9",
      border: "rgba(58, 58, 56, 0.4)",
      text: "#1a3c2b",
      textSoft: "rgba(26, 60, 43, 0.86)",
      muted: "rgba(26, 60, 43, 0.58)",
      accent: "#1a3c2b",
      accentSoft: "rgba(26, 60, 43, 0.05)",
    };
    const safeHeadline = escapeHtml(h);
    const safeContext = escapeHtml(c);
    const safeTag = escapeHtml(tag);
    const safeOperator = escapeHtml(operator);
    const safeVisitorEmail = escapeHtml(visitorEmail);
    const safeEnvironment = escapeHtml(environment);
    const safeMessage = escapeHtml(message);

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        @media (prefers-color-scheme: dark) {
          .email-page { background-color: #050505 !important; }
          .email-shell { background-color: #0a0c0b !important; color: #9effbf !important; border-color: #2f3430 !important; }
          .email-header { background-color: #111111 !important; border-color: #2f3430 !important; }
          .email-panel { background-color: #000000 !important; border-color: #2f3430 !important; }
          .email-accent-panel { background-color: rgba(158, 255, 191, 0.06) !important; border-color: #2f3430 !important; }
          .email-border { border-color: #2f3430 !important; }
          .email-text { color: #f3ede1 !important; }
          .email-copy { color: rgba(243, 237, 225, 0.82) !important; }
          .email-muted { color: #8a8f88 !important; }
          .email-accent { color: #9effbf !important; }
          .email-accent-border { border-color: #9effbf !important; color: #9effbf !important; }
        }
      </style>
    </head>
    <body class="email-page" style="margin: 0; padding: 0; background-color: ${palette.page};">
      <div class="email-shell" style="font-family: 'JetBrains Mono', monospace, 'Courier New'; background-color: ${palette.shell}; color: ${palette.accent}; padding: 0; border: 1px solid ${palette.border}; max-width: 650px; margin: 20px auto; position: relative;">
        
        <!-- System Terminal Header -->
        <div class="email-header" style="background: ${palette.header}; padding: 10px 20px; border-bottom: 1px solid ${palette.border}; display: flex; justify-content: space-between; align-items: center;">
          <div class="email-muted" style="font-size: 10px; color: ${palette.muted}; letter-spacing: 1px;">[ TERMINAL_NODE_V3.0 ]</div>
          <div class="email-muted" style="font-size: 10px; color: ${palette.muted};">SECURE_TRANS_ID: ${makeToken(8)}</div>
        </div>

        <div style="padding: 40px;">
          <!-- Branding Node -->
          <div style="margin-bottom: 40px;">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td>
                  <div class="email-text" style="font-size: 18px; font-weight: 700; color: ${palette.text}; letter-spacing: 5px;">ANKIT<span class="email-accent" style="color: ${palette.accent};">_</span>SYSTEM</div>
                  <div class="email-accent" style="font-size: 9px; color: ${palette.accent}; margin-top: 5px; opacity: 0.75;">&gt;&gt; PRIMARY_NODE_ACTIVE</div>
                </td>
                <td style="text-align: right; vertical-align: top;">
                  <div class="email-accent-border" style="border: 1px solid ${palette.accent}; color: ${palette.accent}; font-size: 9px; padding: 2px 10px; font-weight: bold;">
                    ${safeTag}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- System Content Relay -->
          <div class="email-border" style="margin-bottom: 40px; border-left: 1px solid ${palette.border}; padding-left: 20px;">
            <div class="email-muted" style="font-size: 11px; color: ${palette.muted}; margin-bottom: 10px; text-transform: uppercase;">[ SYSTEM_MESSAGE ]</div>
            <div class="email-text" style="font-size: 16px; font-weight: 700; color: ${palette.text}; margin-bottom: 12px; letter-spacing: 1px;">
              ${safeHeadline}
            </div>
            <div class="email-copy" style="font-size: 14px; line-height: 1.6; color: ${palette.textSoft};">
              ${safeContext}
            </div>
          </div>

          <!-- Raw Data Matrix -->
          <div style="margin-bottom: 40px;">
            <div class="email-muted email-border" style="font-size: 10px; color: ${palette.muted}; margin-bottom: 15px; border-bottom: 1px solid ${palette.border}; padding-bottom: 5px;">-- HANDSHAKE_METRICS --</div>
            <table class="email-copy" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: ${palette.textSoft};">
              <tr>
                <td class="email-muted" style="width: 130px; padding: 6px 0; color: ${palette.muted};">IDENTIFIER:</td>
                <td style="padding: 6px 0;">${safeOperator}</td>
              </tr>
              <tr>
                <td class="email-muted" style="color: ${palette.muted}; padding: 6px 0;">CHANNEL_ID:</td>
                <td style="padding: 6px 0;">${safeVisitorEmail}</td>
              </tr>
              <tr>
                <td class="email-muted" style="color: ${palette.muted}; padding: 6px 0;">DOMAIN_SEG:</td>
                <td style="padding: 6px 0;">${safeEnvironment}</td>
              </tr>
              <tr>
                <td class="email-muted" style="color: ${palette.muted}; padding: 6px 0;">TIMESTAMP:</td>
                <td style="padding: 6px 0;">${new Date().toISOString()}</td>
              </tr>
            </table>
          </div>

          ${isAutoReply ? `
          <!-- Technical Handshake Acknowledgement -->
          <div class="email-accent-panel" style="background: ${palette.accentSoft}; padding: 25px; border: 1px solid ${palette.border}; margin-bottom: 40px;">
            <div class="email-text" style="font-size: 11px; color: ${palette.text}; margin-bottom: 15px; font-weight: bold; letter-spacing: 1px;">ANKIT_BHARDWAJ_CHANNELS:</div>
            
            <div style="margin-bottom: 25px;">
              <a class="email-accent" href="https://linkedin.com/in/ankit-bhardwaj-6b9b62221/" style="color: ${palette.accent}; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[01] LINKEDIN_SYNC</a>
              <a class="email-accent" href="https://github.com/Ankit6149" style="color: ${palette.accent}; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[02] GITHUB_REPO_ACCESS</a>
              <a class="email-accent" href="https://orcid.org/0009-0005-3408-0058" style="color: ${palette.accent}; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[03] ORCID_CREDENTIALS</a>
            </div>

            <div class="email-muted" style="font-size: 10px; color: ${palette.muted}; margin-top: 20px;">
              <div>DIRECT_COMMS: ankitbhardwaj80100@gmail.com</div>
              <div style="margin-top: 4px;">SECURE_VOICE: +91 9555516408</div>
            </div>
          </div>
          ` : `
          <!-- Incoming Data Stream -->
          <div style="margin-top: 30px;">
            <div class="email-muted email-border" style="font-size: 10px; color: ${palette.muted}; margin-bottom: 15px; border-bottom: 1px solid ${palette.border}; padding-bottom: 5px;">-- TRANSMISSION_LOG --</div>
            <div class="email-panel email-copy" style="padding: 25px; background: ${palette.panel}; border: 1px solid ${palette.border}; white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: ${palette.textSoft};">${safeMessage}</div>
          </div>
          `}

          <!-- Footer Metadata -->
          <div class="email-muted" style="margin-top: 60px; text-align: center; font-size: 9px; color: ${palette.muted}; letter-spacing: 1px;">
            <p>SYSTEM_ALPHA // AUTO_RELAY_PROTOCOL // NO_REPLY</p>
            <p style="margin-top: 5px;">&copy; 2026 ANKIT_BHARDWAJ. ALL SYSTEMS OPERATIONAL.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  };

  const textTemplate = (h, c, tag, isAutoReply = false) => [
    "ANKIT_SYSTEM",
    tag,
    "",
    h,
    "",
    c,
    "",
    `IDENTIFIER: ${operator}`,
    `CHANNEL_ID: ${visitorEmail}`,
    `DOMAIN_SEG: ${environment}`,
    `TIMESTAMP: ${new Date().toISOString()}`,
    ...(isAutoReply
      ? [
          "",
          "ANKIT_BHARDWAJ_CHANNELS:",
          "LinkedIn: https://linkedin.com/in/ankit-bhardwaj-6b9b62221/",
          "GitHub: https://github.com/Ankit6149",
          "ORCID: https://orcid.org/0009-0005-3408-0058",
          "Direct comms: ankitbhardwaj80100@gmail.com",
          "Secure voice: +91 9555516408",
        ]
      : ["", "TRANSMISSION_LOG:", message]),
  ].join("\n");

  const uniqueId = makeToken(4);

  try {
    const { fromAddress, notifyRecipient } = getRequiredMailConfig();
    const from = `"SYSTEM_ALPHA" <${fromAddress}>`;
    const ownerContext = `[LOG] SYSTEM_ALPHA detected an incoming handshake from operator ${operator}. Data packets have been successfully routed to Ankit Bhardwaj for terminal processing.`;
    const sendResults = {
      owner: null,
      visitor: null,
    };

    // 1. NOTIFY RECIPIENT (Ankit)
    try {
      await transporter.sendMail({
        from,
        to: notifyRecipient,
        replyTo: visitorEmail || fromAddress,
        subject: `${subject} | ${operator} [${uniqueId}]`,
        text: textTemplate(headline, ownerContext, "RELAY_STATUS: ACTIVE", false),
        html: htmlTemplate(headline, ownerContext, "RELAY_STATUS: ACTIVE", false),
      });
      sendResults.owner = "sent";
    } catch (error) {
      sendResults.owner = "failed";
      console.error(`[SYSTEM_ALPHA] Owner notification failed: ${formatError(error)}`);
    }

    // 2. AUTO-REPLY TO VISITOR
    if (visitorEmail) {
      try {
        await transporter.sendMail({
          from,
          to: visitorEmail,
          replyTo: notifyRecipient,
          subject: `${visitorSubject} | Handshake Confirmed [${uniqueId}]`,
          text: textTemplate(visitorHeadline, visitorContext, visitorTag, true),
          html: htmlTemplate(visitorHeadline, visitorContext, visitorTag, true),
          headers: {
            "Auto-Submitted": "auto-replied",
          },
        });
        sendResults.visitor = "sent";
      } catch (error) {
        sendResults.visitor = "failed";
        console.error(`[SYSTEM_ALPHA] Visitor auto-reply failed: ${formatError(error)}`);
      }
    } else {
      sendResults.visitor = "skipped";
      console.warn(`[SYSTEM_ALPHA] No visitor email provided. Skipping auto-reply.`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (sendResults.owner === "sent" && sendResults.visitor === "sent") {
      return {
        success: true,
        message: "DUAL HANDSHAKE COMPLETE. TRANSMISSION LOGGED.",
      };
    }

    return {
      success: false,
      message:
        sendResults.visitor === "failed"
          ? "MESSAGE LOGGED, BUT VISITOR AUTO-REPLY FAILED. CHECK SERVER MAIL LOGS."
          : "MAIL RELAY PARTIALLY FAILED. CHECK SERVER MAIL LOGS.",
    };
  } catch (error) {
    console.error("CRITICAL SYSTEM ERROR:", formatError(error));
    return {
      success: false,
      message: "SYSTEM ERROR. INITIALIZATION FAILED.",
    };
  }
}
