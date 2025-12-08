import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-gray-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative aspect-video w-full bg-gray-200">
          <div className="flex items-center justify-center h-full text-gray-400 relative">
            <Image
              src={process.env.LOGO_ICON_URL!}
              alt="BrainBoost"
              fill
              className="object-contain opacity-20"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
              404
            </span>
          </div>

          <h1 className="text-xl font-bold mb-2 leading-tight">
            Resource Not Found
          </h1>
          <p className="text-gray-600 font-medium mb-4">
            The requested resource could not be found on BrainBoost.
          </p>

          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>
              The resource you are looking for may have been removed, renamed,
              or is temporarily unavailable.
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">
              Open BrainBoost App to browse available resources
            </p>
            <a
              href="brainboost://home"
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-center"
            >
              Open in App
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
