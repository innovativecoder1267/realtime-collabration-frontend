import { Suspense } from "react";
import Register from "../components/signup";

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading sign up...</div>}>
      <Register />
    </Suspense>
  );
}
