import { Suspense } from "react";
import OneTime from "../components/otp";

export default function Verified() {
  return (
    <Suspense fallback={<div>Verifying OTP...</div>}>
      <OneTime />
    </Suspense>
  );
}
