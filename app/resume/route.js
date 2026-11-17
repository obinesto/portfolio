export function GET(request) {
  return Response.redirect(new URL("/resume/download", request.url), 307);
}
