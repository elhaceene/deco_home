import { google } from "googleapis";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const email = requestBody.email;
  const client_email = useRuntimeConfig().clientEmail;
  const private_key = useRuntimeConfig().privateKey;

  const auth = new google.auth.JWT(client_email, undefined, private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "14hewStUNez16kc50uyTRyd5b6H2NmDY8UP23RUrVufY";
  const range = "newsletter!A1:A";
  const valueInputOption = "RAW";

  const values = [[email]];

  const body = { values };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      requestBody: body,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});
