import { Suspense } from "react";
import ResetPassword from "../components/reset-password";

export default function Reset() {
  return (
    <Suspense fallback={<div>Loading reset page...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
