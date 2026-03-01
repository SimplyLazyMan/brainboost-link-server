import { redirect, RedirectType } from "next/navigation";

// format of link to this page: /auth/verify-email?token=abc123

export default function VerifyEmail() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  return redirect(
    `${process.env.WEBSITE_URL}/auth/verify-email?token=${token}`,
    RedirectType.replace,
  );
}
