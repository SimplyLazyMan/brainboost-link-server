"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailClient() {
  const urlParams = useSearchParams();
  const token = urlParams.get("token");

  useEffect(() => {
    if (token) {
      // Use window.location.replace for cross-domain redirects
      window.location.replace(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/verify-email?token=${token}`);
    }
  }, [token]);

  return <div>Redirecting to verification...</div>;
}
