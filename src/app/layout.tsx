import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrainBoost Link Server",
  description: "Smart redirect and metadata server for BrainBoost app",
  icons: process.env.LOGO_ICON_URL,
  applicationName: "BrainBoost",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.FALLBACK_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainBoost Link Server",
  },
  other: {
    "apple-mobile-web-app-title": "BrainBoost",
  },
  openGraph: {
    title: "BrainBoost Link Server",
    description: "Smart redirect and metadata server for BrainBoost app",
    siteName: "BrainBoost",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: process.env.LOGO_ICON_URL || "",
        width: 1200,
        height: 630,
        alt: "BrainBoost Link Server Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
