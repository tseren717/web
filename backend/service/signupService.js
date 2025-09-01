import sql from "../backend/database.js";
import crypto from "crypto";

function sha256(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

export async function createUser(name, username, email, password) {

    const usernameHash = sha256(username);
    const passwordHash = sha256(password);

    await sql` SELECT insertNewUser(${name}, ${usernameHash}, ${email}, ${passwordHash});`;
    return true;
}

export async function checkUserName(username) {
    const usernameHash = sha256(username);
    const existing = await sql`SELECT 1 FROM login WHERE username = ${usernameHash}`;
    return existing.length > 0;
}

export async function checkEmail(email) {
    const emailHash = sha256(email);
    const existing = await sql`SELECT 1 FROM login WHERE email = ${emailHash}`;
    return existing.length > 0;
}