/**
 * Shared CUSoC branded email template utility.
 * The logo is inlined as a base64 image so it shows in all email clients.
 */

// CUSoC brand red - matches --color-cusoc-red in index.css
const BRAND_RED = '#E63946';
const BRAND_DARK = '#1a1a2e';
const BRAND_GRAY = '#f8f9fa';

/**
 * Wraps email body content in the full CUSoC branded email shell.
 * @param {string} bodyContent - Inner HTML (the unique part of each email)
 * @returns {string} - Complete HTML email string
 */
const emailTemplate = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>CUSoC</title>
  <style>
    * { box-sizing: border-box; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .outer-wrapper { padding: 0 !important; }
      .header-content { padding: 24px 20px !important; }
      .body-content { padding: 24px 20px 20px !important; }
      .divider-content { padding: 0 20px !important; }
      .footer-content { padding: 20px !important; border-radius: 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f3f5;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="outer-wrapper" style="background-color:#f1f3f5;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header / Banner -->
          <tr>
            <td class="header-content" style="background:linear-gradient(135deg,${BRAND_DARK} 0%,#16213e 50%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <!-- Logo -->
              <img
                src="https://res.cloudinary.com/docryoplj/image/upload/v1779547728/cusoc_adtqlx.png"
                alt="CUSoC Logo"
                width="120"
                style="display:block;margin:0 auto 16px;max-width:120px;height:auto;"
                onerror="this.style.display='none'"
              />
              <!-- Fallback text logo if image fails -->
              <div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">
                CU<span style="color:${BRAND_RED};">S</span>oC
              </div>
              <div style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;margin-top:4px;">
                Chandigarh University Season of Code
              </div>
            </td>
          </tr>

          <!-- Red accent line -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${BRAND_RED} 0%,#ff6b6b 100%);"></td>
          </tr>

          <!-- Body content -->
          <tr>
            <td class="body-content" style="padding:40px 40px 32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="divider-content" style="padding:0 40px;">
              <div style="height:1px;background:#e9ecef;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer-content" style="padding:24px 40px;background:#fafafa;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:${BRAND_DARK};">
                CUSoC Team
              </p>
              <p style="margin:0 0 12px;font-size:12px;color:#868e96;line-height:1.6;">
                Chandigarh University Season of Code &bull; Pilot Program 2025
              </p>
              <p style="margin:0;font-size:11px;color:#adb5bd;">
                This is an automated email. Please do not reply directly to this message.<br/>
                For queries, please reach out to the organizing team.
              </p>
            </td>
          </tr>

        </table>
        <!-- End email card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;

module.exports = emailTemplate;
