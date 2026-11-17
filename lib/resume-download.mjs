export function selectResumeRegion(headers) {
  return headers.get("x-vercel-ip-country")?.toUpperCase() === "NG" ? "ng" : "remote";
}

export function getDriveDownloadUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "drive.google.com")
      return null;
    const id =
      url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1] ||
      url.searchParams.get("id");
    if (!id || !/^[\w-]+$/.test(id)) return null;
    const download = new URL("https://drive.google.com/uc");
    download.searchParams.set("export", "download");
    download.searchParams.set("id", id);
    return download.href;
  } catch {
    return null;
  }
}

export function getResumeDownload({ headers, env = {} }) {
  const region = selectResumeRegion(headers);
  const configured = region === "ng" ? env.RESUME_NG_URL : env.RESUME_REMOTE_URL;
  return getDriveDownloadUrl(configured);
}
