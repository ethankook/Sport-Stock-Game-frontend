import { redirect } from "next/navigation";

export default function HomePage() {
  // TODO: check auth state and redirect if logged in
  redirect("/auth");
}