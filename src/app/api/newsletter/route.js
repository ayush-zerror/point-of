import dotenv from "dotenv";
dotenv.config();
import { sheets_v4 } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const spreadsheetId = "1NRAYWWJ83u5G7n2pD-XJr9eSMK9EqHxfZtsMGGFMh5c";

function getAuth() {
  const clientEmail = "zerror-service-email@spartan-thunder-476511-r2.iam.gserviceaccount.com";
  const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFq7veMKeJdcCn\nAbaXjT/Yn5JcOBTh4WR1bhCCUGaLOObem9kZ4AbCfeLRbow97WRNnGKwv+6Dm0xs\nmCZgJXpH6GAR1dkUYQfPLcXLnbWE7/bT5nHNlA/Zz2p9k6rcp2c8X9JgsSFyXsnd\nioBlNPA3vzQAjBtO5LFy7tKXk4Lyxwjh3MMtskHJBoiOMo8OJq6r2AnpDD3MBN/K\nJOhpcYD918FY15RJyOPWe6g4aZJqavOFE4U3bMIzDWiBgqsvuzZE9RTK9cWrS0pn\nI6P8HOqzV0wGhorTyiZBPOjcjCBT5hByT+wtBejD3x7IKM98ipIV7AKv0bN6MTHX\nFVsUiIt5AgMBAAECggEANLBHKqMh/rhX+lxeBSnLj08CyW/fp1OJHhKG1l7rtJf2\nxKtIrX7VG0e0ppm9FNHkdgUdD49v7BdETg/BHKfZJcvuRkl1OievBNaFfyeIe8B8\nmfTdScvBXbj4wEv7DuO7eRxKGAvp46OCTV2BE6OExmyLCmYvg274lRWXE+E0vg3t\nVaXmVhXjIQ8ykclEf1mT8rdbp2a7ZdaXChfq2eywADKXbsgzmzXhsfjScML6pVbt\nBzkoUyiewDOfkY3IE5jASwJWbt6l+EPzMRwrvJtJXDUFWqpQ+e0henPGJtL8EvX/\na5fWa8aCJVJ3eOAu0LHJIRmO9gVXzaZ75Opl9qf/0wKBgQC7Xjz8UV8fBV2isNX+\n/dAu0alxoywspEbMLc20ZsKvggyY3v2n7Rt7A5ENbTuQn5PB03Fb+WlLA16+9G8G\nSvAOosBspVXvRBFyKBVEOMy5qgfrD9SlantD7jQrl04KzlNJBcHbSnN9lPCHvPCQ\nfde1P6PRE6USQ56+pGl9NyUrCwKBgQC2ojqUvbDT5qxqKIpZXUsQtrTFwyD8BDrp\n/y7xwPlpXYXIKXcJmO4nBJwkpBIZ8yOOkaMd788w9LREyNNaCi5FT70E2looLm68\nGzVFt3sAyN8aVAuermoZDnMSlGg8vHWLshIuUlKecIPmqYzZzNmzoKCevjyn7BxH\nHUNK6K5WCwKBgAJmD3PPet9Dy1IU33h3OV4QExJAW4VqyPk+MN75Xc6vZIfkeuzW\nbT6i6g1484VDdbnKgi4CQGXUcjcRnAZBmVcmoD4D09jPT0Xd23/XFk/eLGHG/xrr\nBQ72krZoJnie8ZQCvduX1WirKnUiZxYCdmt8mBVKIhfcw8B/DFatCQ3HAoGBAJs6\noh4AaMaCvrLwSD8Si5XmJRod8vAhTE3NBoKWqabDxczOaY3vvSPOyERga75AqU0p\nPgJY7LrIklwQcYuLMa7ZymfQi2axqI8bdRkPjW2qTe6b1tCFoEoxvN7i4wIUkLgu\nn0Nd1zkxmvq3y67nbXY+paanPPjhN1u+ZI7L3DnnAoGAH1ZGXtmPWHKpsIgLIWpu\nVL0aJ3N2KxbV4kQ0sYoBThSxS1mrd93jIksk5xA3E2h+XdEjcsNHnlxwFjG+snIt\n4p4Gj2J6miAkoaXxAgCCW7s/8FD47bG6dKMIRX2vBUJqcWRG37Lql+KlFjIR8y8Y\nRd6D7dBgoifWynOd/eQpoLE=\n-----END PRIVATE KEY-----\n";

  if (!clientEmail || !privateKey) return null;

  return new GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!spreadsheetId) {
      return NextResponse.json({ error: "Spreadsheet ID missing" }, { status: 500 });
    }

    const auth = getAuth();
    if (!auth) {
      return NextResponse.json({ error: "Google credentials missing" }, { status: 500 });
    }

    const sheets = new sheets_v4.Sheets({ auth });

    // Current date in Kolkata timezone
    const kolkataTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const [datePart] = kolkataTime.split(",");
    const formattedDate = datePart.trim();

    // Get existing rows
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:E",
    });

    const rows = response.data.values || [];

    // Find if email exists (we store date + email in first 2 columns)
    const emailRow = rows.find((row) => row?.[1] === email);

    if (emailRow) {
      const rowIndex = rows.indexOf(emailRow) + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!A${rowIndex}:B${rowIndex}`,
        valueInputOption: "RAW",
        requestBody: {
          values: [[formattedDate, email]],
        },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "RAW",
        requestBody: {
          values: [[formattedDate, email]],
        },
      });
    }

    const mailFrom = "hello@zerrorstudios.com";
    const mailPass = "byaqczanjvrarkan";
    const mailTo = "ayush.zerror@gmail.com";

    if (mailFrom && mailPass && mailTo) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: { user: mailFrom, pass: mailPass },
      });

      await transport.sendMail({
        from: mailFrom,
        to: [mailTo],
        subject: "New Newsletter Subscription",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Subscription</title>
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;">
        
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:0;">
        
            <table cellpadding="0" cellspacing="0"
              style="width:100%;max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0ddd6;">
        
              <!-- HEADER -->
              <tr><td style="background:#111111;padding:24px 20px 20px;">
        
                <!-- Logo -->
                <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td style="width:24px;height:24px;background:#fff;border-radius:50%;text-align:center;vertical-align:middle;">
                      <span style="font-size:9px;font-weight:700;color:#111;line-height:24px;">PO</span>
                    </td>
                    <td style="padding-left:8px;font-size:13px;font-weight:500;color:#fff;">Point Of</td>
                  </tr>
                </table>
        
                <!-- Badge -->
                <div style="display:inline-block;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 10px;margin-bottom:12px;">
                  <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#4ade80;vertical-align:middle;margin-right:5px;"></span>
                  <span style="font-size:9px;color:rgba(255,255,255,0.7);letter-spacing:0.06em;text-transform:uppercase;">New Subscriber Alert</span>
                </div>
        
                <h1 style="margin:0 0 4px;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;line-height:1.3;">
                  New newsletter subscription
                </h1>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45);line-height:1.5;">
                  Someone just joined your newsletter. Here are the details.
                </p>
        
              </td></tr>
        
              <!-- BODY -->
              <tr><td style="padding:20px 20px 6px;">
                <p style="margin:0 0 14px;font-size:9px;font-weight:600;color:#888;letter-spacing:0.1em;text-transform:uppercase;">
                  Subscriber details
                </p>
        
                <!-- Date row -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f0ede8;padding-bottom:12px;margin-bottom:12px;">
                  <tr>
                    <td width="30" valign="middle">
                      <div style="width:30px;height:30px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:30px;font-size:14px;">📅</div>
                    </td>
                    <td style="padding-left:12px;">
                      <p style="margin:0 0 2px;font-size:10px;color:#999;font-weight:500;">Date &amp; time</p>
                      <p style="margin:0;font-size:13px;color:#111;font-weight:500;">${formattedDate}</p>
                    </td>
                  </tr>
                </table>
        
                <!-- Email row -->
                <table width="100%" cellpadding="0" cellspacing="0" style="padding-bottom:6px;">
                  <tr>
                    <td width="30" valign="middle">
                      <div style="width:30px;height:30px;background:#f7f6f2;border-radius:7px;text-align:center;line-height:30px;font-size:14px;">✉️</div>
                    </td>
                    <td style="padding-left:12px;">
                      <p style="margin:0 0 2px;font-size:10px;color:#999;font-weight:500;">Email address</p>
                      <p style="margin:0;font-size:13px;color:#111;font-weight:500;word-break:break-all;">${email}</p>
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

    return NextResponse.json({ message: "Subscribed" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
