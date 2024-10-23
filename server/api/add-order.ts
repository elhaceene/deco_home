import { RuntimeConfig } from "@nuxt/schema";
import { google } from "googleapis";
import { readBody, use } from "h3";

interface Product {
  id: number;
  price: number;
  quantity: number;
}
interface RequestBody {
  fullname: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  total: number;
  products: Product[];
}

export default defineEventHandler(async (event) => {
  const requestBody = (await readBody(event)) as RequestBody;
  const { fullname, email, phone, city, address, total, products } =
    requestBody;

  const client_email = useRuntimeConfig().clientEmail;
  const private_key = useRuntimeConfig().privateKey;
  const auth = new google.auth.JWT(client_email, undefined, private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "14hewStUNez16kc50uyTRyd5b6H2NmDY8UP23RUrVufY";
  const range = "orders!A1:D";
  const valueInputOption = "RAW";
  const productsDetails = products
    .map(
      (product) =>
        `[ID: ${product.id} / QT : ${product.quantity} / PU : ${product.price}]`
    )
    .join(" ");

  const values = [
    [fullname, email, phone, city, address, productsDetails, total],
  ];

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
