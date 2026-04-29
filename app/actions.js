"use server";

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function submitIntegrationRequest(formData) {
  const operator = formData.get("operator");
  const visitorEmail = formData.get("email");
  const environment = formData.get("environment");
  const message = formData.get("message") || "NO_MESSAGE_CONTENT_PROVIDED";

  // Logic for YOUR notification (Ankit)
  let subject = `System Update: ${operator}`;
  let headline = "SYSTEM INTEGRATION REQUEST";
  let context = "A new collaboration handshake has been initiated.";

  // Logic for VISITOR'S auto-reply
  let visitorSubject = "";
  let visitorHeadline = "";
  let visitorContext = "";
  let visitorTag = "";

  console.log(`[SYSTEM_ALPHA] Processing request from: ${operator} <${visitorEmail}> [Env: ${environment}]`);

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

  const htmlTemplate = (h, c, tag, isAutoReply = false) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000;">
      <div style="font-family: 'JetBrains Mono', monospace, 'Courier New'; background-color: #050505; color: #00ff41; padding: 0; border: 1px solid #1a1a1a; max-width: 650px; margin: 20px auto; position: relative;">
        
        <!-- System Terminal Header -->
        <div style="background: #111; padding: 10px 20px; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 10px; color: #888; letter-spacing: 1px;">[ TERMINAL_NODE_V3.0 ]</div>
          <div style="font-size: 10px; color: #666;">SECURE_TRANS_ID: ${Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
        </div>

        <div style="padding: 40px;">
          <!-- Branding Node -->
          <div style="margin-bottom: 40px;">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td>
                  <div style="font-size: 18px; font-weight: 700; color: #fff; letter-spacing: 5px;">ANKIT<span style="color: #00ff41;">_</span>SYSTEM</div>
                  <div style="font-size: 9px; color: #00ff41; margin-top: 5px; opacity: 0.7;">&gt;&gt; PRIMARY_NODE_ACTIVE</div>
                </td>
                <td style="text-align: right; vertical-align: top;">
                  <div style="border: 1px solid #00ff41; color: #00ff41; font-size: 9px; padding: 2px 10px; font-weight: bold;">
                    ${tag}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- System Content Relay -->
          <div style="margin-bottom: 40px; border-left: 1px solid #1a1a1a; padding-left: 20px;">
            <div style="font-size: 11px; color: #666; margin-bottom: 10px; text-transform: uppercase;">[ SYSTEM_MESSAGE ]</div>
            <div style="font-size: 14px; line-height: 1.6; color: #00ff41;">
              ${c}
            </div>
          </div>

          <!-- Raw Data Matrix -->
          <div style="margin-bottom: 40px;">
            <div style="font-size: 10px; color: #666; margin-bottom: 15px; border-bottom: 1px solid #1a1a1a; padding-bottom: 5px;">-- HANDSHAKE_METRICS --</div>
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #00ff41;">
              <tr>
                <td style="width: 130px; padding: 6px 0; color: #777;">IDENTIFIER:</td>
                <td style="padding: 6px 0;">${operator}</td>
              </tr>
              <tr>
                <td style="color: #777; padding: 6px 0;">CHANNEL_ID:</td>
                <td style="padding: 6px 0;">${visitorEmail}</td>
              </tr>
              <tr>
                <td style="color: #777; padding: 6px 0;">DOMAIN_SEG:</td>
                <td style="padding: 6px 0;">${environment}</td>
              </tr>
              <tr>
                <td style="color: #777; padding: 6px 0;">TIMESTAMP:</td>
                <td style="padding: 6px 0;">${new Date().toISOString()}</td>
              </tr>
            </table>
          </div>

          ${isAutoReply ? `
          <!-- Technical Handshake Acknowledgement -->
          <div style="background: rgba(0, 255, 65, 0.02); padding: 25px; border: 1px solid #1a1a1a; margin-bottom: 40px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 15px; font-weight: bold; letter-spacing: 1px;">ANKIT_BHARDWAJ_CHANNELS:</div>
            
            <div style="margin-bottom: 25px;">
              <a href="https://linkedin.com/in/ankit-bhardwaj-6b9b62221/" style="color: #00ff41; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[01] LINKEDIN_SYNC</a>
              <a href="https://github.com/Ankit6149" style="color: #00ff41; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[02] GITHUB_REPO_ACCESS</a>
              <a href="https://orcid.org/0009-0004-9549-346X" style="color: #00ff41; text-decoration: none; font-size: 11px; display: block; margin: 8px 0;">[03] ORCID_CREDENTIALS</a>
            </div>

            <div style="font-size: 10px; color: #777; margin-top: 20px;">
              <div>DIRECT_COMMS: ankitbhardwaj80100@gmail.com</div>
              <div style="margin-top: 4px;">SECURE_VOICE: +91 9555516408</div>
            </div>
          </div>
          ` : `
          <!-- Incoming Data Stream -->
          <div style="margin-top: 30px;">
            <div style="font-size: 10px; color: #666; margin-bottom: 15px; border-bottom: 1px solid #1a1a1a; padding-bottom: 5px;">-- TRANSMISSION_LOG --</div>
            <div style="padding: 25px; background: #000; border: 1px solid #1a1a1a; white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: #00ff41;">${message}</div>
          </div>
          `}

          <!-- Footer Metadata -->
          <div style="margin-top: 60px; text-align: center; font-size: 9px; color: #666; letter-spacing: 1px;">
            <p>SYSTEM_ALPHA // AUTO_RELAY_PROTOCOL // NO_REPLY</p>
            <p style="margin-top: 5px;">&copy; 2026 ANKIT_BHARDWAJ. ALL SYSTEMS OPERATIONAL.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const uniqueId = Math.random().toString(36).substr(2, 4).toUpperCase();
  const timestamp = new Date().toLocaleTimeString();

  try {
    // 1. NOTIFY RECIPIENT (Ankit)
    console.log(`[SYSTEM_ALPHA] Attempting to notify Ankit...`);
    await transporter.sendMail({
      from: `"SYSTEM_ALPHA" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_RECIPIENT || process.env.GMAIL_USER,
      replyTo: visitorEmail,
      subject: `${subject} | ${operator} [${uniqueId}]`,
      html: htmlTemplate(headline, `[LOG] SYSTEM_ALPHA detected an incoming handshake from operator ${operator}. Data packets have been successfully routed to Ankit Bhardwaj for terminal processing.`, "RELAY_STATUS: ACTIVE", false),
    });
    console.log(`[SYSTEM_ALPHA] Ankit notified successfully.`);

    // 2. AUTO-REPLY TO VISITOR
    if (visitorEmail) {
      console.log(`[SYSTEM_ALPHA] Attempting to auto-reply to visitor: ${visitorEmail}...`);
      await transporter.sendMail({
        from: `"SYSTEM_ALPHA" <${process.env.GMAIL_USER}>`,
        to: visitorEmail,
        replyTo: process.env.NOTIFY_RECIPIENT || process.env.GMAIL_USER,
        subject: `${visitorSubject} | Handshake Confirmed [${uniqueId}]`,
        html: htmlTemplate(visitorHeadline, visitorContext, visitorTag, true),
      });
      console.log(`[SYSTEM_ALPHA] Auto-reply sent to visitor.`);
    } else {
      console.warn(`[SYSTEM_ALPHA] No visitor email provided. Skipping auto-reply.`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      message: "DUAL HANDSHAKE COMPLETE. TRANSMISSION LOGGED.",
    };
  } catch (error) {
    console.error("CRITICAL SYSTEM ERROR:", error);
    return {
      success: false,
      message: "SYSTEM ERROR. INITIALIZATION FAILED.",
    };
  }
}
