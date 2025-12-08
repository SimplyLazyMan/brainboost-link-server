"use client";

import { useLayoutEffect, useState } from "react";

interface OpenAppButtonProps {
  resourceId: string;
  packageName: string; // e.g., "com.brainboost.app"
  scheme: string; // e.g., "brainboost"
  fallbackUrl?: string;
}

export default function OpenAppButton({
  resourceId,
  packageName,
  scheme,
  fallbackUrl,
}: OpenAppButtonProps) {
  const [isAndroid, setIsAndroid] = useState(false);

  useLayoutEffect(() => {
    // Check if the user is on an Android device
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  const handleOpenApp = (e: React.MouseEvent) => {
    if (isAndroid) {
      e.preventDefault();
      
      // Construct the Intent URL
      // Format: intent://<HOST>/<PATH>#Intent;scheme=<SCHEME>;package=<PACKAGE_NAME>;S.browser_fallback_url=<FALLBACK_URL>;end
      // Adjust the path structure to match what your app expects
      const path = `question/detail/${resourceId}`;
      
      let intentUrl = `intent://open/${path}#Intent;scheme=${scheme};package=${packageName};`;
      
      if (fallbackUrl) {
        intentUrl += `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};`;
      }
      
      intentUrl += "end";

      window.location.href = intentUrl;
    }
    // If not Android, let the default behavior happen (or handle iOS/Desktop differently)
  };

  return (
    <a
      href={isAndroid ? "#" : fallbackUrl || "#"}
      onClick={handleOpenApp}
      className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-center"
    >
      Open in App
    </a>
  );
}
