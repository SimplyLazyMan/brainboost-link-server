import Image from "next/image";

export default function Home() {
  const logoUrl = process.env.LOGO_ICON_URL;
  const fallbackUrl = process.env.FALLBACK_URL || "#";
  const deepLinkUrl = `${process.env.DEEP_LINK_URL}/` || "brainboost://";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 overflow-hidden border border-white/50 dark:border-gray-700/50">
          {/* Logo Section */}
          <div className="relative pt-12 pb-8 px-8 flex flex-col items-center">
            {logoUrl && (
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-30 animate-pulse" />
                <div className="relative w-full h-full bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-3">
                  <Image
                    src={logoUrl}
                    alt="BrainBoost Logo"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              BrainBoost
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
              Link Server
            </p>
          </div>

          {/* Status Section */}
          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </div>
                <div>
                  <p className="text-green-800 dark:text-green-300 font-semibold text-sm">
                    Server Running
                  </p>
                  <p className="text-green-600/80 dark:text-green-400/80 text-xs">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="px-8 pb-8">
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
              Smart redirect and metadata server for the{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                BrainBoost
              </span>{" "}
              educational platform.
            </p>
          </div>

          {/* Actions Section */}
          <div className="px-8 pb-10 space-y-3">
            <a
              href={deepLinkUrl}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Open BrainBoost App
            </a>
            <a
              href={fallbackUrl}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Visit Website
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            Powering educational resources for students
          </p>
        </div>
      </div>
    </main>
  );
}
