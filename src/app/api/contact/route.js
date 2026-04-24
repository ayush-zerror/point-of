import dotenv from "dotenv";
dotenv.config();
import { sheets_v4 } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const spreadsheetId = process.env.NEXT_PUBLIC_CONTACT_SPREADSHEET_ID;

function getAuth() {
  const clientEmail = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) return null;

  return new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const payload = {
      fullName: String(body?.fullName ?? "").trim(),
      company: String(body?.company ?? "").trim(),
      website: String(body?.website ?? "").trim(),
      email: String(body?.email ?? "").trim(),
      phone: String(body?.phone ?? "").trim(),
      industry: String(body?.industry ?? "").trim(),
      help: String(body?.help ?? "").trim(),
      hear: String(body?.hear ?? "").trim(),
      brief: String(body?.brief ?? "").trim(),
      submittedAt: String(body?.submittedAt ?? "").trim(),
    };

    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.industry ||
      !payload.help ||
      !payload.hear ||
      !payload.brief
    ) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!spreadsheetId) {
      return NextResponse.json({ error: "Contact spreadsheet ID missing" }, { status: 500 });
    }

    const auth = getAuth();
    if (!auth) {
      return NextResponse.json({ error: "Google credentials missing" }, { status: 500 });
    }

    const sheets = new sheets_v4.Sheets({ auth });

    const kolkataTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const [datePart] = kolkataTime.split(",");
    const formattedDate = datePart.trim();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:K",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            formattedDate,
            payload.fullName,
            payload.company,
            payload.website,
            payload.email,
            payload.phone,
            payload.industry,
            payload.help,
            payload.hear,
            payload.brief,
          ],
        ],
      },
    });

    const mailFrom = process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS;
    const mailPass = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
    const mailTo =
      process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS_CONTACT ||
      process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS_SUBSCRIBE;

    if (mailFrom && mailPass && mailTo) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: { user: mailFrom, pass: mailPass },
      });

      await transport.sendMail({
        from: mailFrom,
        to: [mailTo],
        subject: "New Contact Form Submission",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Submission</title>
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;">
        
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:0;">
            <table cellpadding="0" cellspacing="0"
              style="width:100%;max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0ddd6;">
        
              <!-- HEADER -->
              <tr><td style="background:#111111;padding:24px 20px 20px;">
                <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td style="width:24px;height:24px;background:#fff;border-radius:50%;text-align:center;vertical-align:middle;">
                      <span style="font-size:9px;font-weight:700;color:#111;line-height:24px;">PO</span>
                    </td>
                    <td style="padding-left:8px;font-size:13px;font-weight:500;color:#fff;">Point Of</td>
                  </tr>
                </table>
                <div style="display:inline-block;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 10px;margin-bottom:12px;">
                  <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#f59e0b;vertical-align:middle;margin-right:5px;"></span>
                  <span style="font-size:9px;color:rgba(255,255,255,0.7);letter-spacing:0.06em;text-transform:uppercase;">New Submission</span>
                </div>
                <h1 style="margin:0 0 4px;font-size:20px;font-weight:600;color:#ffffff;line-height:1.3;">
                  New contact form submission
                </h1>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45);line-height:1.5;">
                  Someone reached out via your website. Review the details below.
                </p>
              </td></tr>
        
              <!-- BODY -->
              <tr><td style="padding:18px 20px 4px;">
        
                <!-- Section: Contact info -->
                <p style="margin:0 0 12px;font-size:9px;font-weight:600;color:#888;letter-spacing:0.1em;text-transform:uppercase;">Contact info</p>
        
                <!-- Full Name -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">👤</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Full name</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.fullName}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Company -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">🏢</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Company</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.company || "—"}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Website -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">🌐</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Website</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.website || "—"}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Email -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">✉️</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Email</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;word-break:break-all;">${payload.email}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Phone -->
                <table width="100%" cellpadding="0" cellspacing="0" style="padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">📞</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Phone</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.phone}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Divider -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr><td style="border-top:1px solid #f0ede8;font-size:0;">&nbsp;</td></tr>
                </table>
        
                <!-- Section: Project details -->
                <p style="margin:0 0 12px;font-size:9px;font-weight:600;color:#888;letter-spacing:0.1em;text-transform:uppercase;">Project details</p>
        
                <!-- Industry -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">🏷️</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Industry</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.industry}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Help -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">🛠️</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">How can we help</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.help}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Hear -->
                <table width="100%" cellpadding="0" cellspacing="0" style="padding-bottom:10px;margin-bottom:10px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">📣</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">How they heard</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${payload.hear}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Divider -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr><td style="border-top:1px solid #f0ede8;font-size:0;">&nbsp;</td></tr>
                </table>
        
                <!-- Section: Brief -->
                <p style="margin:0 0 10px;font-size:9px;font-weight:600;color:#888;letter-spacing:0.1em;text-transform:uppercase;">Project brief</p>
                <div style="background:#f7f6f2;border-radius:8px;padding:12px 14px;margin-bottom:14px;">
                  <p style="margin:0;font-size:12px;color:#444;line-height:1.6;">${payload.brief}</p>
                </div>
        
                <!-- Date -->
                <table width="100%" cellpadding="0" cellspacing="0" style="padding-bottom:12px;">
                  <tr>
                    <td width="28" valign="top" style="padding-top:1px;">
                      <div style="width:28px;height:28px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:28px;font-size:13px;">📅</div>
                    </td>
                    <td style="padding-left:10px;">
                      <p style="margin:0 0 2px;font-size:9px;color:#999;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Date &amp; time</p>
                      <p style="margin:0;font-size:12px;color:#111;font-weight:500;">${formattedDate}</p>
                    </td>
                  </tr>
                </table>
        
              </td></tr>
        
              <!-- FOOTER -->
              <tr><td style="padding:12px 20px;border-top:1px solid #f0ede8;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:9px;color:#bbb;">Sent by Point Of Notifications</td>
                    <td align="right" style="font-size:9px;color:#ccc;">Do not reply</td>
                  </tr>
                </table>
              </td></tr>
        
            </table>
          </td></tr>
        </table>
        
        </body>
        </html>
        `,
      });
    }

    return NextResponse.json({ message: "Submitted" }, { status: 200 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
