"use client";

import { redirect, RedirectType, useSearchParams } from "next/navigation";

export default function VerifyEmailClient() {
  const urlParams = useSearchParams();
  const token = urlParams.get("token");
  return redirect(
    `${process.env.WEBSITE_URL}/auth/verify-email?token=${token}`,
    RedirectType.replace,
  );
}
