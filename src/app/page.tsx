import { redirect } from "next/navigation";

export default function HomePage() {
  // TODO: check auth state and redirect to /leagues if logged in
  redirect("/auth");
}