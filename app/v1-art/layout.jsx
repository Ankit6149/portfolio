import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./v1-art.module.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-v1-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-v1-sans",
  display: "swap",
});

export const metadata = {
  title: "Ankit Bhardwaj | Curiosity in Bloom — V1 Art Direction",
  description:
    "Ankit Bhardwaj — Builder, Researcher, and Lifelong Learner working at the intersection of software, systems, and human potential.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function V1ArtLayout({ children }) {
  return (
    <div className={`${cormorant.variable} ${jakarta.variable} v1-layout-container`}>
      {children}
    </div>
  );
}
