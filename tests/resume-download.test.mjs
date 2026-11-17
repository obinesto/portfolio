import test from "node:test";
import assert from "node:assert/strict";
import {
  selectResumeRegion,
  getDriveDownloadUrl,
  getResumeDownload,
} from "../lib/resume-download.mjs";

test("Nigerian visitors get the local resume; overseas and unknown visitors get the remote resume", () => {
  const env = {
    RESUME_NG_URL: "https://drive.google.com/file/d/nigeria-file/view",
    RESUME_REMOTE_URL: "https://drive.google.com/file/d/remote-file/view",
  };
  for (const [country, region, id] of [
    ["NG", "ng", "nigeria-file"],
    ["ng", "ng", "nigeria-file"],
    ["CA", "remote", "remote-file"],
    ["", "remote", "remote-file"],
  ]) {
    const headers = new Headers({ "x-vercel-ip-country": country });
    assert.equal(selectResumeRegion(headers), region);
    assert.equal(
      new URL(getResumeDownload({ headers, env })).searchParams.get("id"),
      id,
    );
  }
});

test("missing or invalid regional configuration has no hardcoded fallback", () => {
  for (const country of ["NG", "US"]) {
    const headers = new Headers({ "x-vercel-ip-country": country });
    assert.equal(getResumeDownload({ headers }), null);
    assert.equal(
      getResumeDownload({
        headers,
        env: {
          RESUME_NG_URL: "bad",
          RESUME_REMOTE_URL: "https://untrusted.example/resume",
        },
      }),
      null,
    );
  }
});

test("a configured resume for the other region is not used as a fallback", () => {
  assert.equal(
    getResumeDownload({
      headers: new Headers({ "x-vercel-ip-country": "NG" }),
      env: { RESUME_REMOTE_URL: "https://drive.google.com/file/d/remote-file/view" },
    }),
    null,
  );
  assert.equal(
    getResumeDownload({
      headers: new Headers({ "x-vercel-ip-country": "US" }),
      env: { RESUME_NG_URL: "https://drive.google.com/file/d/nigeria-file/view" },
    }),
    null,
  );
});

test("Drive links become downloads and untrusted destinations are rejected", () => {
  assert.equal(
    getDriveDownloadUrl("https://drive.google.com/file/d/my-resume/view"),
    "https://drive.google.com/uc?export=download&id=my-resume",
  );
  assert.equal(
    getDriveDownloadUrl("https://drive.google.com/open?id=my-resume"),
    "https://drive.google.com/uc?export=download&id=my-resume",
  );
  for (const value of [
    undefined,
    "bad",
    "http://drive.google.com/file/d/id/view",
    "https://malicious.example/file/d/id/view",
    "https://drive.google.com/",
  ]) {
    assert.equal(getDriveDownloadUrl(value), null);
  }
});
