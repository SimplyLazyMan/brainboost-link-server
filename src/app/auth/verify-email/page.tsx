import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

// format of link to this page: /auth/verify-email?token=abc123
export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailClient />
    </Suspense>
  );
}
