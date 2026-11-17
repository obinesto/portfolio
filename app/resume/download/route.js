import { getResumeDownload } from "@/lib/resume-download.mjs";

export function GET(request) {
  const location = getResumeDownload({
    headers: request.headers,
    env: process.env,
  });
  if (!location) {
    return new Response(
      "The resume is temporarily unavailable. Please try again later.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "private, no-store",
        },
      },
    );
  }
  return new Response(null, {
    status: 307,
    headers: {
      Location: location,
      "Cache-Control": "private, no-store",
    },
  });
}
