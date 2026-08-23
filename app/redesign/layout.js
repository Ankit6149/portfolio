import "./world-base.css";

export const metadata = {
  title: {
    absolute: "Portfolio World Preview | Ankit Bhardwaj",
  },
  description:
    "A visual world preview for Ankit Bhardwaj's portfolio. This review route remains separate from the production portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedesignLayout({ children }) {
  return children;
}
