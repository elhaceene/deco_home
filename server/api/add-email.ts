import { google } from "googleapis";
import { readBody } from "h3";
import path from "path";
import fs from "fs";
import { version } from "vue";

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const email = requestBody.email;

  const credentialsPath = path.resolve(
    process.cwd(),
    "server/credentials.json"
  );

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

  const { client_email, private_key } = credentials;

  const auth = new google.auth.JWT(client_email, undefined, private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "18vfFnIRVGSsUNJdDpY5zKEQoKDbAttKvr4K0HHfoThI";
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