import sgMail from '@sendgrid/mail';

// Lazy initialization
let initialized = false;

function initSendGrid() {
  if (!initialized) {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not set');
    }
    sgMail.setApiKey(apiKey);
    initialized = true;
  }
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hud@multimodeai.com';
const FROM_NAME = 'BayanLab by Multimode AI';

interface PurchaseEmailParams {
  to: string;
  tier: string;
  datasets: string[];
  apiKey: string;
}

export async function sendPurchaseEmail({ to, tier, datasets, apiKey }: PurchaseEmailParams) {
  initSendGrid();

  const datasetList = datasets.join(', ');
  const tierDisplay = tier === 'complete' ? 'Complete' : 'Developer';

  const msg = {
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject: `Your BayanLab API Key - ${tierDisplay} License`,
    text: `
Thank you for your purchase!

Your BayanLab ${tierDisplay} License is now active.

API Key: ${apiKey}

Datasets included: ${datasetList}

Quick Start:
curl -H "Authorization: Bearer ${apiKey}" \\
  https://api.bayanlab.com/v1/masajid

Documentation: https://bayanlab.com/docs
Attribute Reference: https://bayanlab.com/docs/attributes

Your license includes 1 year of updates. We'll reach out before it expires.

Questions? Reply to this email or visit https://bayanlab.com/contact

- The BayanLab Team
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #000; margin: 0;">BayanLab</h1>
  </div>

  <p>Thank you for your purchase!</p>

  <p>Your BayanLab <strong>${tierDisplay} License</strong> is now active.</p>

  <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your API Key</p>
    <code style="display: block; background: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 12px; font-size: 14px; word-break: break-all;">${apiKey}</code>
  </div>

  <p><strong>Datasets included:</strong> ${datasetList}</p>

  <h3 style="margin-top: 30px;">Quick Start</h3>
  <pre style="background: #1a1a1a; color: #fff; border-radius: 8px; padding: 15px; overflow-x: auto; font-size: 13px;">curl -H "Authorization: Bearer ${apiKey}" \\
  https://api.bayanlab.com/v1/masajid</pre>

  <p style="margin-top: 30px;">
    <a href="https://bayanlab.com/docs" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-right: 10px;">View Documentation</a>
    <a href="https://bayanlab.com/docs/attributes" style="display: inline-block; background: #fff; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; border: 1px solid #ddd;">Attribute Reference</a>
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">

  <p style="color: #666; font-size: 14px;">
    Your license includes 1 year of updates. We'll reach out before it expires.
  </p>

  <p style="color: #666; font-size: 14px;">
    Questions? Reply to this email or visit <a href="https://bayanlab.com/contact" style="color: #000;">bayanlab.com/contact</a>
  </p>

  <p style="color: #999; font-size: 12px; margin-top: 30px;">
    &copy; ${new Date().getFullYear()} Multimode AI. All rights reserved.
  </p>
</body>
</html>
    `.trim(),
  };

  try {
    await sgMail.send(msg);
    console.log(`Purchase email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send purchase email:', error);
    throw error;
  }
}
