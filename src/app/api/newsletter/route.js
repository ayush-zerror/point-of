import { sheets_v4 } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const spreadsheetId = process.env.NEXT_PUBLIC_SUBSCRIBE_SPREADSHEET_ID;

function getAuth() {
  const clientEmail = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n");

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

    const mailFrom = process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS;
    const mailPass = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
    const mailTo = process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS_SUBSCRIBE;

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
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px 0;">
            <h2 style="color: #000; font-size: 18px; margin-bottom: 5px;">
              New Newsletter Subscription
            </h2>
            <hr>
            <ul>
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Email:</strong> ${email}</li>
            </ul>
          </div>
        `,
      });
    }

    return NextResponse.json({ message: "Subscribed" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
