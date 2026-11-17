import test from "node:test";
import assert from "node:assert/strict";
import { renderContactEmail } from "../lib/contact-email.mjs";

test("escapes visitor content and preserves message line breaks", () => {
  const html = renderContactEmail({
    name: 'Alex <img src=x onerror="alert(1)"> & Morgan',
    email: "alex+portfolio@example.com",
    message: "Hello <script>alert('x')</script>\r\n\r\nA & B\nLast line.",
  });
  assert.ok(
    html.includes("Alex &lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; Morgan"),
  );
  assert.ok(
    html.includes(
      "Hello &lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;<br /><br />A &amp; B<br />Last line.",
    ),
  );
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<img"));
  assert.ok(
    html.includes(
      'href="mailto:alex%2Bportfolio%40example.com?subject=Re%3A%20Portfolio%20enquiry"',
    ),
  );
});

test("email links cannot inject additional HTML attributes", () => {
  const html = renderContactEmail({
    name: "Alex Morgan",
    email: 'alex"onmouseover="bad@example.com',
    message: "A message about working together.",
  });
  assert.ok(html.includes("mailto:alex%22onmouseover%3D%22bad%40example.com"));
  assert.ok(!html.includes('onmouseover="bad'));
});
