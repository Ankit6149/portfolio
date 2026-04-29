import { redirect } from "next/navigation";

export const metadata = {
  title: "Links | Ankit Bhardwaj",
};

export default function LinksPage() {
  redirect("/contact");
}
