import type { Metadata } from "next";
import type { AppLinksAndroid } from "next/dist/lib/metadata/types/extra-types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPaperById } from "../../../lib/data-fetching";
import OpenAppButton from "./OpenAppButton";

interface ResourcePageProps {
  params: Promise<{ id: string }>;
}

function getDomainFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return `https://${parsedUrl.hostname}`;
  } catch {
    return null;
  }
}

// Helper to format enum strings like "FIRST_SEMESTER" -> "First Semester"
function formatEnumString(str: string): string {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Helper to format level "LEVEL200" -> "Level 200"
function formatLevel(level: string): string {
  return level.replace("LEVEL", "Level ");
}

// Generate metadata for social sharing (Open Graph)
export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { id } = await params;
  const resource = await getPaperById(id);

  if (!resource) {
    return {
      title: "Resource Not Found",
      description: "The requested resource could not be found on BrainBoost.",
    };
  }

  // Construct rich title and description
  const title = `${resource.course.code}: ${resource.course.title}`;
  const level = formatLevel(resource.course.level);
  const semester = formatEnumString(resource.semester);
  const type = formatEnumString(resource.courseType);

  // E.g. "Exam paper for Introduction to AI (CSC 404). Level 400, Second Semester 2023/2024. Faculty of Science. Solution available."
  const description = `${type} paper for ${resource.course.title} (${
    resource.course.code
  }). ${level}, ${semester} ${resource.academicYear}. ${
    resource.faculty.name
  }, ${resource.department.name}.${
    resource.hasSolution ? " Solution available." : ""
  } Access on BrainBoost.`;

  const imageUrl = resource.thumbnail || process.env.LOGO_ICON_URL || "";

  return {
    title: {
      absolute: title,
      template: "%s | BrainBoost",
    },
    description: description,
    keywords: [
      "BrainBoost",
      "Past Questions",
      "Exam Papers",
      "Study Resources",
      resource.course.code,
      resource.course.title,
      level,
      resource.academicYear,
      type,
      resource.faculty.name,
      resource.department.name,
      "University",
      "Cameroon",
    ],
    openGraph: {
      title: title,
      description: description,
      siteName: "BrainBoost",
      locale: "en_US",
      type: "website",
      url: `${process.env.FALLBACK_URL}/question/detail/${resource.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} Preview`,
        },
      ],
    },
    appLinks: {
      android: {
        package: process.env.APP_PACKAGE_NAME,
        app_name: "BrainBoost",
        url: `${process.env.DEEP_LINK_URL}/question/detail/${resource.id}`,
      } as AppLinksAndroid,
      web: {
        url: `${process.env.FALLBACK_URL}/question/detail/${resource.id}`,
        should_fallback: true,
      },
    },
    icons: process.env.LOGO_ICON_URL,
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
      canonical: `${process.env.FALLBACK_URL}/question/detail/${resource.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
      creator: "@brainboost",
    },
    other: {
      "apple-mobile-web-app-title": "BrainBoost",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    authors: [
      {
        name: "BrainBoost",
        url: getDomainFromUrl(process.env.FALLBACK_URL || "") || undefined,
      },
    ],
    creator: "BrainBoost",
    publisher: "BrainBoost",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.FALLBACK_URL || "https://example.com"),
    appleWebApp: {
      title: "BrainBoost",
      statusBarStyle: "black-translucent",
      startupImage: [
        {
          url: "/apple-startup-image-1x.png",
          media:
            "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
        },
        {
          url: "/apple-startup-image-2x.png",
          media:
            "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 3)",
        },
      ],
    },
  };
}

// Page component that displays resource detail
export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const resource = await getPaperById(id);

  // If resource not found, trigger Next.js 404 page
  if (!resource) {
    notFound();
  }

  const title = `${resource.course.code}: ${resource.course.title}`;
  const level = formatLevel(resource.course.level);
  const semester = formatEnumString(resource.semester);
  const type = formatEnumString(resource.courseType);
  const description = `${type} • ${level} • ${semester} • ${resource.academicYear}`;

  const imageUrl = resource.thumbnail || process.env.LOGO_ICON_URL || "";

  // JSON-LD Structured Data for SEO (Client-side injection)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description: description,
    educationalLevel: level,
    learningResourceType: type,
    image: imageUrl,
    datePublished: resource.createdAt,
    inLanguage: "en",
    fileFormat: "application/pdf",
    url: `${process.env.FALLBACK_URL}/question/detail/${resource.id}`,
    provider: {
      "@type": "Organization",
      name: "BrainBoost",
      url: getDomainFromUrl(process.env.FALLBACK_URL || ""),
      logo: process.env.LOGO_ICON_URL,
    },
    ...(resource.solutionPrice && {
      offers: {
        "@type": "Offer",
        price: resource.solutionPrice,
        priceCurrency: "XAF",
        availability: "https://schema.org/InStock",
      },
    }),
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-gray-900">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative aspect-video w-full bg-gray-200">
          {resource.thumbnail ? (
            <Image
              src={resource.thumbnail}
              alt={title}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 relative">
              <Image
                src={process.env.LOGO_ICON_URL || ""}
                alt={title}
                fill
                priority
                className="object-contain opacity-20"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              {type}
            </span>
            <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
              {level}
            </span>
          </div>

          <h1 className="text-xl font-bold mb-2 leading-tight">
            {resource.course.title}
          </h1>
          <p className="text-gray-600 font-medium mb-4">
            {resource.course.code}
          </p>

          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Faculty</span>
              <span className="font-medium text-gray-900 text-right">
                {resource.faculty.name} ({resource.faculty.abbreviation})
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Department</span>
              <span className="font-medium text-gray-900 text-right">
                {resource.department.name}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Year</span>
              <span className="font-medium text-gray-900">
                {resource.academicYear}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Semester</span>
              <span className="font-medium text-gray-900">{semester}</span>
            </div>
            {resource.hasSolution && (
              <div className="flex justify-between items-center pt-1 text-green-600 font-medium">
                <span>✓ Solution Available</span>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">
              Open in BrainBoost App to view full content
            </p>
            <OpenAppButton
              resourceId={resource.id}
              packageName={process.env.APP_PACKAGE_NAME || ""}
              scheme={(
                (process.env.APP_PACKAGE_NAME || "").split(".").pop() ||
                "brainboost"
              ).toLowerCase()}
              fallbackUrl={`${process.env.FALLBACK_URL}/question/detail/${resource.id}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
