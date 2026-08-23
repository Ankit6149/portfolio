import "lenis/dist/lenis.css";
import "./redesign.css";
import "./refinements.css";
import "./continuous.css";
import "./continuous-fixes.css";
import "./world-hero.css";
import RedesignWorldProvider from "./components/world/RedesignWorldProvider";

export const metadata = {
  title: {
    absolute: "Portfolio Preview | Ankit Bhardwaj",
  },
  description:
    "An interactive portfolio preview for Ankit Bhardwaj. This review route remains separate from the production portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedesignLayout({ children }) {
  return <RedesignWorldProvider>{children}</RedesignWorldProvider>;
}
