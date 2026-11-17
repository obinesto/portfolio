const entities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function renderContactEmail({ name, email, message }) {
  const senderName = escapeHtml(name);
  const senderEmail = escapeHtml(email);
  const messageHtml = escapeHtml(message).replace(/\r\n?|\n/g, "<br />");
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=Re%3A%20Portfolio%20enquiry`;

  // Inline light colours remain usable when an email app removes the style block.
  // Supporting clients use the dark overrides; others control their own inversion.
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>New portfolio enquiry</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      table { border-collapse: collapse; }
      a { text-decoration: none; }
      @media screen and (max-width: 480px) {
        .email-outer { padding: 24px 12px !important; }
        .email-content { padding: 24px !important; }
        .email-heading { font-size: 36px !important; }
        .email-card { padding: 20px !important; }
      }
      @media (prefers-color-scheme: dark) {
        .email-background { background-color: #14242d !important; }
        .email-surface { background-color: #1e333e !important; }
        .email-paper { background-color: #192e39 !important; }
        .email-text { color: #e7edf1 !important; }
        .email-muted { color: #a9bac5 !important; }
        .email-accent { color: #a3b2ff !important; }
        .email-border { border-color: #3b515e !important; }
        .email-button { background-color: #e7edf1 !important; color: #14242d !important; }
      }
      [data-ogsc] .email-background { background-color: #14242d !important; }
      [data-ogsc] .email-surface { background-color: #1e333e !important; }
      [data-ogsc] .email-paper { background-color: #192e39 !important; }
      [data-ogsc] .email-text { color: #e7edf1 !important; }
      [data-ogsc] .email-muted { color: #a9bac5 !important; }
      [data-ogsc] .email-accent { color: #a3b2ff !important; }
      [data-ogsc] .email-border { border-color: #3b515e !important; }
      [data-ogsc] .email-button { background-color: #e7edf1 !important; color: #14242d !important; }
    </style>
  </head>
  <body class="email-background email-text" style="margin:0; padding:0; background-color:#edf1f3; color:#18313d; font-family:Arial,Helvetica,sans-serif; -webkit-text-size-adjust:100%;">
    <div style="display:none; max-height:0; max-width:0; overflow:hidden; opacity:0; font-size:1px; line-height:1px; mso-hide:all;">A new message from ${senderName}, sent through your portfolio.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-background" bgcolor="#edf1f3" style="width:100%; background-color:#edf1f3;">
      <tr>
        <td align="center" class="email-outer" style="padding:40px 20px;">
          <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; table-layout:fixed;">
            <tr>
              <td class="email-content" style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="padding:0 0 24px;">
                      <a href="https://me.obinestotech.com" class="email-text" style="color:#18313d; font-size:24px; font-weight:600; letter-spacing:-1px; text-decoration:none;">Cyprian Obi</a>
                    </td>
                    <td align="right" class="email-muted" style="padding:0 0 24px; color:#526775; font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1px;">PORTFOLIO</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="email-border email-muted" style="border-top:1px solid #b9c7cf; padding:24px 0 28px; color:#526775; font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1px;">CONTACT / IN THE INBOX</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:0 0 28px;">
                      <h1 class="email-heading email-text" style="margin:0; color:#18313d; font-size:44px; font-weight:500; line-height:1.08; letter-spacing:-2px;">A new<br /><em class="email-accent" style="color:#3147c7; font-family:Georgia,'Times New Roman',serif; font-weight:400;">conversation.</em></h1>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="email-surface email-card" bgcolor="#e0e7eb" style="padding:24px; background-color:#e0e7eb;">
                      <p class="email-muted" style="margin:0 0 10px; color:#526775; font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1px;">FROM</p>
                      <p class="email-text" style="margin:0 0 6px; color:#18313d; font-size:18px; font-weight:600; line-height:1.5; overflow-wrap:anywhere; word-break:break-word;">${senderName}</p>
                      <a href="${replyHref}" class="email-accent" style="color:#3147c7; font-size:14px; line-height:1.7; text-decoration:underline; overflow-wrap:anywhere; word-break:break-word;">${senderEmail}</a>
                    </td>
                  </tr>
                  <tr><td colspan="2" height="16" style="height:16px; font-size:1px; line-height:16px;">&nbsp;</td></tr>
                  <tr>
                    <td colspan="2" class="email-paper email-border email-card" bgcolor="#f8fafb" style="padding:24px; background-color:#f8fafb; border:1px solid #b9c7cf;">
                      <p class="email-muted" style="margin:0 0 16px; color:#526775; font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:1px;">THE MESSAGE</p>
                      <p class="email-text email-message" style="margin:0; color:#18313d; font-size:16px; line-height:1.75; overflow-wrap:anywhere; word-wrap:break-word; word-break:break-word;">${messageHtml}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:28px 0 12px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="email-button" bgcolor="#18313d" style="background-color:#18313d; mso-padding-alt:16px 22px;">
                            <a href="${replyHref}" class="email-button" style="display:inline-block; padding:16px 22px; background-color:#18313d; color:#edf1f3; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.5; font-weight:600; text-decoration:none; mso-padding-alt:0;">Reply by email</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="email-muted" style="padding:0 0 32px; color:#526775; font-size:12px; line-height:1.7;">You can also use Reply in your email app.</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="email-border email-muted" style="border-top:1px solid #b9c7cf; padding:20px 0 0; color:#526775; font-family:'Courier New',Courier,monospace; font-size:10px; line-height:1.8;">Thoughtfully built. Always improving.<br /><a href="https://me.obinestotech.com" class="email-muted" style="color:#526775; text-decoration:underline;">me.obinestotech.com</a></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
