import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="relative mb-6 h-64 w-full max-w-lg sm:h-80">
        <Image
          src="/images/not_found.png"
          alt="404 Page Not Found"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="sr-only">404 - Page Not Found</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Oops! Page not found
      </h2>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Go Back Home
      </Link>
    </div>
  );
}
