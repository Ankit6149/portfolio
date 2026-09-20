import { Harmattan, Kalam, Noto_Serif_Display } from "next/font/google";
import "./v1.css";

const display = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--v1-display",
});

const body = Harmattan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--v1-body",
});

const script = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--v1-script",
});

export const metadata = {
  title: "Portfolio V1 · Ankit Bhardwaj",
  description:
    "A layered 2D portfolio study for Ankit Bhardwaj, built around curiosity, engineering, research, and the life around the work.",
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }) {
  return (
    <div className={`${display.variable} ${body.variable} ${script.variable}`}>
      {children}
    </div>
  );
}
