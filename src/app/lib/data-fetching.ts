import type { ApiResponse, QuestionPaper } from "../util/type";

// Fetch resource details from the staging API
export async function getPaperById(id: string): Promise<QuestionPaper | null> {
  const rawBaseUrl = process.env.API_BASE_URL;

  if (!rawBaseUrl) {
    throw new Error("API_BASE_URL environment variable is not set");
  }

  // Normalize base URL:
  // - Strip accidental surrounding quotes from env values
  // - Remove any trailing slashes to avoid "//" in the final URL
  const baseUrl = rawBaseUrl.replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");

  // Ensure the id is URL-safe
  const encodedId = encodeURIComponent(id);

  const url = `${baseUrl}/question-papers/${encodedId}`;
  const startedAt = Date.now();
  console.log("[papers:get] ->", url);

  try {
    const response = await fetch(url, {
      // Revalidate data periodically to avoid serving stale content
      next: { revalidate: 3600 }, // 1 hour
    });

    console.log(
      "[papers:get] <- status:",
      response.status,
      `${Date.now() - startedAt}ms`,
    );

    if (!response.ok) {
      // Log error body to aid debugging
      let errorBody = "<no body>";
      try {
        errorBody = await response.text();
      } catch {
        // ignore
      }
      console.log("[papers:get] error body:", errorBody);
      return null;
    }

    const json: ApiResponse<QuestionPaper> = await response.json();

    if (!json.success || !json.data) {
      console.log("[papers:get] API returned success:false or no data");
      return null;
    }

    const data = json.data;
    console.log(
      "[papers:get] ok id/courseTitle:",
      data?.id,
      data?.course?.title,
    );
    return data;
  } catch (err) {
    console.log("[papers:get] exception:", err);
    throw err;
  }
}
