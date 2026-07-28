import "lenis/dist/lenis.css";
import "./redesign.css";

export const metadata = {
  title: "Portfolio Redesign Study | Ankit Bhardwaj",
  description:
    "A motion-led portfolio design study for Ankit Bhardwaj. This route is an isolated prototype and does not replace the current portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedesignLayout({ children }) {
  return children;
}
