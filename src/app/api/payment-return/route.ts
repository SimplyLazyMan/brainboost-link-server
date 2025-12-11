import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Extract sessionId from URL query string
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return new Response("sessionId is required", { status: 400 });
  }

  const deepLinkBase = process.env.DEEP_LINK_URL;
  const fallbackBase = process.env.FALLBACK_URL;

  // Construct deep link and fallback URL
  const deepLink = `${deepLinkBase}payment-success?sessionId=${sessionId}`;
  const fallbackUrl = `${fallbackBase}/payment-status?sessionId=${sessionId}`;

  // Return HTML with redirect logic
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=${deepLink}">
  <title>Redirecting...</title>
  <script type="text/javascript">
    setTimeout(() => {
      window.location.href = '${fallbackUrl}';
    }, 2000);
  </script>
</head>
<body>
  <p>Redirecting you to the app...</p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
