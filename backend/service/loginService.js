import sql from "../backend/database.js";
import crypto from "crypto";

function sha256(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

export async function checkUserCredentials(email, password) {
    const emailHash = sha256(email);
    const passwordHash = sha256(password);

    const result = await sql`
        SELECT 1 FROM users WHERE email = ${emailHash} AND password = ${passwordHash}
    `;
    return result.length > 0;
}