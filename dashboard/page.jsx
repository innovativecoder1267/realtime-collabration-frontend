import { Suspense } from "react";
import Dashboard from "../components/Dashboard";

export default function Dash() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
  );
}
