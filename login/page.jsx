import { Suspense } from "react";
import Login from "../components/login";
export default function Loginpage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <Login />
    </Suspense>
  );
}
