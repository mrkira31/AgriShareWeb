import { notFound } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
export const dynamicParams = false;
export function generateStaticParams() { return [{ role: "farmer" }, { role: "owner" }]; }
export default async function RoleDashboard({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (role !== "farmer" && role !== "owner") notFound();
  return <Dashboard requested={role === "farmer" ? "Farmer" : "Owner"}/>;
}
