import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SYSTEM_ALPHA | Ankit Bhardwaj",
    template: "%s | Ankit Bhardwaj",
  },
  description:
    "Portfolio of Ankit Bhardwaj, a software engineer building full-stack systems, AI integrations, and research-driven web applications.",
  keywords: [
    "Ankit Bhardwaj",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "AI Researcher",
    "Portfolio",
  ],
  authors: [{ name: "Ankit Bhardwaj" }],
  creator: "Ankit Bhardwaj",
  openGraph: {
    title: "SYSTEM_ALPHA | Ankit Bhardwaj",
    description:
      "Full-stack systems, AI integrations, research work, credentials, and project archive.",
    url: "/",
    siteName: "SYSTEM_ALPHA",
    images: [
      {
        url: "/system-alpha-core.png",
        width: 1200,
        height: 630,
        alt: "SYSTEM_ALPHA portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYSTEM_ALPHA | Ankit Bhardwaj",
    description:
      "Full-stack systems, AI integrations, research work, credentials, and project archive.",
    images: ["/system-alpha-core.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem("portfolio-theme");
                var theme = stored === "light" || stored === "dark"
                  ? stored
                  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                document.documentElement.dataset.theme = theme;
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
