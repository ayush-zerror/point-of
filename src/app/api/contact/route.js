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
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px 0;">
            <h2 style="color: #000; font-size: 18px; margin-bottom: 5px;">New Contact Form Submission</h2>
            <hr />
            <ul>
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Full name:</strong> ${payload.fullName}</li>
              <li><strong>Company:</strong> ${payload.company || "-"}</li>
              <li><strong>Website:</strong> ${payload.website || "-"}</li>
              <li><strong>Email:</strong> ${payload.email}</li>
              <li><strong>Phone:</strong> ${payload.phone}</li>
              <li><strong>Industry:</strong> ${payload.industry}</li>
              <li><strong>Help:</strong> ${payload.help}</li>
              <li><strong>Hear:</strong> ${payload.hear}</li>
              <li><strong>Brief:</strong> ${payload.brief}</li>
            </ul>
          </div>
        `,
      });
    }

    return NextResponse.json({ message: "Submitted" }, { status: 200 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
