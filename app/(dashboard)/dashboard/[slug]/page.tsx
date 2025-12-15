import { notFound } from "next/navigation";

export default function DashboardCatchAllPage() {
  // For any unknown /dashboard/* route, render the dashboard 404
  notFound();
}
